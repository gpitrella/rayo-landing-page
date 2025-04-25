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
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '', 
        pathname: '/**', 
      }
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)", 
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Cross-Origin-Embedder-Policy", value: "unsafe-none" },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true, // Soporte para await en el nivel superior
      layers: true, // Habilita soporte para capas, necesario para algunos paquetes modernos
    };
    return config;
  },
};

export default nextConfig;