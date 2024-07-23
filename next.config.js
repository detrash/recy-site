/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media.graphassets.com'],
  },
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
