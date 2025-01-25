/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    turbo: {
      rules: {
        '*.svg': ['@svgr/webpack'],
      },
    },
  },
  // Ensure static assets are copied
  outputFileTracingRoot: process.cwd(),
  outputFileTracingIncludes: {
    '/**/*': ['./public/**/*'],
  },
};

export default nextConfig;
