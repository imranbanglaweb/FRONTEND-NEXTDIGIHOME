import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getApiUrl } from "../../utils/api";
import { StructuredData, generateBreadcrumbSchema } from "../../utils/seo";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://nextdigihome.com").replace(/\/$/, "");
const SITE_NAME = "Next Digi Home";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.svg`;

type ProductSegmentProps = {
  params: Promise<{ id: string }>;
};

type ProductRouteProps = ProductSegmentProps & {
  children: ReactNode;
};

interface Product {
  id: number;
  name: string;
  slug?: string | null;
  description?: string | null;
  detailed_description?: string | null;
  price?: number | string | null;
  compare_price?: number | string | null;
  stock?: number | null;
  category?: string | null;
  tags?: string[] | string | null;
  thumbnail?: string | null;
  images?: string[] | string | null;
  digital?: boolean | null;
  featured?: boolean | null;
  active?: boolean | null;
  published_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

const getProductPath = (product: Product | null, fallbackId: string): string => {
  const segment = product?.slug || product?.id || fallbackId;
  return `/products/${encodeURIComponent(String(segment))}`;
};

const stripHtml = (content: string): string =>
  content
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();

const truncate = (content: string, maxLength: number): string => {
  if (content.length <= maxLength) return content;
  return `${content.slice(0, maxLength - 1).trim()}...`;
};

const parseStringArray = (value: string[] | string | null | undefined): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  }

  if (typeof value !== "string" || !value.trim()) {
    return [];
  }

  try {
    return parseStringArray(JSON.parse(value));
  } catch {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
};

const toAbsoluteSiteUrl = (path: string): string => {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("//")) return `https:${path}`;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

const getProductAssetUrl = (path: string | null | undefined): string | null => {
  if (!path) return null;

  const cleanPath = path.trim();
  if (!cleanPath) return null;

  if (/^www\./i.test(cleanPath)) {
    return `https://${cleanPath}`;
  }

  if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) {
    return cleanPath;
  }

  if (cleanPath.startsWith("//")) {
    return `https:${cleanPath}`;
  }

  if (cleanPath.startsWith("/api/storage/")) {
    return toAbsoluteSiteUrl(cleanPath);
  }

  if (/^\/?(public\/)?storage\//i.test(cleanPath)) {
    const storagePath = cleanPath.replace(/^\/+/, "").replace(/^(public\/)?storage\/+/i, "");
    return `${SITE_URL}/api/storage/${storagePath}`;
  }

  if (cleanPath.startsWith("/")) {
    return toAbsoluteSiteUrl(cleanPath);
  }

  return `${SITE_URL}/api/storage/${cleanPath.replace(/^\/+/, "")}`;
};

const getProductImages = (product: Product): string[] => {
  const images = parseStringArray(product.images)
    .map(getProductAssetUrl)
    .filter((image): image is string => Boolean(image));

  const thumbnail = getProductAssetUrl(product.thumbnail);

  return [...(thumbnail ? [thumbnail] : []), ...images].filter(
    (image, index, list) => list.indexOf(image) === index,
  );
};

async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(getApiUrl(`products/${encodeURIComponent(id)}`), {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data || data;
  } catch {
    return null;
  }
}

function getDescription(product: Product | null): string {
  if (!product) {
    return "Premium digital products, templates, and business tools from Next Digi Home.";
  }

  const rawDescription = product.detailed_description || product.description || "";
  const description = stripHtml(rawDescription);

  if (description) {
    return truncate(description, 160);
  }

  const category = product.category ? `${product.category} ` : "";
  const price = product.price ? ` Price: BDT ${Number(product.price).toLocaleString("en-BD")}.` : "";
  return truncate(`Buy ${product.name}, a premium ${category}product from Next Digi Home with secure checkout, instant access, and trusted support.${price}`, 160);
}

function getKeywords(product: Product): string[] {
  const tags = parseStringArray(product.tags);
  return [
    product.name,
    product.category || "digital products",
    ...tags,
    "Next Digi Home",
    "premium digital products",
    "digital downloads",
    "business tools",
  ].filter((keyword, index, list): keyword is string => Boolean(keyword) && list.indexOf(keyword) === index);
}

export async function generateMetadata({ params }: ProductSegmentProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    const path = `/products/${encodeURIComponent(id)}`;
    return {
      title: "Product Not Found",
      description: getDescription(null),
      alternates: {
        canonical: path,
      },
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const path = getProductPath(product, id);
  const description = getDescription(product);
  const images = getProductImages(product);
  const image = images[0] || DEFAULT_IMAGE;
  const title = `${product.name} | ${product.category || "Premium Digital Product"} | ${SITE_NAME}`;
  const isIndexable = Boolean(product.name);

  return {
    title,
    description,
    keywords: getKeywords(product),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      site: "@nextdigihome",
      creator: "@nextdigihome",
    },
    robots: {
      index: isIndexable,
      follow: true,
      googleBot: {
        index: isIndexable,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function ProductDetailLayout({ children, params }: ProductRouteProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return children;
  }

  const path = getProductPath(product, id);
  const productUrl = `${SITE_URL}${path}`;
  const description = getDescription(product);
  const images = getProductImages(product);
  const price = Number(product.price || 0);
  const stock = Number(product.stock || 0);
  const category = product.category || "Products";

  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: category, path: `/products?category=${encodeURIComponent(category)}` },
    { label: product.name, path },
  ]);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.name,
    description,
    image: images.length > 0 ? images : [DEFAULT_IMAGE],
    sku: String(product.id),
    category,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      price: price.toFixed(2),
      priceCurrency: "BDT",
      availability: stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      priceValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 180).toISOString().slice(0, 10),
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "BD",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Product Type",
        value: product.digital ? "Digital product" : "Product",
      },
      {
        "@type": "PropertyValue",
        name: "Category",
        value: category,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is your return policy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer a 30-day return window. If you are not satisfied with your purchase, you can return it for a full refund or exchange.",
        },
      },
      {
        "@type": "Question",
        name: "How long does shipping take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: product.digital
            ? "Digital products are available quickly after checkout. Physical product delivery times depend on the shipping option selected at checkout."
            : "Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout for faster delivery.",
        },
      },
      {
        "@type": "Question",
        name: "Is this product authentic?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Products are sourced and published by Next Digi Home with clear product details and secure checkout.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer warranty?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Warranty details vary by product type. Check the product documentation or contact support for specific warranty information.",
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={productSchema} />
      <StructuredData data={faqSchema} />
      {children}
    </>
  );
}
