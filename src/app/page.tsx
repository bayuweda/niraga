'use client'

import Navbar from '@/components/ui/Navbar'
import Link from 'next/link'

export default function Home() {
  const handleGetStarted = () => {
    window.location.href = '/buat-toko'
  }

  return (
    <main>
      <Navbar />

      {/* SECTION 1: HERO */}
      <section className="pt-16 min-h-screen flex items-center relative overflow-hidden py-20 md:py-28 lg:py-36">
        <div className="hero-glow" />
        <div className="hero-grid" />

        <div className="relative z-10 w-full">
          <div className="container-app">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* LEFT */}
              <div className="lg:py-10">
                <div className="tag-pill mb-6 w-fit">
                  <div className="live-dot" />
                  Gratis · Tanpa daftar dulu
                </div>

                <h1 className="font-bold leading-[1.06] tracking-[-1.5px] text-gray-900 mb-5 text-[40px] md:text-5xl lg:text-7xl" style={{ fontFamily: 'Instrument Serif, serif' }}>
                  Katalog WA-mu<br />
                  jadi <em className="italic text-green-600">rapi & profesional</em><br />
                  dalam 2 menit
                </h1>

                <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-[480px] mb-9">
                  Buat link toko, tambah produk, dan pelanggan langsung bisa order via WhatsApp dengan format yang rapi — tanpa ribet, tanpa aplikasi tambahan.
                </p>

                <div className="flex gap-3 flex-wrap mb-10">
                  <button onClick={handleGetStarted} className="btn-primary text-base px-8 py-3.5 lg:px-9 lg:py-4">
                    Buat Toko Sekarang →
                  </button>
                  <a href="/toko/dapur-dinda" className="btn-outline text-base py-3.5 px-8">
                    Lihat Contoh
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="trust-avatars">
                    {['🧑', '👩', '👨', '🧕', '👦'].map((e, i) => (
                      <div key={i} className="trust-av">{e}</div>
                    ))}
                  </div>
                  <div className="trust-text">
                    <span className="text-gray-900 font-bold">2.000+ seller</span> sudah pakai Niraga
                  </div>
                </div>
              </div>

              {/* RIGHT - Phone Mockup */}
              <div className="hidden lg:flex justify-center items-center relative">
                <div className="phone-mock">
                  <div className="phone-bar">
                    <div className="phone-store-info">
                      <div className="phone-av">🥟</div>
                      <div>
                        <div className="phone-sname">Dapur Dinda</div>
                        <div className="phone-ssub">4 produk tersedia</div>
                      </div>
                    </div>
                    <div className="phone-share">🔗</div>
                  </div>
                  <div className="phone-products">
                    {[
                      { e: '🥟', n: 'Siomay Frozen', p: '45.000' },
                      { e: '🍜', n: 'Bakso Sapi', p: '55.000' },
                      { e: '🦐', n: 'Udang Crispy', p: '65.000' },
                      { e: '🥩', n: 'Nugget Ayam', p: '42.000' },
                    ].map((p, i) => (
                      <div key={i} className="phone-prod">
                        <div className="phone-prod-emoji">{p.e}</div>
                        <div className="phone-prod-name">{p.n}</div>
                        <div className="phone-prod-price">Rp {p.p}</div>
                      </div>
                    ))}
                  </div>
                  <div className="phone-cart">
                    <div>
                      <div className="phone-cart-t">2 produk dipilih</div>
                      <div className="phone-cart-s">Total Rp 100.000</div>
                    </div>
                    <div className="phone-cart-btn">Pesan via WA</div>
                  </div>
                </div>

                {/* WA Float */}
                <div className="wa-float">
                  <div className="wa-header">
                    <div className="wa-icon">✓</div>
                    <div className="wa-name">Pesan otomatis terkirim!</div>
                  </div>
                  <div className="wa-msg">
                    Halo Dapur Dinda! 👋{' '}
                    Saya mau pesan:{'\n'}
                    • Siomay × 2 — Rp 90.000{'\n'}
                    Total: Rp 90.000 🙏
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW IT FEELS */}
      <section className="bg-warm py-20 md:py-28 lg:py-32 border-t border-gray-200">
        <div className="container-app">
          <div className="text-center mb-[60px]">
            <div className="tag-pill mb-4 w-fit mx-auto">
              <div className="live-dot" />
              Semudah ini
            </div>
            <h2 className="font-bold tracking-[-1.5px] text-gray-900 mt-4 mb-3.5 text-[28px] md:text-4xl lg:text-5xl" style={{ fontFamily: 'Instrument Serif, serif' }}>
              Dari buka Niraga sampai<br />
              dapat order — 4 langkah
            </h2>
            <p className="text-base text-gray-600 leading-relaxed max-w-[480px] mx-auto">
              Tidak perlu ngerti teknologi. Tidak perlu bayar. Langsung jalan.
            </p>
          </div>

          <div className="flow-steps">
            {[
              { e: '🏪', n: '01', t: 'Buat Toko', d: 'Masukkan nama toko dan nomor WA kamu. Selesai dalam 30 detik.' },
              { e: '📦', n: '02', t: 'Tambah Produk', d: 'Input foto, nama, dan harga produk. Bisa sebanyak yang kamu mau.' },
              { e: '🔗', n: '03', t: 'Share Link', d: 'Dapat link toko unik. Kirim ke pelanggan via WA, IG Story, atau bio.' },
              { e: '✅', n: '04', t: 'Terima Order', d: 'Pelanggan pilih produk → klik Pesan → WA kamu langsung berbunyi.' },
            ].map((s, i) => (
              <div key={i} className="flow-step">
                <div className="flow-num">
                  <div className="flow-emoji">{s.e}</div>
                  <div className="flow-n">{s.n}</div>
                </div>
                <div className="flow-t">{s.t}</div>
                <div className="flow-d">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY */}
      <section className="bg-white py-20 md:py-28 lg:py-32">
        <div className="container-app">
          <div className="text-center mb-14">
            <div className="tag-pill mb-4 w-fit mx-auto">
              <div className="live-dot" />
              Kenapa Niraga
            </div>
            <h2 className="font-bold tracking-tight text-gray-900 text-[28px] md:text-4xl lg:text-5xl mt-4 mb-3.5 leading-tight" style={{ fontFamily: 'Instrument Serif, serif' }}>
              Semua yang kamu butuhkan,<br />
              nggak ada yang bikin mumet
            </h2>
            <p className="text-base text-gray-600 leading-relaxed max-w-[460px] mx-auto">
              Dirancang khusus untuk seller Indonesia yang jualan via WA dan IG.
            </p>
          </div>

          <div className="why-grid">
            {/* Featured Card */}
            <div className="why-card featured">
              <div className="wc-ic" style={{ background: 'rgba(255,255,255,.08)' }}>💬</div>
              <div className="wc-t">Pesan WA otomatis, rapi, langsung masuk</div>
              <div className="wc-d">Pelanggan tinggal pilih produk dan klik "Pesan" — WA kamu langsung dapat pesan yang sudah terformat dengan nama produk, jumlah, dan total harga. Kamu tinggal konfirmasi.</div>
              <div className="wc-wa-preview">
                <div className="wa-bubble">
                  <div className="wa-bubble-text">
                    Halo Dapur Dinda! 👋<br />
                    Saya mau pesan:<br />
                    • Siomay Frozen Ayam × 2 — Rp 90.000<br />
                    • Bakso Sapi Premium × 1 — Rp 55.000<br /><br />
                    <b>Total: Rp 145.000</b><br />
                    Mohon konfirmasinya ya kak 🙏
                  </div>
                </div>
              </div>
            </div>

            {[
              { ic: '⚡', t: 'Setup 2 menit', d: 'Tidak perlu daftar dulu. Langsung buat toko, tambah produk, dan share link — semua dalam hitungan menit.' },
              { ic: '🆓', t: 'Gratis selamanya', d: 'Fitur utama gratis tanpa batas. Tidak ada trial, tidak ada kartu kredit, tidak ada biaya tersembunyi.' },
              { ic: '🔗', t: 'Link toko sendiri', d: 'Dapat link niraga.id/namatoko-mu yang bisa ditempel di bio IG, WA, atau dikirim langsung ke pelanggan.' },
              { ic: '📱', t: 'Tampil keren di HP', d: 'Toko kamu otomatis tampil bagus di layar HP pelanggan — seperti app sungguhan, tanpa mereka harus install apapun.' },
            ].map((w, i) => (
              <div key={i} className="why-card">
                <div className="wc-ic">{w.ic}</div>
                <div className="wc-t">{w.t}</div>
                <div className="wc-d">{w.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PAIN → SOLUTION */}
      <section className="bg-dark py-20 md:py-28 lg:py-32">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs font-bold text-green-400 uppercase tracking-widest mb-4">
                Sebelum vs Sesudah
              </div>
              <h2 className="font-bold text-white leading-tight tracking-tight mb-4 text-[28px] md:text-4xl lg:text-5xl" style={{ fontFamily: 'Instrument Serif, serif' }}>
                Kamu capek jualan<br />
                cara <em className="italic text-green-400">lama</em>?
              </h2>
              <p className="text-white/50 text-base leading-relaxed">
                Niraga bukan aplikasi ribet. Ini solusi simpel untuk masalah nyata yang kamu rasain setiap hari.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              {[
                { b: { ic: '😩', t: 'Kirim foto produk satu-satu' }, a: { ic: '🛍️', t: 'Katalog online yang bisa dishare' }, bd: 'Capek screenshot dan kirim foto berulang ke setiap pelanggan.', ad: 'Pelanggan buka link, lihat semua produk, langsung pilih.' },
                { b: { ic: '📝', t: 'Catat order manual di notes' }, a: { ic: '✅', t: 'Pesan WA otomatis dan rapi' }, bd: 'Sering salah catat, lupa, atau bingung siapa yang sudah bayar.', ad: 'Setiap order masuk sudah terformat lengkap di WA kamu.' },
                { b: { ic: '😵', t: 'Jawab pertanyaan yang sama terus' }, a: { ic: '⚡', t: 'Info produk sudah ada di toko' }, bd: '"Masih ada stok?" "Harganya berapa?" — tiap hari, berkali-kali.', ad: 'Pelanggan lihat sendiri stok, harga, dan detail produk.' },
              ].map((p, i) => (
                <div key={i}>
                  <div className="pain-card">
                    <div className="pc-before"><div className="pc-before-box">{p.b.ic}</div></div>
                    <div>
                      <div className="pc-t">{p.b.t}</div>
                      <div className="pc-d">{p.bd}</div>
                    </div>
                  </div>
                  <div className="pain-arrow">↓</div>
                  <div className="pain-card" style={{ background: 'rgba(34,197,94,.06)', border: '1px solid rgba(34,197,94,.15)' }}>
                    <div className="pc-before"><div className="pc-after-box">{p.a.ic}</div></div>
                    <div>
                      <div className="pc-t">{p.a.t}</div>
                      <div className="pc-d" style={{ color: 'rgba(255,255,255,.6)' }}>{p.ad}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA */}
      <section className="py-20 md:py-28 lg:py-32 bg-cream">
        <div className="container-app">
          <div className="cta-box">
            <h2 className="cta-h2">
              Siap bikin toko yang<br />
              bikin pelanggan mudah order?
            </h2>
            <p className="cta-p">
              Gratis. Tanpa daftar dulu. Toko siap dalam 2 menit.
            </p>
            <button onClick={handleGetStarted} className="btn-white">
              Buat Toko Gratis Sekarang →
            </button>
            <div className="cta-note">
              ✓ Gratis selamanya &nbsp;·&nbsp; ✓ Tanpa kartu kredit &nbsp;·&nbsp; ✓ Tanpa install apapun
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="container-app flex justify-between items-center flex-wrap gap-4">
          <div className="font-bold text-green-600 text-xl" style={{ fontFamily: 'Instrument Serif, serif' }}>
            Nira<span className="text-gray-900 font-normal">ga</span>
          </div>
          <div className="text-xs text-gray-400">
            © 2025 Niraga. Dibuat dengan ❤️ untuk UMKM Indonesia.
          </div>
        </div>
      </footer>
    </main>
  )
}