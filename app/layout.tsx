import { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

import './global.css'

const lexend = Lexend({ subsets: ['latin'] })

const sharedMetadata = {
  title: {
    absolute: 'Benji',
    template: '%s - Benji',
  },
  description: 'Hi, I\'m Benji. I make websites that bring joy. Click through to learn more about me!',
} satisfies Metadata

export const metadata: Metadata = {
  ...sharedMetadata,
  metadataBase: new URL('https://bengrant.dev'),
  icons: [{ rel: 'mask-icon icon', url: '/favicon.svg' }],
  themeColor: '#14072E',
  keywords: ['benji', 'personal', 'resume', 'about', 'projects', 'crab fit', 'blog'],
  openGraph: {
    type: 'website',
    ...sharedMetadata,
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) =>
  <html lang="en">
    <body className={lexend.className}>
      {children}
      <Analytics />
    </body>
  </html>

export default RootLayout
