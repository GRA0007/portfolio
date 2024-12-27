import type { Metadata, Viewport } from 'next'
import { Lexend } from 'next/font/google'
import './global.css'

const lexend = Lexend({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://bengrant.dev'),
  title: {
    absolute: 'Benji',
    template: '%s - Benji',
  },
  description: "Hi, I'm Benji. I make websites that bring joy. Click through to learn more about me!",
  keywords: ['benji', 'personal', 'resume', 'about', 'projects', 'crab fit', 'blog'],
  openGraph: {
    type: 'profile',
    firstName: 'Benji',
    lastName: 'Grant',
  },
  robots: 'index, follow',
}

export const viewport: Viewport = {
  themeColor: '#14072E',
  colorScheme: 'dark',
}

export const revalidate = 3600 // 1 hour

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={lexend.className}>{children}</body>
  </html>
)

export default RootLayout
