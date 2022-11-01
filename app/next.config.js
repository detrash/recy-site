const { i18n } = require('./next-i18next.config');
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'media.graphassets.com',
      'lh3.googleusercontent.com',
      's.gravatar.com',
    ],
  },
  i18n,
  reactStrictMode: true,
};

module.exports = nextConfig;
