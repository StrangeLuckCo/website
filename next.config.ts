import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strange-luck.s3.us-east-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
