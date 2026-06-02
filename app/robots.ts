import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://nextdigihome.com';

  return {
    rules: [
      // Main crawler rules
      {
        userAgent: '*',
        allow: [
          '/',
          '/products',
          '/services',
          '/about',
          '/contact',
          '/blog',
          '/api/search',
        ],
        disallow: [
          '/admin/',
          '/dashboard/',
          '/api/',
          '/checkout/',
          '/cart/',
          '/signin/',
          '/signup/',
          '/*.json$',
          '/private',
          '/temp',
          '/*?*sort=',
          '/*&filter=',
        ],
        crawlDelay: 1,
        userAgent: 'Googlebot',
        crawlDelay: 0,
      },
      // Specific rules for GPTBot
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      // Specific rules for CCBot
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-products.xml`,
    ],
    host: baseUrl,
  };
}
