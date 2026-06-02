import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://nextdigihome.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/products',
          '/services',
          '/about',
          '/contact',
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
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 1,
      },
      // Block AI crawlers
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
