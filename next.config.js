/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp"],
    domains: [
      "choco-image-server.cdn.ntruss.com",
      "localhost",
      "lh3.googleusercontent.com",
    ],
  },
  experimental: {
    taint: true,
  },
};

module.exports = nextConfig;
