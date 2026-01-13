import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/CardValue",
        destination: "https://card-value-ashen.vercel.app/CardValue",
      },
      {
        source: "/CardValue/:path*",
        destination: "https://card-value-ashen.vercel.app/CardValue/:path*",
      },
    ];
  },
};

export default nextConfig;
