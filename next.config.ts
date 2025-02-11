import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    experimental: {
        serverComponentsExternalPackages: ['next-auth']
    }
};

export default nextConfig;
