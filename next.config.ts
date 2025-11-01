import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  // Ignore ESLint errors during build to prevent build failures
  // ESLint should still be run separately via `npm run lint`
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure build caching for faster rebuilds
  // Next.js automatically uses .next/cache directory for build caching
  // Ensure this directory is persisted in CI/CD environments for optimal performance
  // Note: Turbopack is enabled via --turbo flag, no config needed
  // Configure webpack cache for all builds (filesystem cache)
  webpack: (config, { dev, isServer }) => {
    // Enable filesystem caching for faster rebuilds in both dev and production
    if (!isServer) {
      config.cache = {
        type: "filesystem",
        // Note: buildDependencies config removed to avoid resolution warnings
        // Next.js handles config file watching automatically
      };
    }
    return config;
  },
};

export default nextConfig;
