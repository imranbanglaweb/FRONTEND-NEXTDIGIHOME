import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // Proxy API requests to Laravel backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://backend.nextdigihome.com/api/:path*',
      },
    ];
  },
  // Environment variables
  env: {
    BACKEND_URL: 'https://backend.nextdigihome.com',
  },
};

export default nextConfig;
