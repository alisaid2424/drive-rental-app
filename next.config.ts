import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,

  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  allowedDevOrigins: ["roseately-patternless-jensen.ngrok-free.dev"],
};

export default nextConfig;
