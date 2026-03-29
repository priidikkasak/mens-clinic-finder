import type { Metadata } from 'next'
import { Geist, Geist_Mono, DM_Serif_Display } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const dmSerif = DM_Serif_Display({ weight: '400', variable: '--font-display', subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'MensClinicFinder — Find Men\'s Health Clinics Worldwide',
    template: '%s | MensClinicFinder',
  },
  description:
    'Compare men\'s health clinics worldwide. Find vetted providers for testosterone therapy, penile enhancement, erectile dysfunction and more. Honest pricing, verified clinics.',
  openGraph: { siteName: 'MensClinicFinder', type: 'website' },
  metadataBase: new URL('https://mensclincfinder.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${dmSerif.variable}`}>
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
