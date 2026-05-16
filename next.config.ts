import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // Proxy API requests to Laravel backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
    ];
  },
  // Environment variables
  env: {
    BACKEND_URL: 'http://localhost:8000',
  },
};

export default nextConfig;
