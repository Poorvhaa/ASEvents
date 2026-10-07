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

    // Put metadata in the initial <head> for every user agent. Next streams it
    // into the body by default, and Google ignores body canonicals.
    htmlLimitedBots: /.*/,

    // Let middleware send /gallery/ to /portfolio in one hop. Other trailing
    // slashes are still redirected there, matching the previous behavior.
    skipTrailingSlashRedirect: true,

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

    async redirects() {
      return [
        {
          source: '/privacy',
          destination: '/privacy-policy',
          permanent: true,
        },
        {
          source: '/terms',
          destination: '/terms-of-service',
          permanent: true,
        },
      ];
    },
  };
};

export default nextConfig;
