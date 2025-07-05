#!/bin/bash

# Clean build script for EdgeOne deployment
# Removes cache files that exceed 25MB limit

echo "🧹 Cleaning cache files before build..."

# Remove Next.js cache
rm -rf apps/main-site/.next/cache
rm -rf .next/cache

# Remove Turbo cache
rm -rf .turbo

# Remove webpack cache
rm -rf cache
rm -rf **/cache

echo "🏗️  Building application..."

# Build the application
npm run build

echo "🧹 Cleaning cache files after build..."

# Remove cache files again after build
rm -rf apps/main-site/.next/cache
rm -rf .next/cache
rm -rf cache
rm -rf **/cache

# Remove any webpack cache files
find . -name "*.pack" -size +20M -delete 2>/dev/null || true

echo "✅ Build completed and cache cleaned!"