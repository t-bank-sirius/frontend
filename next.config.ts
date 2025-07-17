import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    APP_URL: process.env.APP_URL,
    SERVER_URL: process.env.SERVER_URL
  },
  output: "standalone",
};

export default nextConfig;
