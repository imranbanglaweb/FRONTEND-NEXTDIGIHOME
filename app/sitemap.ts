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

    // Fetch all pages from paginated API
    let allProducts: any[] = [];
    let currentPage = 1;
    let hasNextPage = true;

    while (hasNextPage && allProducts.length < 50000) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      try {
        const response = await fetch(`${apiUrl}/api/products?page=${currentPage}`, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Next.js-Sitemap-Generator',
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          console.warn(`[sitemap.ts] API page ${currentPage} returned status ${response.status}`);
          break;
        }

        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
          throw new Error(`Unexpected content type: ${contentType}`);
        }

        const data = await response.json();
        
        // Extract products from paginated response
        const products = data.data || [];
        if (!Array.isArray(products) || products.length === 0) {
          hasNextPage = false;
          break;
        }

        allProducts.push(...products);

        // Check if there are more pages
        hasNextPage = data.next_page_url !== null && currentPage < data.last_page;
        currentPage++;

        console.log(`[sitemap.ts] Fetched page ${currentPage - 1}, total products so far: ${allProducts.length}`);
      } catch (fetchError) {
        clearTimeout(timeoutId);
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          console.warn(`[sitemap.ts] Page ${currentPage} fetch timeout`);
        } else {
          console.warn('[sitemap.ts] Product page fetch error:', fetchError instanceof Error ? fetchError.message : String(fetchError));
        }
        break;
      }
    }

    // Convert products to sitemap URLs
    productUrls = allProducts
      .filter((product: any) => product?.id && typeof product.id === 'number')
      .slice(0, 50000)
      .map((product: any) => ({
        url: `${baseUrl}/products/${product.id}`,
        lastModified: product.updated_at 
          ? new Date(product.updated_at).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: 0.80,
      }));

    console.log(`[sitemap.ts] Successfully generated ${productUrls.length} product URLs for sitemap`);
  } catch (error) {
    console.error('[sitemap.ts] Unexpected error in sitemap generation:', error instanceof Error ? error.message : String(error));
    // Return static routes as fallback
  }

  return [
    ...staticUrls,
    ...productUrls,
  ];
}
