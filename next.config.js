/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ogp.re-taro.dev', 'res.cloudinary.com'],
  }
};

module.exports = config;
