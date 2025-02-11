import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    experimental: {
        serverComponentsExternalPackages: ['next-auth']
    }
};
module.exports = {
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
