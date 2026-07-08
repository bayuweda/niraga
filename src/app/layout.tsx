import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { Suspense } from 'react'
import LoadingBar from '@/components/ui/LoadingBar'
import Navbar from '@/components/ui/Navbar'
import AuthInit from '@/components/ui/AuthInit'

const SITE_URL = 'https://niraga.online'

export const metadata: Metadata = {
  title: { default: 'Niraga - Katalog WA untuk Toko Online', template: '%s | Niraga' },
  description: 'Buat katalog WA toko online kamu dalam 2 menit. Gratis selamanya.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    siteName: 'Niraga',
    title: 'Niraga - Katalog WA untuk Toko Online',
    description: 'Buat katalog WA toko online kamu dalam 2 menit. Gratis selamanya.',
    url: SITE_URL,
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Niraga - Katalog WA untuk Toko Online',
    description: 'Buat katalog WA toko online kamu dalam 2 menit. Gratis selamanya.',
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  other: {
    'theme-color': '#16a34a',
  },
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${poppins.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Niraga',
              applicationCategory: 'BusinessApplication',
              description: 'Buat katalog WA toko online dalam 2 menit. Gratis selamanya.',
              url: SITE_URL,
              operatingSystem: 'Web',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'IDR' },
            }),
          }}
        />
        <AuthInit />
        <Suspense fallback={null}>
          <LoadingBar />
        </Suspense>
        <Navbar />
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
