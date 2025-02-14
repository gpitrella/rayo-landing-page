/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: '', // Usually empty, but can be specified if needed
        pathname: '/**', // Allows all paths on this hostname
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: '', 
        pathname: '/**', 
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: '', 
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '', 
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;
