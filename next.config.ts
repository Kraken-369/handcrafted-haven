import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'fastly.picsum.photos',
      'cdn.pixabay.com',
      'i.pravatar.cc',
    ],
  },
};

export default nextConfig;
