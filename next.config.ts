import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images-assets.nasa.gov" },
      { protocol: "https", hostname: "science.nasa.gov" },
      { protocol: "https", hostname: "stsci-opo.org" },
      { protocol: "https", hostname: "esahubble.org" },
      { protocol: "https", hostname: "cdn.esawebb.org" },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "@react-three/drei"],
  },
};

export default nextConfig;
