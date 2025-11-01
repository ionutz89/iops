import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  // Configure build caching for faster rebuilds
  // Next.js automatically uses .next/cache directory for build caching
  // Ensure this directory is persisted in CI/CD environments for optimal performance
  experimental: {
    // Enable improved caching with Turbopack (when using --turbo flag)
    turbo: {
      // Cache directory is automatically set to .next/cache
    },
  },
  // Configure webpack cache for all builds (filesystem cache)
  webpack: (config, { dev, isServer }) => {
    // Enable filesystem caching for faster rebuilds in both dev and production
    if (!isServer) {
      config.cache = {
        type: "filesystem",
        buildDependencies: {
          config: [__filename],
        },
      };
    }
    return config;
  },
};

export default nextConfig;
