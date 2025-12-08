/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "images.nowcoder.com",
      },
    ],
  },
};

export default nextConfig;
