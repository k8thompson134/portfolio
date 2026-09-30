import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/where-to/:path*", destination: "https://whereto.k8thompson.dev/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
