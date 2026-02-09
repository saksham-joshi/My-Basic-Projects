import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    'local-origin.dev',
    '*.local-origin.dev'
  ],
};

export default nextConfig;
