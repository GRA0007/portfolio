import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    reactCompiler: true,
  },
}

export default nextConfig
