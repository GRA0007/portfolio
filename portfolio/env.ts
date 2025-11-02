import { createEnv } from '@t3-oss/env-nextjs'
import * as z from 'zod/mini'

export const env = createEnv({
  server: {
    AWS_ACCESS_KEY_ID: z.string().check(z.minLength(1)),
    AWS_SECRET_ACCESS_KEY: z.string().check(z.minLength(1)),
  },
  client: {
    NEXT_PUBLIC_AWS_REGION: z.string().check(z.minLength(1)),
    NEXT_PUBLIC_AWS_BUCKET: z.string().check(z.minLength(1)),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_AWS_REGION: process.env.NEXT_PUBLIC_AWS_REGION,
    NEXT_PUBLIC_AWS_BUCKET: process.env.NEXT_PUBLIC_AWS_BUCKET,
  },
})
