/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*.bing.com', // Allows any hostname
          },
        ],
      },
};

export default nextConfig;
