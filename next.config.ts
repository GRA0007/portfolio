import type { NextConfig } from 'next'

// Validate env variables
import '/env'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    reactCompiler: true,
  },
}

export default nextConfig
