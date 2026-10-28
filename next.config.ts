import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
    qualities: [75, 80],
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "motion", "lottie-react"],
  },
};

export default nextConfig;
