import type { Metadata } from 'next'
import { Poppins, Instrument_Serif } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { Suspense } from 'react'
import LoadingBar from '@/components/ui/LoadingBar'
import Navbar from '@/components/ui/Navbar'
import AuthInit from '@/components/ui/AuthInit'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${poppins.variable} ${instrumentSerif.variable}`}>
      <body>
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
