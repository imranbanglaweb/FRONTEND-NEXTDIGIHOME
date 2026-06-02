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
      console.warn('[sitemap.ts] API URL not configured, using static routes only');
      return staticUrls;
    }

    // Use a more reliable fetch with shorter timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout for build environment

    try {
      const response = await fetch(`${apiUrl}/api/products?limit=1000`, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Next.js-Sitemap-Generator',
        },
        // Don't cache during build
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        throw new Error(`Unexpected content type: ${contentType}`);
      }

      const data = await response.json();
      const products = Array.isArray(data) ? data : data.data || [];

      productUrls = products
        .filter((product: any) => product?.id && typeof product.id === 'number')
        .slice(0, 50000) // Google Sitemap limit
        .map((product: any) => ({
          url: `${baseUrl}/products/${product.id}`,
          lastModified: product.updated_at 
            ? new Date(product.updated_at).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
          changeFrequency: 'weekly' as const,
          priority: 0.80,
        }));

      console.log(`[sitemap.ts] Successfully fetched ${productUrls.length} products for sitemap`);
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError instanceof Error) {
        if (fetchError.name === 'AbortError') {
          console.warn('[sitemap.ts] Product fetch timeout (API took too long), using static routes only');
        } else {
          console.warn('[sitemap.ts] Product fetch error:', fetchError.message);
        }
      }
      // Return static routes if API fetch fails - this ensures sitemap is always generated
    }
  } catch (error) {
    console.error('[sitemap.ts] Unexpected error in sitemap generation:', error instanceof Error ? error.message : String(error));
    // Return static routes as fallback - sitemap will still be generated
  }

  return [
    ...staticUrls,
    ...productUrls,
  ];
}
