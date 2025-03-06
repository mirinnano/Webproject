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
module.exports = {
    experimental: {
        isTurbopack: false,
    },
};

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'cdn.discordapp.com'
            }
        ]
    }
}
export default nextConfig;
