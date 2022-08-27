/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'media.graphassets.com',
      'lh3.googleusercontent.com',
      's.gravatar.com',
    ],
  },

  reactStrictMode: true,
};

module.exports = nextConfig;
