import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://nextdigihome.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/dashboard/', '/api/', '/checkout/', '/cart/', '/signin/', '/signup/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
