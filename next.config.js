/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true
    },
    experimental: {
      esmExternals: 'loose'
    }
};
  
module.exports = nextConfig;
