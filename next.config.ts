import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't use "standalone" for Cloudflare Workers - OpenNext handles this
  // output: "standalone", // Removed - not needed for Cloudflare Workers
  images: {
    unoptimized: true, // Required for Cloudflare Workers
  },
  // Disable source maps in production to reduce bundle size
  productionBrowserSourceMaps: false,
  // Ignore ESLint errors during build to prevent build failures
  // ESLint should still be run separately via `npm run lint`
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure build caching for faster rebuilds
  // Next.js automatically uses .next/cache directory for build caching
  // Ensure this directory is persisted in CI/CD environments for optimal performance
  // Note: Turbopack is enabled via --turbo flag, no config needed
  // Configure webpack cache and optimizations
  webpack: (config, { dev, isServer }) => {
    // Enable filesystem caching for faster rebuilds in both dev and production
    if (!isServer) {
      config.cache = {
        type: "filesystem",
        // Note: buildDependencies config removed to avoid resolution warnings
        // Next.js handles config file watching automatically
      };
    }

    // Production optimizations to reduce bundle size
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        // Minimize JavaScript bundles
        minimize: true,
        // Split chunks more aggressively for better caching
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            default: false,
            vendors: false,
            // Separate vendor chunks
            vendor: {
              name: "vendor",
              chunks: "all",
              test: /node_modules/,
              priority: 20,
            },
            // Separate common chunks
            common: {
              name: "common",
              minChunks: 2,
              chunks: "all",
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;
