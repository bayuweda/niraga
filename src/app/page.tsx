import Navbar from '@/components/ui/Navbar'
import Badge from '@/components/ui/Badge'

export default function Home() {
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
            Chaos WA-mu jadi<br />
            <em className="italic text-green-600">toko online rapi</em>
          </h1>

          {/* Paragraph */}
          <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto mb-10">
            Setup toko dalam 5 menit. Bot AI jawab pelanggan otomatis, catat setiap order,
            dan kirim rekap harian — semuanya gratis.
          </p>

          {/* CTA row */}
          <div className="flex gap-3 justify-center flex-wrap mb-16">
            <button className="btn-primary">
              Buat Toko Gratis →
            </button>
            <button className="btn-outline">
              Lihat Demo
            </button>
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {[
              ['5 Menit', 'Setup toko pertama'],
              ['Rp 0', 'Untuk memulai'],
              ['24/7', 'Bot AI aktif'],
              ['0%', 'Komisi transaksi'],
            ].map(([num, label], i, arr) => (
              <div key={num} className="flex items-center gap-8">
                <div className="flex flex-col items-center">
                  <div className="font-display font-bold text-2xl text-gray-900 tracking-tight">
                    {num}
                  </div>
                  <div className="text-xs text-gray-400 font-medium mt-0.5">
                    {label}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-px h-8 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PAIN SECTION */}
      <section className="bg-dark section-padding">
        <div className="container-app grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Kiri */}
          <div>
            <div className="text-xs font-bold text-green-400 uppercase tracking-widest mb-3">
              Masalah yang kamu rasain
            </div>
            <h2 className="font-display font-bold text-white leading-tight tracking-tight mb-5 text-3xl md:text-4xl lg:text-5xl">
              Jualan online harusnya <em className="italic text-green-400">lebih gampang</em> dari ini
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              Kamu udah kerja keras setiap hari — tapi masih tenggelam dalam chaos chat,
              order yang kelewat, dan pertanyaan yang sama berulang.
            </p>
          </div>

          {/* Kanan */}
          <div className="flex flex-col gap-3">
            {[
              {
                icon: '😩',
                title: 'Kewalahan balas chat',
                desc: 'Setiap hari jawab pertanyaan yang sama berulang sampai capek.',
              },
              {
                icon: '📝',
                title: 'Order sering kelewat',
                desc: 'Kelola pesanan lewat WA rawan lupa dan salah catat.',
              },
              {
                icon: '😕',
                title: 'Katalog berantakan',
                desc: 'Kirim foto satu-satu, harga tidak pernah update.',
              },
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

      {/* SECTION 4: FEATURES */}
      <section className="bg-white section-padding">
        {/* Header */}
        <div className="container-app text-center mb-14">
          <div className="tag-badge mx-auto w-fit mb-4">
            <div className="animated-dot" />
            Solusi Niraga
          </div>
          <h2 className="font-display font-bold tracking-tight mt-4 mb-3 text-3xl md:text-5xl text-gray-900">
            Semua yang kamu butuhkan,<br />
            nggak ada yang nggak perlu
          </h2>
          <p className="text-base text-gray-500 leading-relaxed max-w-lg mx-auto">
            Dirancang khusus untuk penjual online Indonesia — bukan untuk perusahaan besar, tapi untuk kamu.
          </p>
        </div>

        {/* Grid */}
        <div className="container-app grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Featured card */}
          <div className="bg-green-600 border-transparent rounded-3xl p-7 md:col-span-2 lg:col-span-2">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl mb-5">
              🤖
            </div>
            <div className="text-white font-bold text-lg mb-2">Bot AI Admin 24/7</div>
            <div className="text-white/65 text-sm leading-relaxed">
              Bot yang benar-benar mengerti bisnis kamu. Jawab pertanyaan pelanggan, catat order,
              cek stok, kirim konfirmasi otomatis — semua tanpa ribet.
            </div>
          </div>

          {/* Feature cards */}
          {[
            {
              icon: '🛍️',
              title: 'Toko Online Instan',
              desc: 'Link toko siap dishare dalam 5 menit. Katalog produk rapi, foto dan harga terupdate.',
            },
            {
              icon: '📋',
              title: 'Order Tercatat Rapi',
              desc: 'Semua pesanan masuk otomatis ke dashboard. Nggak ada yang kelewat.',
            },
            {
              icon: '📊',
              title: 'Rekap Harian Otomatis',
              desc: 'Setiap malam dapat ringkasan — order masuk, pendapatan, produk terlaris.',
            },
            {
              icon: '👥',
              title: 'Data Pelanggan Kamu',
              desc: 'Tidak seperti Shopee, di sini data pelangganmu milik kamu sendiri.',
            },
            {
              icon: '🆓',
              title: 'Gratis Selamanya',
              desc: 'Fitur inti gratis tanpa batas. Upgrade kalau butuh lebih.',
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

      {/* SECTION 5: HOW IT WORKS */}
      <section className="bg-green-50 border-y border-green-100 section-padding">
        {/* Header */}
        <div className="container-app text-center mb-14">
          <div className="tag-badge mx-auto w-fit mb-4">
            <div className="animated-dot" />
            Cara Kerja
          </div>
          <h2 className="font-display font-bold tracking-tight mt-4 text-3xl md:text-5xl text-gray-900">
            Dari daftar sampai dapat order<br />
            dalam 5 menit
          </h2>
        </div>

        {/* Steps */}
        <div className="container-app grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: '1',
              title: 'Daftar Gratis',
              desc: 'Buat akun dengan email atau Google. Tidak perlu kartu kredit.',
            },
            {
              num: '2',
              title: 'Input Produk',
              desc: 'Tambahkan foto, nama, dan harga. Bisa sebanyak apapun.',
            },
            {
              num: '3',
              title: 'Share Link Toko',
              desc: 'Dapat link unik yang langsung bisa dishare ke pelanggan.',
            },
            {
              num: '4',
              title: 'Terima Order Otomatis',
              desc: 'Bot AI aktif 24/7, terima order dan rekap setiap hari.',
            },
          ].map((step, i, arr) => (
            <div
              key={i}
              className="text-center bg-white rounded-3xl border border-green-100 p-7 relative"
            >
              {/* Arrow connector */}
              {i < arr.length - 1 && (
                <div className="hidden lg:block absolute right-[-16px] top-1/2 -translate-y-1/2 text-green-300 text-xl">
                  →
                </div>
              )}

              {/* Number */}
              <div className="w-11 h-11 mx-auto mb-4 rounded-full bg-green-600 text-white flex items-center justify-center font-display font-bold text-lg shadow-green-sm">
                {step.num}
              </div>

              {/* Title */}
              <div className="text-sm font-bold text-gray-900 mb-1.5">{step.title}</div>

              {/* Description */}
              <div className="text-xs text-gray-500 leading-relaxed">{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: CTA */}
      <section className="bg-white section-padding">
        <div className="container-app">
          <div className="bg-green-700 rounded-4xl p-12 md:p-20 text-center relative overflow-hidden">
            {/* Decorative glow */}
            <div className="cta-glow" />

            <h2 className="font-display font-bold text-white text-3xl md:text-5xl tracking-tight mb-3 relative z-10">
              Siap ganti chaos WA jadi<br />
              toko yang rapi?
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-9 relative z-10">
              Gratis untuk memulai. Tidak perlu kartu kredit. Setup dalam 5 menit.
            </p>
            <button className="btn-white relative z-10">
              Buat Toko Sekarang →
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="container-app flex justify-between items-center flex-wrap gap-4">
          <div className="font-display italic text-green-700 font-bold text-lg">
            Niraga
          </div>
          <div className="text-xs text-gray-400">
            © 2025 Niraga. Dibuat dengan ❤️ untuk UMKM Indonesia.
          </div>
        </div>
      </footer>
    </main>
  )
}
