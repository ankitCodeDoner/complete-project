
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Enable React Compiler */
  reactCompiler: true,

  /* Allow external images */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;