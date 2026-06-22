import Link from "next/link";
import type { Metadata } from "next";
import ProductCatalogClient from "./ProductCatalogClient";
import { getApiUrl } from "../utils/api";
import { StructuredData } from "../utils/seo";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://nextdigihome.com").replace(/\/$/, "");
const PRODUCTS_PER_PAGE = 100;

type ProductsSearchParams = Promise<{
  page?: string;
  category?: string;
  search?: string;
}>;

type Product = {
  id: number | string;
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  category?: string | null;
  category_name?: string | null;
  updated_at?: string | null;
};

type Category = {
  id: number | string;
  category_name?: string | null;
  name?: string | null;
  slug?: string | null;
};

type PaginationMeta = {
  currentPage: number;
  lastPage: number;
};

const readPositiveInteger = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const unwrapArray = <T,>(data: unknown): T[] => {
  if (Array.isArray(data)) return data as T[];
  if (!data || typeof data !== "object") return [];

  const root = data as { data?: unknown };
  if (Array.isArray(root.data)) return root.data as T[];
  if (root.data && typeof root.data === "object") {
    const nested = root.data as { data?: unknown };
    if (Array.isArray(nested.data)) return nested.data as T[];
  }

  return [];
};

const readNumber = (value: unknown, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const getPaginationMeta = (data: unknown, fallbackPage: number): PaginationMeta => {
  const root = data && typeof data === "object" ? data as Record<string, unknown> : {};
  const nested = root.data && typeof root.data === "object" && !Array.isArray(root.data)
    ? root.data as Record<string, unknown>
    : {};
  const meta = root.meta && typeof root.meta === "object"
    ? root.meta as Record<string, unknown>
    : nested.meta && typeof nested.meta === "object"
      ? nested.meta as Record<string, unknown>
      : {};

  const currentPage = readNumber(root.current_page ?? nested.current_page ?? meta.current_page, fallbackPage);
  const lastPage = readNumber(root.last_page ?? nested.last_page ?? meta.last_page, currentPage);

  return { currentPage, lastPage };
};

const buildProductsPath = (params: { page?: number; category?: string; search?: string }): string => {
  const searchParams = new URLSearchParams();
  if (params.page && params.page > 1) searchParams.set("page", String(params.page));
  if (params.category) searchParams.set("category", params.category);
  if (params.search) searchParams.set("search", params.search);
  const query = searchParams.toString();
  return query ? `/products?${query}` : "/products";
};

async function fetchJson(endpoint: string): Promise<unknown> {
  try {
    const response = await fetch(getApiUrl(endpoint), {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

async function getProducts(page: number, category?: string, search?: string) {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(PRODUCTS_PER_PAGE),
  });
  if (category) params.set("category", category);
  if (search) params.set("search", search);

  const data = await fetchJson(`products?${params.toString()}`);
  return {
    products: unwrapArray<Product>(data),
    meta: getPaginationMeta(data, page),
  };
}

async function getCategories(): Promise<Category[]> {
  return unwrapArray<Category>(await fetchJson("categories"));
}

export async function generateMetadata({ searchParams }: { searchParams: ProductsSearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const page = readPositiveInteger(params.page, 1);
  const category = params.category?.trim() || "";
  const search = params.search?.trim() || "";
  const path = buildProductsPath({ page, category, search });
  const isVariantPage = Boolean(category || search || page > 1);
  const titleParts = [
    category ? `${category} Products` : "Premium Digital Products",
    search ? `Search: ${search}` : "",
    page > 1 ? `Page ${page}` : "",
  ].filter(Boolean);

  return {
    title: `${titleParts.join(" - ")} | Next Digi Home`,
    description: "Browse premium digital products, templates, UI kits, design assets, and business tools with secure checkout and fast access.",
    alternates: {
      canonical: isVariantPage ? "/products" : path,
    },
    robots: {
      index: !isVariantPage,
      follow: true,
      googleBot: {
        index: !isVariantPage,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: titleParts.join(" - ") || "Premium Digital Products",
      description: "Browse premium digital products, templates, UI kits, design assets, and business tools.",
      url: `${SITE_URL}${isVariantPage ? "/products" : path}`,
      type: "website",
      siteName: "Next Digi Home",
      images: [{ url: `${SITE_URL}/og-image.svg`, width: 1200, height: 630, alt: "Next Digi Home products" }],
    },
    twitter: {
      card: "summary_large_image",
      title: titleParts.join(" - ") || "Premium Digital Products",
      description: "Browse premium digital products, templates, UI kits, design assets, and business tools.",
      images: [`${SITE_URL}/og-image.svg`],
    },
  };
}

export default async function ProductsPage({ searchParams }: { searchParams: ProductsSearchParams }) {
  const params = await searchParams;
  const page = readPositiveInteger(params.page, 1);
  const category = params.category?.trim() || "";
  const search = params.search?.trim() || "";
  const [{ products, meta }, categories] = await Promise.all([
    getProducts(page, category, search),
    getCategories(),
  ]);

  const canonicalPath = buildProductsPath({ page, category, search });
  const previousPath = meta.currentPage > 1
    ? buildProductsPath({ page: meta.currentPage - 1, category, search })
    : null;
  const nextPath = meta.currentPage < meta.lastPage
    ? buildProductsPath({ page: meta.currentPage + 1, category, search })
    : null;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Next Digi Home products",
    url: `${SITE_URL}${canonicalPath}`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: (meta.currentPage - 1) * PRODUCTS_PER_PAGE + index + 1,
      url: `${SITE_URL}/products/${encodeURIComponent(String(product.slug || product.id))}`,
      name: product.name || `Product ${product.id}`,
    })),
  };

  return (
    <>
      {previousPath && <link rel="prev" href={`${SITE_URL}${previousPath}`} />}
      {nextPath && <link rel="next" href={`${SITE_URL}${nextPath}`} />}
      <StructuredData data={itemListSchema} />
      <nav aria-label="Product catalog links" className="sr-only">
        <Link href="/products">All products</Link>
        {previousPath && <Link href={previousPath}>Previous products page</Link>}
        {nextPath && <Link href={nextPath}>Next products page</Link>}
        {categories.map((item) => {
          const label = item.category_name || item.name || String(item.id);
          const slug = item.slug || String(item.id);
          return (
            <Link key={String(item.id)} href={`/products?category=${encodeURIComponent(slug)}`}>
              {label}
            </Link>
          );
        })}
        {products.map((product) => (
          <Link key={String(product.id)} href={`/products/${encodeURIComponent(String(product.slug || product.id))}`}>
            {product.name || `Product ${product.id}`}
          </Link>
        ))}
      </nav>
      <ProductCatalogClient />
    </>
  );
}
