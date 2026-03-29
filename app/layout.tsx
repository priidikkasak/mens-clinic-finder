import type { Metadata } from 'next'
import { Geist, Geist_Mono, Syne } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const syne = Syne({ variable: '--font-syne', subsets: ['latin'], weight: ['700', '800'] })

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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${syne.variable}`}>
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
