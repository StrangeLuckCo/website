import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strange-luck-website.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "t2.genius.com",
      },
    ],
  },
};

export default nextConfig;
