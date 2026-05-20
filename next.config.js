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
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://nextdigihome.com'}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;