import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Customize Webpack configuration here if needed
    return config;
  },
};

export default nextConfig;
