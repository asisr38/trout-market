import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      // The signage screens now live at /tv1 (board) and /tv2 (slideshow).
      { source: "/tv", destination: "/tv1", permanent: false },
    ];
  },
};

export default nextConfig;
