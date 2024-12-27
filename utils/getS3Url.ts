import { env } from '/env'

/** Make an S3 object URL using a path */
export const getS3Url = (path: string) => {
  return `https://${env.NEXT_PUBLIC_AWS_BUCKET}.s3.${env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${path}`
}
