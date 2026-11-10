import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: "/media",
        destination: "/watch",
        permanent: true,
      },
      {
        source: "/store",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/collection/:path*",
        destination: "/shop",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
