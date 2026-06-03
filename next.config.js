/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://backend.nextdigihome.com',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend.nextdigihome.com',
      },
      {
        protocol: 'https',
        hostname: 'nextdigihome.com',
      },
    ],
  },
  async rewrites() {
    const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'https://backend.nextdigihome.com').replace(/\/$/, '');
    return [
      {
        source: '/api/admin/:path*',
        destination: `${apiBase}/api/admin/:path*`,
      },
      {
        source: '/api/auth/:path*',
        destination: `${apiBase}/api/auth/:path*`,
      },
      {
        source: '/api/login',
        destination: `${apiBase}/api/login`,
      },
      {
        source: '/api/cart/:path*',
        destination: `${apiBase}/api/cart/:path*`,
      },
      {
        source: '/api/products/:path*',
        destination: `${apiBase}/api/products/:path*`,
      },
      {
        source: '/api/content/:path*',
        destination: `${apiBase}/api/content/:path*`,
      },
      {
        source: '/api/categories/:path*',
        destination: `${apiBase}/api/categories/:path*`,
      },
      {
        source: '/api/settings',
        destination: `${apiBase}/api/settings`,
      },
    ];
  },
};

module.exports = nextConfig;
