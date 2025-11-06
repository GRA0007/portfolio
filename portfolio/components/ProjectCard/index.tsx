import { getS3Url } from 'common/src/getS3Url'
import { useId } from 'react'
import { env } from '/env'
import type { Project as ProjectProps } from '/res/projects'

export const ProjectCard = ({ name, description, image, href }: ProjectProps) => {
  const id = useId()

  return (
    <a
      href={href}
      className="hover:-translate-y-0.5 group focus-ring rounded-sm transition-transform"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
    >
      <article>
        <img
          src={getS3Url(`Portfolio/Projects/${image.src}`, env)}
          alt={image.alt}
          className="aspect-video w-full rounded-2xl bg-current object-cover"
        />
        <h1 id={`${id}-title`} className="mt-4 mb-0.5 font-semibold text-xl group-hover:underline">
          {name}
        </h1>
        <p id={`${id}-description`}>{description}</p>
      </article>
    </a>
  )
}
