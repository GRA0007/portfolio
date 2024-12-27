import { SOCIAL_LINKS } from './socialLinks'

export const Socials = () => (
  <ul className="flex items-center justify-center gap-6" aria-label="Social links">
    {SOCIAL_LINKS.map((link) => (
      <li key={link.title}>
        <a href={link.href} target="_blank" className="link inline-block" title={link.title}>
          {link.icon}
        </a>
      </li>
    ))}
  </ul>
)
