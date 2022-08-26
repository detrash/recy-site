/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'media.graphassets.com',
      'lh3.googleusercontent.com',
      's.gravatar.com',
    ],
  },
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
