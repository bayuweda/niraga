import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Niraga — Katalog WA rapi dalam 2 menit',
  description: 'Buat link toko online, tambah produk, dan pelanggan langsung order via WhatsApp dengan format rapi. Gratis, tanpa daftar dulu.',
  keywords: 'katalog online, jualan WA, toko online gratis, UMKM, seller Indonesia',
  openGraph: {
    title: 'Niraga — Katalog WA rapi dalam 2 menit',
    description: 'Buat link toko online, tambah produk, dan pelanggan langsung order via WhatsApp dengan format rapi. Gratis, tanpa daftar dulu.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
