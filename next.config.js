/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "choco-image-server.cdn.ntruss.com",
      "localhost",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
