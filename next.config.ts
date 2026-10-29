import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "*.clerk.accounts.dev" },
    ],
    qualities: [75, 80],
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "motion", "lottie-react"],
  },
};

export default nextConfig;
