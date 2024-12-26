import type { DesignWork as DesignWorkProps } from '../../res/design'

export const DesignWork = ({ name, imageURL, href }: DesignWorkProps) => {
  return (
    <a
      href={href}
      className="!no-underline group relative flex items-center px-gutter py-2 transition-[font-weight,color] hover:font-black hover:text-light"
      target="_blank"
    >
      <img
        src={imageURL}
        alt=""
        className="-translate-x-1.5 absolute inset-0 h-full w-full bg-dark object-cover opacity-0 transition-[opacity,translate] group-hover:translate-x-0 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-dark/60 opacity-0 transition-opacity group-hover:opacity-100" />

      <h1 className="relative z-10 flex-1 underline">{name}</h1>

      <svg
        viewBox="0 0 85 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="56"
        height="56"
        className="relative z-10 h-14 w-14 stroke-4 transition-[stroke-width] group-hover:stroke-7"
      >
        <path d="M42.5 17.7083L67.2917 42.4999L42.5 67.2916M17.7083 42.4999H67.2917H17.7083Z" stroke="currentColor" />
      </svg>
    </a>
  )
}
