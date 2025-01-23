import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    turbo: {
      loaders: {
        '.svg': ['@svgr/webpack'],
      },
    },
  },
};

export default nextConfig;
