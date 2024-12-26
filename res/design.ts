export interface DesignWork {
  name: string
  /** The filename in the s3 bucket located at `Portfolio/Design Work` */
  image: string
  href: string
}

export const DESIGNWORK: DesignWork[] = [
  {
    name: 'Monash Society for Physics, Astro & Maths Brand Redesign',
    image: 'spam_logo.webp',
    href: 'https://www.notion.so/Monash-Society-for-Physics-Astro-and-Maths-Brand-Redesign-55b1481c1250486396a76ab14f0ef2b6',
  },
  {
    name: 'RMIT Blockchain Club Logo Redesign',
    image: 'blockchain_club.webp',
    href: 'https://www.notion.so/RMIT-Blockchain-Club-logo-redesign-32290780185c430aa06e3422686843c6',
  },
  {
    name: 'RMIT Technology Coalition Logo Redesign',
    image: 'tech_coalition.webp',
    href: 'https://www.notion.so/RMIT-Technology-Coalition-logo-redesign-07546105c8ce4ae09c7365ec80668a57',
  },
  {
    name: 'RMIT CSIT Society Brand Redesign',
    image: 'csit.webp',
    href: 'https://www.notion.so/RMIT-CSIT-Society-brand-redesign-e3fb846876cf4cc5a83501b5f107dabe',
  },
]
