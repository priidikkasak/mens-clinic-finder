import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow builds without env vars (they'll fail at runtime, not build time)
  typescript: {
    ignoreBuildErrors: false,
  },
}

export default nextConfig
