/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.bing.com", // Allows any hostname
      },
      {
        protocol: "https",
        hostname: "yekosa.com",
      },
    ],
  },
};

export default nextConfig;
