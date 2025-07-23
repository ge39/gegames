import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  async headers() {
    return [
      {
        source: '/roms/(.*)',
        headers: [
          {
            key: 'Content-Encoding',
            value: '',
          },
          {
            key: 'Content-Type',
            value: 'application/octet-stream',
          },
        ],
      },
    ];
  },
};



export default nextConfig;
