/** @type {import('next').NextConfig} */
const BACKEND_URL = process.env.BACKEND_URL || 'https://gradesense.up.railway.app';

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/api/:path*', destination: `${BACKEND_URL}/api/:path*` },
      { source: '/health', destination: `${BACKEND_URL}/health` },
      { source: '/version', destination: `${BACKEND_URL}/version` },
    ];
  },
};

module.exports = nextConfig;
