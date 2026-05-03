import ProductCard from '@/components/ui/ProductCard'

export default function StorePage({
  params,
}: {
  params: { username: string }
}) {
  const store = {
    name: 'Dapur Dinda',
    description:
      'Frozen food homemade berkualitas, dibuat fresh setiap hari. Bebas pengawet, rasa rumahan.',
    logo: '🥟',
    tags: ['✓ Terpercaya', '🚚 COD & Ongkir', '⚡ Respon Cepat', '🕐 Buka Setiap Hari'],
  }

  const products = [
    {
      emoji: '🥟',
      name: 'Siomay Frozen Ayam',
      price: 45000,
      unit: 'isi 20 pcs',
      bgColor: '#fff7ed',
    },
    {
      emoji: '🍜',
      name: 'Bakso Sapi Premium',
      price: 55000,
      unit: 'isi 25 pcs',
      bgColor: '#f0fdf4',
    },
    {
      emoji: '🦐',
      name: 'Udang Crispy Frozen',
      price: 65000,
      unit: 'isi 500gr',
      bgColor: '#fefce8',
    },
    {
      emoji: '🥩',
      name: 'Nugget Ayam Homemade',
      price: 42000,
      unit: 'isi 300gr',
      bgColor: '#fdf2f8',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-store mx-auto pb-14">
        {/* STORE HEADER */}
        <div className="bg-white border-b border-gray-200 mb-5">
          {/* Cover */}
          <div className="h-20 bg-gradient-to-r from-green-600 to-green-500 relative" />

          <div className="px-6 pt-3 pb-6 text-center">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="w-[76px] h-[76px] bg-gradient-to-br from-green-600 to-green-400 rounded-[20px] flex items-center justify-center text-4xl border-[3px] border-white shadow-card-lg -mt-10 relative z-10">
                {store.logo}
              </div>
            </div>

            {/* Store Name */}
            <div className="font-display font-bold text-2xl text-gray-900 tracking-tight mt-3 mb-1.5">
              {store.name}
            </div>

            {/* Description */}
            <div className="text-xs text-gray-500 leading-relaxed max-w-[280px] mx-auto mb-4">
              {store.description}
            </div>

            {/* Tags */}
            <div className="flex gap-1.5 justify-center flex-wrap">
              {store.tags.map((tag) => (
                <div
                  key={tag}
                  className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PRODUCTS SECTION */}
        <div className="px-4 mb-6">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">
            Produk Tersedia
          </div>

          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <ProductCard
                key={product.name}
                emoji={product.emoji}
                name={product.name}
                price={product.price}
                unit={product.unit}
                bgColor={product.bgColor}
              />
            ))}
          </div>
        </div>

        {/* BOT TELEGRAM BANNER */}
        <div className="mx-4 bg-dark rounded-[18px] p-5 flex items-center gap-3.5">
          <div className="w-11 h-11 bg-green-600/15 rounded-[13px] flex items-center justify-center text-xl flex-shrink-0">
            🤖
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-white mb-0.5">
              Tanya lewat Bot Telegram
            </div>
            <div className="text-[11px] text-white/45 leading-snug">
              Cek stok, tanya harga, atau order langsung. Aktif 24/7!
            </div>
          </div>
          <button className="flex-shrink-0 bg-green-500 hover:bg-green-600 text-white text-[11px] font-bold px-4 py-2.5 rounded-[10px] transition-colors">
            Chat →
          </button>
        </div>

        {/* FOOTER */}
        <div className="text-center px-4 pt-6 pb-2 text-[10px] text-gray-400">
          Dibuat dengan <span className="text-green-600 font-bold">Niraga</span> · Buat toko kamu
          gratis
        </div>
      </div>
    </div>
  )
}

export function Loading() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-store mx-auto pb-14">
        {/* Store Header Skeleton */}
        <div className="bg-white border-b border-gray-200 mb-5">
          <div className="h-20 bg-gradient-to-r from-green-600 to-green-500 relative" />
          <div className="px-6 pt-3 pb-6 text-center">
            <div className="flex justify-center">
              <div className="w-[76px] h-[76px] bg-gray-200 rounded-[20px] -mt-10 animate-pulse" />
            </div>
            <div className="mt-3 mb-1.5">
              <div className="h-6 bg-gray-200 rounded w-32 mx-auto animate-pulse" />
            </div>
            <div className="max-w-[280px] mx-auto mb-4 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto animate-pulse" />
            </div>
            <div className="flex gap-1.5 justify-center flex-wrap">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-5 bg-gray-200 rounded-full w-20 animate-pulse" />
              ))}
            </div>
          </div>
        </div>

        {/* Products Skeleton */}
        <div className="px-4 mb-6">
          <div className="h-3 bg-gray-200 rounded w-32 mb-3 animate-pulse" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <div className="w-full aspect-square bg-gray-200 animate-pulse" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                </div>
                <div className="h-8 bg-gray-200 mx-3 mb-3 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Bot Banner Skeleton */}
        <div className="mx-4 bg-dark rounded-[18px] p-5 flex items-center gap-3.5">
          <div className="w-11 h-11 bg-green-500/15 rounded-[13px] animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-white/20 rounded w-40 animate-pulse" />
            <div className="h-3 bg-white/20 rounded w-full animate-pulse" />
          </div>
          <div className="h-8 w-16 bg-green-600/30 rounded-[10px] animate-pulse" />
        </div>

        {/* Footer Skeleton */}
        <div className="text-center px-4 pt-6 pb-2">
          <div className="h-3 bg-gray-200 rounded w-48 mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  )
}
