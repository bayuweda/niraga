'use client'

import { useState } from 'react'
import ProductCard from '@/components/ui/ProductCard'
import { formatRupiah } from '@/lib/utils'

export default function StorePage({
  params,
}: {
  params: { username: string }
}) {
  const [cart, setCart] = useState<{ name: string; price: number; qty: number }[]>([])
  const [showCart, setShowCart] = useState(false)

  const store = {
    name: 'Dapur Dinda',
    description:
      'Frozen food homemade berkualitas, dibuat fresh setiap hari. Bebas pengawet, rasa rumahan.',
    logo: '🥟',
    whatsapp: '6281234567890', // Ganti dengan nomor asli
    tags: ['✓ Terpercaya', '🚚 COD & Ongkir', '⚡ Respon Cepat', '🕐 Buka Setiap Hari'],
  }

  const products = [
    {
      name: 'Siomay Frozen Ayam',
      price: 45000,
      unit: 'isi 20 pcs',
      imageUrl: 'https://images.unsplash.com/photo-1529692237494-33578a818380?w=400&h=400&fit=crop',
    },
    {
      name: 'Bakso Sapi Premium',
      price: 55000,
      unit: 'isi 25 pcs',
      imageUrl: 'https://images.unsplash.com/photo-1547592180-85f1736701ae?w=400&h=400&fit=crop',
    },
    {
      name: 'Udang Crispy Frozen',
      price: 65000,
      unit: 'isi 500gr',
      imageUrl: 'https://images.unsplash.com/photo-1565680016090-71c1f1f4e58e?w=400&h=400&fit=crop',
    },
    {
      name: 'Nugget Ayam Homemade',
      price: 42000,
      unit: 'isi 300gr',
      imageUrl: 'https://images.unsplash.com/photo-1594212699903-8e9288b84918?w=400&h=400&fit=crop',
    },
  ]

  const addToCart = (product: typeof products[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === product.name)
      if (existing) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }
      return [...prev, { name: product.name, price: product.price, qty: 1 }]
    })
  }

  const removeFromCart = (productName: string) => {
    setCart((prev) => prev.filter((item) => item.name !== productName))
  }

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  }

  const generateWhatsAppMessage = () => {
    if (cart.length === 0) return ''

    let message = 'Halo kak, saya mau pesan:\n\n'
    cart.forEach((item) => {
      message += `• ${item.name} x${item.qty}\n`
    })
    message += `\nTotal: Rp ${getTotal().toLocaleString('id-ID')}\n`
    message += '\nBoleh share alamat kirimnya?'

    return encodeURIComponent(message)
  }

  const openWhatsApp = () => {
    const message = generateWhatsAppMessage()
    window.open(`https://wa.me/${store.whatsapp}?text=${message}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <button
          onClick={() => setShowCart(!showCart)}
          className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center text-xl transition-colors"
        >
          🛒
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {cart.reduce((sum, item) => sum + item.qty, 0)}
          </span>
        </button>
      )}

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

        {/* STORE STATS */}
        <div className="flex items-center justify-center gap-4 px-4 mb-6 text-xs text-gray-500">
          <span className="flex items-center gap-1">⚡ Respon cepat</span>
          <span className="flex items-center gap-1">📦 1.200+ order</span>
          <span className="flex items-center gap-1">⭐ 4.9/5</span>
        </div>

        {/* INFO TOKO */}
        <div className="mx-4 mb-6 bg-white border border-gray-200 rounded-2xl p-5">
          <div className="text-sm font-bold text-gray-900 mb-3">Info Toko</div>
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <span>🕐</span> <span>Buka Setiap Hari, 08:00 - 20:00</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📍</span> <span>Bekasi & sekitarnya</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💳</span> <span>COD, Transfer, DANA, OVO</span>
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
              <div key={product.name} className="relative">
                <ProductCard
                  imageUrl={product.imageUrl}
                  name={product.name}
                  price={product.price}
                  unit={product.unit}
                />
                {/* Quick Add Button */}
                <button
                  onClick={() => addToCart(product)}
                  className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg opacity-0 hover:opacity-100 transition-opacity"
                >
                  + Tambah
                </button>
                {/* In Cart Indicator */}
                {cart.find((item) => item.name === product.name) && (
                  <div className="absolute top-2 right-2 bg-green-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.find((item) => item.name === product.name)?.qty}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CART MODAL */}
        {showCart && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4">
            <div className="bg-white rounded-t-3xl w-full max-w-store p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <div className="font-bold text-lg">Keranjang Kamu</div>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  Keranjang kosong
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {cart.map((item) => (
                      <div key={item.name} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                        <div>
                          <div className="font-semibold text-sm">{item.name}</div>
                          <div className="text-xs text-gray-500">
                            {formatRupiah(item.price)} x {item.qty}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-sm">
                            {formatRupiah(item.price * item.qty)}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.name)}
                            className="text-xs text-red-500"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-green-700">{formatRupiah(getTotal())}</span>
                    </div>
                  </div>

                  <button
                    onClick={openWhatsApp}
                    className="btn-primary w-full justify-center"
                  >
                    Pesan lewat WhatsApp 💬
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* BOT TELEGRAM BANNER */}
        <div className="mx-4 bg-dark rounded-[18px] p-5 flex items-center gap-3.5">
          <div className="w-11 h-11 bg-green-500/15 rounded-[13px] flex items-center justify-center text-xl flex-shrink-0">
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
          <button className="flex-shrink-0 bg-green-600 hover:bg-green-700 text-white text-[11px] font-bold px-4 py-2.5 rounded-[10px] transition-colors">
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
      </div>
    </div>
  )
}
