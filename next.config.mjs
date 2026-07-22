import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  const isDevelopment = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    distDir: isDevelopment ? '.next-dev' : '.next',

    typescript: {
      ignoreBuildErrors: true,
    },

    devIndicators: false,

    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
        {
          protocol: 'https',
          hostname: 'i.pinimg.com',
        },
      ],
    },
  };
};

export default nextConfig;
