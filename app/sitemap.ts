import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nextdigihome.com';

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/products',
    '/contact',
    '/privacy',
    '/terms',
    '/signin',
    '/signup',
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic product pages would require API call, but for now static + note
  // In production, fetch products and add /products/${slug}

  return [
    ...staticUrls,
    // Example for products index with lower priority? already included
  ];
}
