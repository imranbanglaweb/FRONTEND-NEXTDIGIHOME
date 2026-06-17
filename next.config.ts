import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,

  async redirects() {
    return [
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/downloads',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/downloads/:slug',
        destination: '/products/:slug',
        permanent: true,
      },
      {
        source: '/downloads/:slug/',
        destination: '/products/:slug',
        permanent: true,
      },
      {
        source: '/by-failing-to-prepare-you-are-preparing-to-fail',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/my-best-advice-to-entrepreneurs-is-this-forget-about-making-mistakes-just-do-it',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/simplicity-is-the-ultimate-sophistication',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/events/feed',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/\\*',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Proxy API requests to Laravel backend
  async rewrites() {
    const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'https://backend.nextdigihome.com').replace(/\/$/, '');
    return [
      {
        source: '/api/storage/:path*',
        destination: `${apiBase}/public/storage/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${apiBase}/api/:path*`,
      },
    ];
  },
  // Environment variables
  env: {
    BACKEND_URL: process.env.NEXT_PUBLIC_API_URL || 'https://backend.nextdigihome.com',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://backend.nextdigihome.com',
  },
  // Headers for favicon and static assets
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/x-icon',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/favicon.svg',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/svg+xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.(svg|png|jpg|jpeg|webp|gif|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/storage/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/api/logo',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
