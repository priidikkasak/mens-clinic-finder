import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
})
const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
})
const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: {
    default: 'MensClinicFinder — The Men\'s Health Clinic Directory',
    template: '%s | MensClinicFinder',
  },
  description: 'Compare verified men\'s health clinics worldwide. Transparent pricing, vetted providers. Find testosterone therapy, penile enhancement, ED treatment and more.',
  openGraph: { siteName: 'MensClinicFinder', type: 'website' },
  metadataBase: new URL('https://mensclincfinder.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="flex flex-col min-h-dvh">
        <NuqsAdapter>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </NuqsAdapter>
      </body>
    </html>
  )
}
