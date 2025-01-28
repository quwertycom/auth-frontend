import type { NextConfig } from 'next';

const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  distDir: '.next',
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '0.0.0.0:3000'],
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
    dirs: [
      'app',
      'components',
      'lib',
      'pages',
      'tests',
      'utils',
      'types',
    ],
  },
};

export default config;
