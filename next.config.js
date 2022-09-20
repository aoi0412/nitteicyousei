/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
};

module.exports = {
  experimental: {
    optimizeFonts: true,
  },
};

module.exports = nextConfig;
