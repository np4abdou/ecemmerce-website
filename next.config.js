/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true
    },
    experimental: {
      esmExternals: 'loose'
    },
    eslint: {
      ignoreDuringBuilds: true, // This will allow the build to complete even with ESLint errors
    },
};
  
module.exports = nextConfig;
