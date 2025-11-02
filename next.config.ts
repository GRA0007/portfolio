import type { NextConfig } from 'next'

// Validate env variables
import '/env'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactCompiler: true,
}

export default nextConfig
