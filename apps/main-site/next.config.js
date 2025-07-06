/** @type {import('next').NextConfig} */
const nextConfig = {
  // External packages for server components (Prisma no longer needed)
  serverExternalPackages: [],

  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      // Add your production image domains here
      {
        protocol: 'https',
        hostname: 'cdn.southpole.com',
      },
      // Umbraco media
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
      },
      {
        protocol: 'https',
        hostname: 'cms.southpole.com',
      },
    ],
  },

  // Environment configuration
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // Redirects
  async redirects() {
    return [
      // Add any necessary redirects here
      // Example:
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true,
      // },
    ]
  },

  // Rewrites for API routes or proxy
  async rewrites() {
    return [
      // Example: Proxy API requests in development
      // {
      //   source: '/api/:path*',
      //   destination: 'http://localhost:3001/api/:path*',
      // },
    ]
  },

  // Output configuration for deployment
  output: 'standalone',

  // Compression
  compress: true,

  // Performance optimizations
  poweredByHeader: false,
  
  // Build configuration
  transpilePackages: ['@repo/ui'],
  
  // Disable file-system caching for EdgeOne deployment
  cacheHandler: undefined,
  cacheMaxMemorySize: 0,

  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Custom webpack configuration
    if (!dev && !isServer) {
      // Optimize bundle splitting
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      }
    }

    return config
  },

  // Compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

export default nextConfig