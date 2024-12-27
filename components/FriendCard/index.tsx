import Link from 'next/link'

interface FriendCardProps {
  name: string
  url: string
}

export const FriendCard = ({ name, url }: FriendCardProps) => {
  return (
    <Link
      href={url}
      target="_blank"
      className="perspective-midrange group focus-ring relative block aspect-video rounded-sm"
    >
      <section className="transform-3d backface-hidden flex aspect-video flex-col justify-center gap-2 rounded-2xl bg-dark px-2 text-center text-light transition-transform duration-300 group-hover:rotate-y-180">
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
        />
      </div>
    </Link>
  )
}
