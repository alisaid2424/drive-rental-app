import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,

  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    qualities: [75, 80],
  },

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
