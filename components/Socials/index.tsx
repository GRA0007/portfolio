import { SOCIAL_LINKS } from './socials'

export const Socials = () => (
  <ul className="mt-8 flex items-center justify-center gap-6">
    {SOCIAL_LINKS.map((link) => (
      <li key={link.title}>
        <a href={link.href} target="_blank" className="inline-block" title={link.title}>
          {link.icon}
        </a>
      </li>
    ))}
  </ul>
)