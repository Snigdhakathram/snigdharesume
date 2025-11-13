import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'resumate.vrandagarg.in',
      },
      {
        protocol: 'https',
        hostname: 'smartbite.vrandagarg.in',
      },
    ],
  },
};

export default nextConfig;
