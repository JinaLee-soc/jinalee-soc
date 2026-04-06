/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/jinalee-soc',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
