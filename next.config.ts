import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{hostname: 'i.pravatar.cc'}, {hostname: 'c.pxhere.com'}]
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
};

export default nextConfig;
