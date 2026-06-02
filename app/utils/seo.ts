import { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nextdigihome.com";

/**
 * Generate page metadata with all SEO best practices
 */
export function generatePageMetadata(options: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  path: string;
  type?: "website" | "article" | "product";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const url = `${BASE_URL}${options.path}`;
  const image = options.image || "/og-image.svg";

  return {
    title: options.title,
    description: options.description,
    keywords: options.keywords?.join(", "),
    authors: options.author ? [{ name: options.author }] : undefined,
    openGraph: {
      title: options.title,
      description: options.description,
      url: url,
      siteName: "Next Digi Home",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: options.title,
        },
      ],
      type: options.type === "article" ? "article" : "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
      images: [image],
      creator: "@nextdigihome",
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

/**
 * Generate Product Schema (JSON-LD)
 */
export function generateProductSchema(product: {
  id: string | number;
  name: string;
  description: string;
  price: number;
  currency?: string;
  image?: string;
  rating?: number;
  ratingCount?: number;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  sku?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BASE_URL}/products/${product.id}`,
    name: product.name,
    description: product.description,
    image: product.image || "/og-image.svg",
    sku: product.sku || `product-${product.id}`,
    price: product.price,
    priceCurrency: product.currency || "USD",
    availability: `https://schema.org/${product.availability || "InStock"}`,
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating.toString(),
        ratingCount: product.ratingCount || "0",
      },
    }),
    seller: {
      "@type": "Organization",
      name: "Next Digi Home",
      url: BASE_URL,
    },
  };
}

/**
 * Generate Breadcrumb Schema (JSON-LD)
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate Organization Schema (JSON-LD)
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Next Digi Home",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: "Premium digital products, templates, and business tools for modern enterprises.",
    email: "info@nextdigihome.com",
    telephone: "+8801918329829",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "Bangladesh",
    },
    sameAs: [
      "https://facebook.com/nextdigihome",
      "https://twitter.com/nextdigihome",
      "https://linkedin.com/company/nextdigihome",
    ],
  };
}

/**
 * Generate FAQ Schema (JSON-LD)
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Local Business Schema (if applicable)
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Next Digi Home",
    image: `${BASE_URL}/logo.png`,
    url: BASE_URL,
    telephone: "+8801918329829",
    email: "info@nextdigihome.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Your Street Address",
      addressLocality: "Dhaka",
      addressRegion: "Dhaka",
      postalCode: "1000",
      addressCountry: "BD",
    },
    priceRange: "$",
  };
}

/**
 * Wrap JSON-LD in script tag component
 */
export function StructuredData({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Generate sitemap entry for dynamic pages
 */
export function generateSitemapEntry(
  path: string,
  lastModified?: Date,
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never",
  priority?: number
) {
  return {
    url: `${BASE_URL}${path}`,
    lastModified: lastModified || new Date(),
    changeFrequency: changeFrequency || "weekly",
    priority: priority || 0.8,
  };
}
