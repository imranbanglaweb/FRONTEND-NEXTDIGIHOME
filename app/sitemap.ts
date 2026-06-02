import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nextdigihome.com';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/NEXTDIGIHOMEBACKEND';

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
    url: `${baseUrl}/${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Fetch dynamic products from API (if available)
  let productUrls: MetadataRoute.Sitemap = [];
  try {
    const response = await fetch(`${apiUrl}/api/products?limit=10000`, {
      next: { revalidate: 3600 }, // revalidate every hour
    });
    if (response.ok) {
      const products = await response.json();
      productUrls = products.data?.map((product: { id: string; updated_at?: string | Date }) => ({
        url: `${baseUrl}/products/${product.id}`,
        lastModified: product.updated_at 
          ? new Date(product.updated_at).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: 0.80,
      })) || [];
    }
  } catch (error) {
    console.warn('Failed to fetch products for sitemap:', error);
    // Fallback: return only static routes
  }

  return [
    ...staticUrls,
    ...productUrls,
  ];
}