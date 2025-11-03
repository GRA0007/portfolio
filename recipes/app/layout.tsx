import type { Metadata, Viewport } from 'next'
import { Fira_Code, Literata } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import './globals.css'

const literata = Literata({ subsets: ['latin'], variable: '--font-body' })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-meta' })

export const metadata: Metadata = {
  metadataBase: new URL('https://bengrant.dev'),
  title: {
    absolute: "benji's recipes",
    template: "%s - benji's recipes",
  },
  description: 'A collection of recipes from Benji',
  keywords: ['benji', 'recipe', 'collection'], // TODO: include tags
  openGraph: {
    type: 'website',
  },
  alternates: {
    canonical: '/',
  },
  robots: 'index, follow',
}

export const viewport: Viewport = {
  themeColor: '#ECE9E2',
  colorScheme: 'light',
}

export const revalidate = 3600 // 1 hour

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={`${literata.variable} ${firaCode.variable}`}>
      <NuqsAdapter>{children}</NuqsAdapter>
    </body>
  </html>
)

export default RootLayout
