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
        source: '/api/:path*',
        destination: `${apiBase}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
