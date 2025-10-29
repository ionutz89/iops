#!/bin/bash
set -e

echo "🔨 Starting IOPS Pro build process..."

# Step 1: Build Next.js application
echo "📦 Building Next.js application..."
npm run build:next

# Step 2: Generate Cloudflare Worker
echo "⚡ Generating Cloudflare Worker..."
npm run build:worker

echo "✅ Build complete! Ready for deployment."

