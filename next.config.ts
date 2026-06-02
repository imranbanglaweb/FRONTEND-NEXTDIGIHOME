import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // Proxy API requests to Laravel backend
  async rewrites() {
    const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost/NEXTDIGIHOMEBACKEND').replace(/\/$/, '');
    return [
      {
        source: '/api/:path*',
        destination: `${apiBase}/api/:path*`,
      },
    ];
  },
  // Environment variables
  env: {
    BACKEND_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost/NEXTDIGIHOMEBACKEND',
  },
  // Headers for favicon and static assets
  async headers() {
    return [
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
    ];
  },
};

export default nextConfig;
