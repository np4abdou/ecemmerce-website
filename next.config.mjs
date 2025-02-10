/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  webpack: (config, { isServer }) => {
    // Add TypeScript loader
    config.module.rules.push({
      test: /\.ts$/,
      use: [{
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }]
    });

    // Handle Cloudflare Workers environment
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }

    return config;
  },
  trailingSlash: true
};

export default nextConfig;