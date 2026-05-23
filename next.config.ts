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
};

export default nextConfig;
