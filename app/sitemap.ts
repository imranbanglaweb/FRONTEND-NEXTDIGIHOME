import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nextdigihome.com';

  // Static routes with priority
  const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/products', priority: 0.95, changeFrequency: 'daily' as const },
    { path: '/services', priority: 0.90, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.80, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.60, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.60, changeFrequency: 'yearly' as const },
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Fetch dynamic products from API (optional - only if API is available)
  let productUrls: MetadataRoute.Sitemap = [];
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.warn('API URL not configured, skipping dynamic products in sitemap');
      return staticUrls;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(`${apiUrl}/api/products?limit=1000`, {
      signal: controller.signal,
      next: { revalidate: 3600 },
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const products = Array.isArray(data) ? data : data.data || [];

      productUrls = products
        .filter((product: any) => product?.id)
        .slice(0, 50000) // Google Sitemap limit
        .map((product: any) => ({
          url: `${baseUrl}/products/${product.id}`,
          lastModified: product.updated_at 
            ? new Date(product.updated_at).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
          changeFrequency: 'weekly' as const,
          priority: 0.80,
        }));
    }
  } catch (error) {
    console.warn('Failed to fetch products for sitemap:', error instanceof Error ? error.message : String(error));
    // Return only static routes if API fetch fails - this is fine
  }

  return [
    ...staticUrls,
    ...productUrls,
  ];
}
