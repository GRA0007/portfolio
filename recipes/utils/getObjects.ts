import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3'
import { cache } from 'react'
import { env } from '/env'

const s3 = new S3Client({
  region: env.NEXT_PUBLIC_AWS_REGION,
  credentials: { accessKeyId: env.AWS_ACCESS_KEY_ID, secretAccessKey: env.AWS_SECRET_ACCESS_KEY },
})

/** Get a list of all objects from the S3 bucket */
export const getObjects = cache(async () => {
  const res = await s3.send(new ListObjectsV2Command({ Bucket: env.NEXT_PUBLIC_AWS_BUCKET, Prefix: 'Recipes' }))

  return res.Contents?.flatMap((item) => (item.Key ? [item.Key] : [])) ?? []
})
