import { MetadataRoute } from 'next';

type SitemapRecord = {
  id?: string | number;
  slug?: string | null;
  updated_at?: string | Date | null;
  created_at?: string | Date | null;
  active?: boolean | null;
};

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nextdigihome.com').replace(/\/$/, '');
const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'https://backend.nextdigihome.com').replace(/\/$/, '');

const unwrapArray = <T,>(data: unknown): T[] => {
  if (Array.isArray(data)) return data as T[];
  if (!data || typeof data !== 'object') return [];

  const root = data as { data?: unknown };
  if (Array.isArray(root.data)) return root.data as T[];
  if (root.data && typeof root.data === 'object') {
    const nested = root.data as { data?: unknown };
    if (Array.isArray(nested.data)) return nested.data as T[];
  }

  return [];
};

const toLastModified = (value: string | Date | null | undefined) => {
  if (!value) return new Date();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
};

async function fetchRecords(endpoint: string): Promise<SitemapRecord[]> {
  try {
    const response = await fetch(`${apiUrl}/api/${endpoint}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return [];
    return unwrapArray<SitemapRecord>(await response.json());
  } catch (error) {
    console.warn(`Failed to fetch ${endpoint} for sitemap:`, error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes with priority
  const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: 'products', priority: 0.95, changeFrequency: 'daily' as const },
    { path: 'services', priority: 0.90, changeFrequency: 'weekly' as const },
    { path: 'about', priority: 0.80, changeFrequency: 'monthly' as const },
    { path: 'contact', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: 'privacy', priority: 0.60, changeFrequency: 'yearly' as const },
    { path: 'terms', priority: 0.60, changeFrequency: 'yearly' as const },
    { path: 'blog', priority: 0.85, changeFrequency: 'weekly' as const },
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: route.path ? `${baseUrl}/${route.path}` : baseUrl,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const [products, posts] = await Promise.all([
    fetchRecords('products?per_page=10000'),
    fetchRecords('blog?per_page=1000'),
  ]);

  const productUrls: MetadataRoute.Sitemap = products
    .filter((product) => product.id != null && product.active !== false)
    .map((product) => ({
      url: `${baseUrl}/products/${encodeURIComponent(String(product.slug || product.id))}`,
      lastModified: toLastModified(product.updated_at || product.created_at),
      changeFrequency: 'weekly' as const,
      priority: product.slug ? 0.86 : 0.80,
    }));

  const blogUrls: MetadataRoute.Sitemap = posts
    .filter((post) => post.slug)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: toLastModified(post.updated_at || post.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }));

  return [
    ...staticUrls,
    ...productUrls,
    ...blogUrls,
  ];
}
