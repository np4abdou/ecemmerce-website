/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  experimental: {
    runtime: 'edge',
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  trailingSlash: true
};

export default nextConfig;