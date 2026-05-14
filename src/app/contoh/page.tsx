'use client'

import { useState } from 'react'
import Navbar from '@/components/ui/Navbar'
import { formatRupiah } from '@/lib/utils'
import { Icon, WhatsAppIcon } from '@/components/ui/Icons'

const DEMO_PRODUCTS = [
  { id: 1, image: '/assets/siomay.png', name: 'Siomay Frozen Ayam', price: 45000, unit: 'isi 20 pcs' },
  { id: 2, image: '/assets/bakso.png', name: 'Bakso Sapi Premium', price: 55000, unit: 'isi 25 pcs' },
  { id: 3, image: '/assets/udang.jpg', name: 'Udang Crispy Frozen', price: 65000, unit: 'isi 500gr' },
  { id: 4, image: '/assets/nugget.png', name: 'Nugget Ayam Homemade', price: 42000, unit: 'isi 300gr' },
]

export default function ContohPage() {
  const [cart, setCart] = useState<{ [key: number]: number }>({})

  const toggleProduct = (id: number) => {
    setCart(c => {
      if (c[id]) { const n = { ...c }; delete n[id]; return n }
      return { ...c, [id]: 1 }
    })
  }

  const setQty = (id: number, qty: number) => {
    if (qty < 1) { const n = { ...cart }; delete n[id]; setCart(n); return }
    setCart(c => ({ ...c, [id]: qty }))
  }

  const cartItems = DEMO_PRODUCTS.filter(p => cart[p.id])
  const total = cartItems.reduce((s, p) => s + p.price * cart[p.id], 0)
  const totalQty = Object.values(cart).reduce((s, v) => s + v, 0)

  const orderWA = () => {
    const lines = cartItems.map(p => `• ${p.name} × ${cart[p.id]} — ${formatRupiah(p.price * cart[p.id])}`).join('\n')
    const msg = encodeURIComponent(`Halo Dapur Dinda!\n\nSaya mau pesan:\n${lines}\n\nTotal: ${formatRupiah(total)}\n\nMohon konfirmasinya ya kak`)
    window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <Navbar />
      <div className="max-w-[440px] mx-auto pb-32">
        {/* STORE HEADER */}
        <div className="bg-white border-b border-gray-200 mb-4">
          <div className="h-[88px] bg-gradient-to-r from-green-600 to-green-500 relative">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.15) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          </div>
          <div className="flex justify-center">
            <div className="w-[72px] h-[72px] bg-gradient-to-br from-green-600 to-green-400 rounded-[20px] flex items-center justify-center border-[3px] border-white shadow-card-lg -mt-9 relative z-10">
              <Icon.Store size={36} className="text-white" />
            </div>
          </div>
          <div className="text-center px-5 pt-3 pb-5">
            <div className="font-bold text-[22px] text-gray-900 mb-1 tracking-tight" style={{ fontFamily: 'Instrument Serif, serif' }}>Dapur Dinda</div>
            <div className="text-xs text-gray-500 leading-relaxed max-w-[280px] mx-auto mb-3.5">Frozen food homemade berkualitas, dibuat fresh setiap hari.</div>
            <div className="flex gap-1.5 justify-center flex-wrap">
              {['Terpercaya', 'COD & Ongkir', 'Respon Cepat'].map(t => (
                <div key={t} className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 rounded-full px-2.5 py-1">{t}</div>
              ))}
            </div>
          </div>
        </div>

        {/* SHIPPING INFO */}
        <div className="px-3.5 mb-4">
          <div className="flex items-start gap-2.5 bg-warm border border-border rounded-xl px-3.5 py-3">
            <div className="flex-shrink-0 mt-0.5"><Icon.Truck size={14} className="text-muted" /></div>
            <div className="text-[11px] text-body leading-relaxed">
              Min. order Rp 50.000 · COD area Depok & Bekasi · Order sebelum jam 3 sore
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="px-3.5 mb-3">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 px-0.5">Pilih Produk</div>
          <div className="grid grid-cols-2 gap-2.5">
            {DEMO_PRODUCTS.map(p => (
              <div key={p.id} onClick={() => toggleProduct(p.id)}
                className={`bg-white border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 relative ${cart[p.id] ? 'border-green-500 shadow-[0_0_0_3px_rgba(22,163,74,.12)]' : 'border-gray-200 hover:border-green-200 hover:shadow-[0_6px_20px_rgba(22,163,74,.1)] hover:-translate-y-0.5'}`}>
                <div className="w-full aspect-square bg-gray-50 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className={`absolute top-2 right-2 w-[22px] h-[22px] rounded-full bg-green-600 text-white flex items-center justify-center transition-all duration-200 ${cart[p.id] ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.6]'}`}><Icon.Check size={14} /></div>
                <div className="p-2.5">
                  <div className="text-xs font-bold text-gray-900 mb-0.5 leading-tight">{p.name}</div>
                  <div className="text-sm font-bold text-green-600">{formatRupiah(p.price)} <span className="text-[10px] text-gray-500 font-normal">/ {p.unit}</span></div>
                </div>
                {cart[p.id] && (
                  <div className="flex items-center justify-center gap-2 p-2 bg-green-50 border-t border-green-200" onClick={e => e.stopPropagation()}>
                    <button onClick={() => setQty(p.id, cart[p.id] - 1)} className="w-6 h-6 rounded-full bg-white border border-green-200 text-green-600 text-sm font-bold flex items-center justify-center hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors font-sans">−</button>
                    <div className="text-sm font-bold text-gray-900 min-w-4 text-center">{cart[p.id]}</div>
                    <button onClick={() => setQty(p.id, cart[p.id] + 1)} className="w-6 h-6 rounded-full bg-white border border-green-200 text-green-600 text-sm font-bold flex items-center justify-center hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors font-sans">+</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* CHAT DULU */}
        <div className="flex items-center gap-3 bg-white border border-border rounded-2xl p-4 mx-3.5 mb-5">
          <div className="flex-shrink-0"><Icon.Chat size={24} className="text-muted" /></div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-dark mb-0.5">Mau tanya dulu?</div>
            <div className="text-xs text-muted">Chat langsung sebelum order, kami siap bantu!</div>
          </div>
          <button
            onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
            className="flex-shrink-0 py-2.5 px-4 bg-green-600 text-white rounded-xl font-bold text-xs shadow-green hover:bg-green-700 transition-all"
          >
            Chat WA
          </button>
        </div>

        <div style={{ height: totalQty > 0 ? 120 : 60 }} />
      </div>

      {/* CART BAR */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] bg-white border-t-2 border-gray-200 p-3.5 z-50">
        {totalQty === 0 ? (
          <div className="text-center py-3 text-xs text-muted">👆 Tap produk untuk memilih</div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-2.5">
              <div>
                <div className="text-sm font-bold text-gray-900">{totalQty} produk dipilih</div>
                <div className="text-[11px] text-gray-500 mt-0.5">{cartItems.map(p => `${p.name.slice(0, 10)} ×${cart[p.id]}`).join('  ')}</div>
              </div>
              <div className="text-lg font-bold text-green-600">{formatRupiah(total)}</div>
            </div>
            <button onClick={orderWA} className="w-full py-3.5 bg-[#25d366] text-white rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(37,211,102,.3)] hover:bg-green-500 hover:-translate-y-px transition-all">
              <WhatsAppIcon size={20} /> Pesan via WhatsApp
            </button>
          </>
        )}
      </div>
    </div>
  )
}
