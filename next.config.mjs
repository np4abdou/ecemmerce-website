/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // This is important for Cloudflare Pages
  trailingSlash: true,
}

module.exports = nextConfig

