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
      {
        source: "/bms",
        destination: "https://ev-bms-showcase.vercel.app/",
      },
      {
        source: "/bms/:path*",
        destination: "https://ev-bms-showcase.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
