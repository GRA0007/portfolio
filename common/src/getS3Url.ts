/** Make an S3 object URL using a path */
export const getS3Url = (path: string, env: { NEXT_PUBLIC_AWS_BUCKET: string; NEXT_PUBLIC_AWS_REGION: string }) => {
  return `https://${env.NEXT_PUBLIC_AWS_BUCKET}.s3.${env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${path}`
}
