/** @type {import('next').NextConfig} */
const { withPlaiceholder } = require("@plaiceholder/next");
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
}
module.exports = withPlaiceholder(nextConfig)

