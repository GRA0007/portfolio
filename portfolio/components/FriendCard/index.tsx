import { getS3Url } from 'common/src/getS3Url'
import Link from 'next/link'
import { env } from '/env'

interface FriendCardProps {
  name: string
  url: string
  /** The filename in the s3 bucket located at `Portfolio/Friends` */
  icon: string
}

export const FriendCard = ({ name, url, icon }: FriendCardProps) => {
  return (
    <Link
      href={url}
      target="_blank"
      className="perspective-midrange group focus-ring relative block aspect-video rounded-sm"
    >
      <section className="transform-3d backface-hidden flex aspect-video flex-col items-center justify-center rounded-2xl border-2 border-dark px-2 text-center transition-transform duration-300 group-hover:rotate-y-180">
        <img src={getS3Url(`Portfolio/Friends/${icon}`, env)} alt="" className="mb-2 size-6 rounded-sm" />
        <h1 className="font-semibold text-lg">{name}</h1>
        <p className="text-sm">{new URL(url).host.replace('www.', '')}</p>
      </section>
      <div className="transform-3d backface-hidden absolute inset-0 rotate-y-180 overflow-hidden rounded-2xl transition-transform duration-300 group-hover:rotate-y-360">
        <iframe
          src={url}
          title={name}
          aria-hidden="true"
          className="pointer-events-none aspect-video w-[500%] origin-top-left scale-20 border-0"
          tabIndex={-1}
          loading="lazy"
        />
      </div>
    </Link>
  )
}
