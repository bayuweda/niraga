import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Niraga — Toko Online & Bot AI untuk UMKM',
  description: 'Setup toko online dalam 5 menit. Bot AI jawab pelanggan otomatis, catat order, dan rekap harian — gratis.',
  keywords: 'toko online, UMKM, bot AI, katalog produk, order otomatis',
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
