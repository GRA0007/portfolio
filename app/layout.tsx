import { Metadata } from 'next'
import './global.css'
import { Lexend } from 'next/font/google'

const lexend = Lexend({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Benji',
  description: 'Hi, I\'m Benji. I make websites that bring joy. Click through to learn more about me!',
  icons: [{ rel: 'mask-icon icon', url: 'favicon.svg' }],
}

const RootLayout = ({ children }: { children: React.ReactNode }) =>
  <html lang="en">
    <body className={lexend.className}>{children}</body>
  </html>

export default RootLayout
