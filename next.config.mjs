/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "http",
        hostname: "static.nowcoder.com",
      },
      {
        protocol: "http",
        hostname: "images.nowcoder.com",
      },
    ],
  },
};

export default nextConfig;
