import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    // App Router is stable in Next 15, no flag needed
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
