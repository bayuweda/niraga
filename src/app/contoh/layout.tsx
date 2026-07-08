import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contoh Toko - Niraga',
  description: 'Lihat contoh toko Niraga — katalog WhatsApp frozen food dengan tampilan profesional. Pelanggan bisa lihat produk, pilih, dan pesan langsung via WA.',
  openGraph: {
    title: 'Contoh Toko - Niraga',
    description: 'Lihat contoh toko Niraga — katalog WhatsApp frozen food profesional.',
  },
}

export default function ContohLayout({ children }: { children: React.ReactNode }) {
  return children
}
