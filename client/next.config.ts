import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://hireme-yu0h.onrender.com/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
