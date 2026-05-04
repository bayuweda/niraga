'use client'

import Navbar from '@/components/ui/Navbar'
import Badge from '@/components/ui/Badge'
import { useAuth } from '@/lib/store'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { initialized, user, initialize } = useAuth()
  const router = useRouter()

  useEffect(() => {
    initialize()
  }, [])

  const handleGetStarted = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/buat-toko')
    }
  }

  return (
    <main>
      {/* SECTION 1: NAVBAR */}
      <Navbar />

      {/* SECTION 2: HERO */}
      <section className="pt-16 text-center relative overflow-hidden py-20 md:py-28 lg:py-36">
        {/* Green glow */}
        <div className="hero-glow" />

        {/* Grid pattern */}
        <div className="hero-grid" />

        <div className="relative z-10 max-w-3xl mx-auto px-4">
          {/* Badge */}
          <div className="tag-badge mb-7 mx-auto w-fit">
            <div className="animated-dot" />
            Gratis untuk memulai · Tanpa kartu kredit
          </div>

          {/* H1 */}
          <h1 className="font-display font-bold leading-[1.06] tracking-[-2px] text-gray-900 mb-5 text-4xl md:text-6xl lg:text-7xl">
            Jualan di WhatsApp<br />
            <em className="italic text-green-600">tanpa ribet catat order</em>
          </h1>

          {/* Paragraph */}
          <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto mb-10">
            Bikin katalog produk yang rapi, share link ke pelanggan, dan terima order
            langsung lewat WhatsApp — gratis, tanpa ribet, cukup 5 menit.
          </p>

          {/* CTA row */}
          <div className="flex gap-3 justify-center flex-wrap mb-16">
            {initialized && (
              <button onClick={handleGetStarted} className="btn-primary text-base px-8 py-3.5">
                {user ? 'Buka Dashboard →' : 'Buat Toko Gratis →'}
              </button>
            )}
            <a href="/toko/dapur-dinda" className="btn-outline text-base py-3.5 px-8">
              Lihat Demo →
            </a>
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {[
              ['5 Menit', 'Setup toko pertama'],
              ['Rp 0', 'Untuk memulai'],
              ['24/7', 'Order masuk'],
              ['0%', 'Komisi transaksi'],
            ].map(([num, label], i, arr) => (
              <div key={num} className="flex flex-col items-center">
                <div className="font-display font-bold text-2xl text-gray-900 tracking-tight">
                  {num}
                </div>
                <div className="text-xs text-gray-400 font-medium mt-0.5">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PAIN SECTION */}
      <section className="bg-dark section-padding">
        <div className="container-app text-center max-w-3xl mx-auto">
          <div className="text-xs font-bold text-green-400 uppercase tracking-widest mb-3">
            Masalah yang kamu rasain
          </div>
          <h2 className="font-display font-bold text-white leading-tight tracking-tight mb-5 text-3xl md:text-4xl lg:text-5xl">
            Jualan di WhatsApp <em className="italic text-green-400">berantakan</em>?
          </h2>
          <p className="text-gray-400 text-base leading-relaxed mb-10">
            Chat campur aduk, order ilang, harga harus diketik ulang tiap kali.
            Pelanggan bingung, kamu stres.
          </p>

          <div className="flex flex-col gap-3 text-left max-w-lg mx-auto">
            {[
              { icon: '💬', title: 'Chat WA berantakan', desc: 'Order campur aduk dengan chat pribadi.' },
              { icon: '📝', title: 'Order sering ilang', desc: 'Lupa catat, salah total, pelanggan komplain.' },
              { icon: '📷', title: 'Foto produk bertebaran', desc: 'Harus kirim satu-satu, sering salah kirim.' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3.5 bg-white/5 border border-white/8 rounded-2xl p-5"
              >
                <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center text-lg flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-white mb-1">{item.title}</div>
                  <div className="text-xs text-white/45 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS (SIMPLE — 3 STEPS) */}
      <section className="bg-white py-20">
        <div className="container-app text-center">
          <div className="tag-badge mx-auto w-fit mb-4">
            <div className="animated-dot" />
            Cara Pakai
          </div>
          <h2 className="font-display font-bold text-gray-900 text-3xl md:text-4xl mb-3">
            Dapat order dalam 3 langkah simpel
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-12">
            Tanpa daftar dulu, langsung buat katalog dan terima order lewat WhatsApp.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                step: '1',
                title: 'Buat Katalog',
                desc: 'Input produk: nama, harga, foto. Cukup 5 menit.',
              },
              {
                step: '2',
                title: 'Share Link',
                desc: 'Dapat link unik, share ke pelanggan lewat WA atau IG.',
              },
              {
                step: '3',
                title: 'Terima Order',
                desc: 'Pelanggan klik "Pesan", order masuk lewat WhatsApp kamu.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-3xl p-6 relative">
                <div className="w-11 h-11 mx-auto mb-4 rounded-full bg-green-600 text-white flex items-center justify-center font-display font-bold text-lg shadow-green-sm">
                  {item.step}
                </div>
                <div className="font-bold text-gray-900 mb-1.5">{item.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>

                {i < 2 && (
                  <div className="hidden md:block absolute right-[-16px] top-1/2 -translate-y-1/2 text-green-300 text-xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a href="/buat-toko" className="btn-primary text-base px-8 py-3.5">
              Buat Toko Gratis →
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 5: FEATURES */}
      <section className="bg-green-50 section-padding">
        {/* Header */}
        <div className="container-app text-center mb-14">
          <div className="tag-badge mx-auto w-fit mb-4">
            <div className="animated-dot" />
            Fitur Utama
          </div>
          <h2 className="font-display font-bold tracking-tight mt-4 mb-3 text-3xl md:text-5xl text-gray-900">
            Katalog rapi,<br />
            order langsung ke WhatsApp
          </h2>
          <p className="text-base text-gray-500 leading-relaxed max-w-lg mx-auto">
            Fokus pada yang penting: biar pelanggan pesan dengan gampang, kamu terima order tanpa ribet.
          </p>
        </div>

        {/* Grid */}
        <div className="container-app grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Featured card */}
          <div className="bg-green-600 border-transparent rounded-3xl p-7 md:col-span-2 lg:col-span-2">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl mb-5">
              💬
            </div>
            <div className="text-white font-bold text-lg mb-2">Order langsung ke WhatsApp</div>
            <div className="text-white/65 text-sm leading-relaxed">
              Pelanggan klik "Pesan", pilih produk, dan order otomatis terkirim ke WhatsApp kamu.
              Terstruktur, rapi, dan nggak peru kamu ketik ulang.
            </div>
          </div>

          {/* Feature cards */}
          {[
            {
              icon: '🛍️',
              title: 'Katalog Produk',
              desc: 'Tambah foto, nama, harga. Siap dishare dalam 5 menit.',
            },
            {
              icon: '🛒',
              title: 'Keranjang Belanja',
              desc: 'Pelanggan bisa pilih banyak produk sekaligus, sekali klik terkirim semua.',
            },
            {
              icon: '📋',
              title: 'Order Tercatat',
              desc: 'Semua pesanan masuk ke WhatsApp kamu. Nggak ada order ilang.',
            },
            {
              icon: '📱',
              title: 'Mobile-First',
              desc: 'Toko tampil sempurna di HP pelanggan. Klik dan langsung pesan.',
            },
            {
              icon: '🆓',
              title: 'Gratis Selamanya',
              desc: 'Fitur inti gratis tanpa batas. Upgrade kalau butuh fitur tambahan.',
            },
          ].map((feat, i) => (
            <div key={i} className="card-base">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-2xl mb-5">
                {feat.icon}
              </div>
              <div className="text-gray-900 font-bold text-base mb-2">{feat.title}</div>
              <div className="text-gray-500 text-sm leading-relaxed">{feat.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: CTA */}
      <section className="bg-white section-padding">
        <div className="container-app">
          <div className="bg-green-700 rounded-4xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="cta-glow" />

            <h2 className="font-display font-bold text-white text-3xl md:text-5xl tracking-tight mb-3 relative z-10">
              Siap rapikan jualan<br />
              di WhatsApp kamu?
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-9 relative z-10">
              Buat katalog gratis, share link, dan terima order langsung lewat WhatsApp.
            </p>
            <a href="/buat-toko" className="btn-white relative z-10">
              Buat Toko Gratis →
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="container-app flex justify-between items-center flex-wrap gap-4">
          <div className="font-display italic text-green-700 font-bold text-lg">
            Nira<span className="text-green-600">ga</span>
          </div>
          <div className="text-xs text-gray-400">
            © 2025 Niraga. Dibuat dengan ❤️ untuk UMKM Indonesia.
          </div>
        </div>
      </footer>
    </main>
  )
}
