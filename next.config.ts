import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['next-auth'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/proxy/:url*',
        destination: 'https://:url*',
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/proxy/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' * blob: data:; script-src 'self' * 'unsafe-inline' 'unsafe-eval'; style-src 'self' * 'unsafe-inline'; img-src 'self' * data:; connect-src 'self' *; font-src 'self' *; media-src 'self' *; object-src 'none'; frame-src 'self';"
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 
              'http://localhost:3000' 
              
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-Requested-With'
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true'
          },
          {
            key: 'Referrer-Policy',
            value: 'no-referrer-when-downgrade'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          }
        ]
      }
    ]
  }
};

export default nextConfig;
