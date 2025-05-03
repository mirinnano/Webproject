import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['next-auth',"discord.js-selfbot-v13"],
  transpilePackages: ['discord.js-selfbot-v13'],
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
  webpack: (config, { isServer }) => {
    // サーバーサイドビルド時のみ.nodeファイルを処理
    if (isServer) {
      config.module.rules.push({
        test: /\.node$/,
        use: 'node-loader',
      });
      
      config.module.rules.push({
        test: /Secretbox\.js$/,
        loader: 'null-loader',
      });
    }
    config.ignoreWarnings = [
      { module: /node_modules\/discord\.js-selfbot-v13/ },
      { message: /Critical dependency: the request of a dependency is an expression/ }
    ];

    return config;
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
