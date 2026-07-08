import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buat Toko Online Gratis - Niraga',
  description: 'Buat toko online dengan katalog WhatsApp dalam 2 menit. Gratis, tanpa daftar dulu. Tinggal isi nama toko dan nomor WA, langsung jadi.',
  openGraph: {
    title: 'Buat Toko Online Gratis - Niraga',
    description: 'Buat toko online dengan katalog WhatsApp dalam 2 menit. Gratis selamanya.',
  },
}

export default function BuatTokoLayout({ children }: { children: React.ReactNode }) {
  return children
}
