'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Icon, WhatsAppIcon, TelegramIcon, InstagramIcon } from '@/components/ui/Icons'

export default function Home() {
  const router = useRouter()
  const handleGetStarted = () => {
    router.push('/buat-toko')
  }

  return (
    <main>
      {/* SECTION 1: HERO */}
      <section className="pt-16 min-h-screen flex items-center relative overflow-hidden py-20 md:py-28 lg:py-36">
        <div className="hero-glow" />
        <div className="hero-grid" />

        <div className="relative z-10 w-full">
          <div className="container-app">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* LEFT */}
              <div className="lg:py-10">
                <div className="tag-pill mb-6 w-fit">
                  <div className="live-dot" />
                  Gratis · Tanpa daftar dulu
                </div>

                <h1 className="font-display font-bold leading-[1.06] tracking-[-1.5px] text-gray-900 mb-5 text-[40px] md:text-5xl lg:text-7xl">
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
                  <a href="/contoh" className="btn-outline text-base py-3.5 px-8">
                    Lihat Contoh
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="trust-avatars">
                    {[
                      '#22c55e',
                      '#ec4899',
                      '#3b82f6',
                      '#a855f7',
                      '#f97316',
                    ].map((bg, i) => (
                      <div key={i} className="trust-av" style={{ background: bg }}>
                        <Icon.User size={14} color="white" />
                      </div>
                    ))}
                  </div>
                  <div className="trust-text">
                    <span className="text-gray-900 font-bold">2.000+ seller</span> sudah pakai Niraga
                  </div>
                </div>
              </div>

              {/* RIGHT - Phone Mockup */}
              <div className="flex justify-center items-center relative">
                <div className="phone-frame w-[252px] lg:w-[296px]">
                <div className="phone-notch" />
                <div className="phone-mock w-full">
                  <div className="phone-bar">
                    <div className="phone-store-info">
                      <div className="phone-av"><Icon.Store size={18} className="text-white" /></div>
                      <div>
                        <div className="phone-sname">Dapur Dinda</div>
                        <div className="phone-ssub">4 produk tersedia</div>
                      </div>
                    </div>
                    <div className="phone-share"><Icon.Link size={18} /></div>
                  </div>
                  <div className="phone-products">
                    {[
                      { img: '/assets/siomay.png', n: 'Siomay Frozen', p: '45.000' },
                      { img: '/assets/bakso.png', n: 'Bakso Sapi', p: '55.000' },
                      { img: '/assets/udang.jpg', n: 'Udang Crispy', p: '65.000' },
                      { img: '/assets/nugget.png', n: 'Nugget Ayam', p: '42.000' },
                    ].map((p, i) => (
                      <div key={i} className="phone-prod">
                        <div className="phone-prod-emoji"><img src={p.img} alt={p.n} loading="lazy" className="w-full aspect-square rounded-lg object-contain" /></div>
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
                </div>

                {/* WA Float */}
                <div className="wa-float">
                  <div className="wa-header">
                    <div className="wa-icon"><Icon.Check size={16} className="text-green-500" /></div>
                    <div className="wa-name">Pesan otomatis terkirim!</div>
                  </div>
                  <div className="wa-msg">
                    Halo Dapur Dinda!{' '}
                    Saya mau pesan:{'\n'}
                    • Siomay × 2 — Rp 90.000{'\n'}
                    Total: Rp 90.000
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
            <h2 className="font-display font-bold tracking-[-1.5px] text-gray-900 mt-4 mb-3.5 text-[28px] md:text-4xl lg:text-5xl">
              Dari buka Niraga sampai<br />
              dapat order — 4 langkah
            </h2>
            <p className="text-base text-gray-600 leading-relaxed max-w-[480px] mx-auto">
              Tidak perlu ngerti teknologi. Tidak perlu bayar. Langsung jalan.
            </p>
          </div>

          <div className="flow-steps">
            {[
              { e: <Icon.Store size={24} />, n: '01', t: 'Buat Toko', d: 'Masukkan nama toko dan nomor WA kamu. Selesai dalam 30 detik.' },
              { e: <Icon.Package size={24} />, n: '02', t: 'Tambah Produk', d: 'Input foto, nama, dan harga produk. Bisa sebanyak yang kamu mau.' },
              { e: <Icon.Link size={24} />, n: '03', t: 'Share Link', d: 'Dapat link toko unik. Kirim ke pelanggan via WA, IG Story, atau bio.' },
              { e: <Icon.Check size={24} className="text-green-500" />, n: '04', t: 'Terima Order', d: 'Pelanggan pilih produk → klik Pesan → WA kamu langsung berbunyi.' },
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
            <h2 className="font-display font-bold tracking-tight text-gray-900 text-[28px] md:text-4xl lg:text-5xl mt-4 mb-3.5 leading-tight">
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
              <div className="wc-ic">
                <WhatsAppIcon size={24} />
              </div>
              <div className="wc-t">Pesan WA otomatis, rapi, langsung masuk</div>
              <div className="wc-d">Pelanggan tinggal pilih produk dan klik "Pesan" — WA kamu langsung dapat pesan yang sudah terformat dengan nama produk, jumlah, dan total harga. Kamu tinggal konfirmasi.</div>
              <div className="wc-wa-preview">
                <div className="wa-bubble">
                  <div className="wa-bubble-text">
                    Halo Dapur Dinda!<br />
                    Saya mau pesan:<br />
                    • Siomay Frozen Ayam × 2 — Rp 90.000<br />
                    • Bakso Sapi Premium × 1 — Rp 55.000<br /><br />
                    <b>Total: Rp 145.000</b><br />
                    Mohon konfirmasinya ya kak
                  </div>
                </div>
              </div>
            </div>

            {[
              { ic: <Icon.Zap size={24} />, t: 'Setup 2 menit', d: 'Tidak perlu daftar dulu. Langsung buat toko, tambah produk, dan share link — semua dalam hitungan menit.' },
              { ic: <Icon.Star size={24} />, t: 'Gratis selamanya', d: 'Fitur utama gratis tanpa batas. Tidak ada trial, tidak ada kartu kredit, tidak ada biaya tersembunyi.' },
              { ic: <Icon.Link size={24} />, t: 'Link toko sendiri', d: 'Dapat link niraga.online/namatoko-mu yang bisa ditempel di bio IG, WA, atau dikirim langsung ke pelanggan.' },
              { ic: <Icon.Sparkles size={24} />, t: 'Tampil keren di HP', d: 'Toko kamu otomatis tampil bagus di layar HP pelanggan — seperti app sungguhan, tanpa mereka harus install apapun.' },
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
              <h2 className="font-display font-bold text-white leading-tight tracking-tight mb-4 text-[28px] md:text-4xl lg:text-5xl">
                Kamu capek jualan<br />
                cara <em className="italic text-green-400">lama</em>?
              </h2>
              <p className="text-white/50 text-base leading-relaxed">
                Niraga bukan aplikasi ribet. Ini solusi simpel untuk masalah nyata yang kamu rasain setiap hari.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              {[
                { b: { ic: <Icon.X size={20} color="white" />, t: 'Kirim foto produk satu-satu' }, a: { ic: <Icon.ShoppingBag size={20} color="#22c55e" />, t: 'Katalog online yang bisa dishare' }, bd: 'Capek screenshot dan kirim foto berulang ke setiap pelanggan.', ad: 'Pelanggan buka link, lihat semua produk, langsung pilih.' },
                { b: { ic: <Icon.FileText size={20} />, t: 'Catat order manual di notes' }, a: { ic: <Icon.Check size={20} className="text-green-500" />, t: 'Pesan WA otomatis dan rapi' }, bd: 'Sering salah catat, lupa, atau bingung siapa yang sudah bayar.', ad: 'Setiap order masuk sudah terformat lengkap di WA kamu.' },
                { b: { ic: <Icon.X size={20} color="white" />, t: 'Jawab pertanyaan yang sama terus' }, a: { ic: <Icon.Zap size={20} className="text-yellow-500" />, t: 'Info produk sudah ada di toko' }, bd: '"Masih ada stok?" "Harganya berapa?" — tiap hari, berkali-kali.', ad: 'Pelanggan lihat sendiri stok, harga, dan detail produk.' },
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

      {/* SECTION 5: SOCIAL PROOF */}
      <section className="bg-green-50 border-y border-green-100 py-20 md:py-28 lg:py-32">
        <div className="text-center mb-12">
          <div className="tag-pill mb-4 w-fit mx-auto">
            <div className="live-dot" />
            Kata Mereka
          </div>
          <h2 className="font-display font-bold text-gray-900 text-[clamp(24px,3vw,40px)] tracking-tight leading-tight">
            Seller yang udah pakai<br />
            Niraga bilang begini
          </h2>
        </div>
        <div className="container-app">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                avatar: '👩',
                name: 'Siti Rahayu',
                role: 'Seller Frozen Food, Depok',
                quote: 'Dulu tiap hari capek kirim foto produk satu-satu ke pelanggan. Sekarang tinggal share link, mereka pilih sendiri. Order masuk rapi di WA, tinggal konfirmasi aja.',
              },
              {
                avatar: '🧕',
                name: 'Fatimah Azahra',
                role: 'Reseller Baju, Bandung',
                quote: 'Setup-nya beneran cepat banget. 5 menit toko udah jadi. Yang paling suka itu format pesannya — pelanggan jadi lebih serius dan nggak asal chat.',
              },
              {
                avatar: '👨',
                name: 'Reza Pratama',
                role: 'Toko Snack Online, Surabaya',
                quote: 'Sebelumnya sering banget lupa catat order. Sekarang semua masuk otomatis via WA dengan format lengkap. Nggak ada yang kelewat lagi deh.',
              },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-green-100 rounded-[28px] p-6 hover:shadow-[0_8px_24px_rgba(22,163,74,.12)] hover:border-green-200 transition-all duration-300">
                <div className="mb-5">
                  <div className="text-3xl text-green-200 font-display leading-none mb-2">❝</div>
                  <p className="text-sm text-body leading-relaxed italic">{t.quote}</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-green-100">
                  <div className="w-10 h-10 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-xl flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-dark">{t.name}</div>
                    <div className="text-xs text-muted">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA */}
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
              <Icon.Check size={14} className="inline-block align-middle text-green-500" /> Gratis selamanya &nbsp;·&nbsp;
              <Icon.Check size={14} className="inline-block align-middle text-green-500" /> Tanpa kartu kredit &nbsp;·&nbsp;
              <Icon.Check size={14} className="inline-block align-middle text-green-500" /> Tanpa install apapun
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="container-app flex justify-between items-center flex-wrap gap-4">
          <img src="/niraga-logo-full.svg" alt="Niraga logo" loading="lazy" className="h-9" />
          <div className="text-xs text-gray-400">
            © 2025 Niraga. Dibuat dengan love untuk UMKM Indonesia.
          </div>
        </div>
      </footer>
    </main>
  )
}
