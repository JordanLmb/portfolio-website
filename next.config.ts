import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/CardValue",
        destination: "https://card-value-ashen.vercel.app",
      },
      {
        source: "/CardValue/:path*",
        destination: "https://card-value-ashen.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
