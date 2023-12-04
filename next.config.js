/** @type {import('next').NextConfig} */

/* 
  This file is used to configure Next.js.
*/
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.dummyjson.com", // dummyjson.com for image placeholders
      },
    ],
  },
};

module.exports = nextConfig;
