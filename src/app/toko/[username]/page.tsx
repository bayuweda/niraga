'use client'

import { useEffect, useState, use } from 'react'
import { formatRupiah } from '@/lib/utils'
import { getStoreBySlug, getProductsByStoreId, createOrder } from '@/lib/db'
import { Icon, WhatsAppIcon } from '@/components/ui/Icons'
import type { Store, Product } from '@/lib/types'

export default function StorePage({ params }: { params: Promise<{ username: string }> }) {
  const { username: slug } = use(params)
  const [store, setStore] = useState<Store | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState<{ [key: string]: number }>({})
  const [showForm, setShowForm] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerWA, setCustomerWA] = useState('')
  const [customerNotes, setCustomerNotes] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const { data: storeData } = await getStoreBySlug(slug)
        if (!storeData) {
          setLoading(false)
          return
        }
        setStore(storeData)

        const { data: productsData } = await getProductsByStoreId(storeData.id)
        if (productsData) setProducts(productsData)
      } catch (e) {
        console.error('Failed to load store:', e)
      }
      setLoading(false)
    }
    load()
  }, [slug])

  const toggleProduct = (id: string) => {
    setCart(c => {
      if (c[id]) {
        const n = { ...c }
        delete n[id]
        return n
      }
      return { ...c, [id]: 1 }
    })
  }

  const setQty = (id: string, qty: number) => {
    if (qty < 1) {
      const n = { ...cart }
      delete n[id]
      setCart(n)
      return
    }
    setCart(c => ({ ...c, [id]: qty }))
  }

  const cartItems = products.filter(p => cart[p.id])
  const total = cartItems.reduce((s, p) => s + p.price * cart[p.id], 0)
  const totalQty = Object.values(cart).reduce((s, v) => s + v, 0)

  const openCheckout = () => {
    setCustomerName('')
    setCustomerWA('')
    setCustomerNotes('')
    setShowForm(true)
  }

  const orderWA = async () => {
    if (!store || !customerName.trim()) return
    const wa = store.whatsapp?.replace(/[^0-9]/g, '') || ''
    if (!wa) { alert('Nomor WhatsApp belum diatur'); return }
    setSending(true)

    await createOrder({
      store_id: store.id,
      customer_name: customerName.trim(),
      customer_contact: customerWA.trim() || undefined,
      notes: customerNotes.trim() || undefined,
      items: cartItems.map(p => ({ product_id: p.id, name: p.name, qty: cart[p.id], price: p.price })),
      total,
    })

    const lines = cartItems.map(p => `• ${p.name} × ${cart[p.id]} — ${formatRupiah(p.price * cart[p.id])}`).join('\n')
    const waNote = customerWA.trim() ? `\nWA: ${customerWA.trim()}` : ''
    const notes = customerNotes.trim() ? `\n\nCatatan: ${customerNotes.trim()}` : ''
    const msg = encodeURIComponent(`Halo ${store.name}! 👋\n\nSaya ${customerName.trim()} mau pesan:\n${lines}\n\nTotal: ${formatRupiah(total)}${waNote}${notes}\n\nMohon konfirmasinya ya kak 🙏`)

    setSending(false)
    setShowForm(false)

    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-400">Memuat...</div>
      </div>
    )
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-sm px-4">
          <div className="mb-3"><Icon.Search size={48} className="text-gray-300 mx-auto" /></div>
          <div className="text-gray-900 font-bold text-lg mb-1">Toko tidak ditemukan</div>
          <div className="text-gray-400 text-sm mb-6">Pastikan link yang kamu buka sudah benar, atau toko mungkin belum aktif.</div>
          <a href="/buat-toko" className="btn-primary text-sm">Buat Toko Sendiri →</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[440px] mx-auto pb-32">
        {/* STORE HEADER */}
        <div className="bg-white border-b border-gray-200 mb-4">
          <div className="h-[88px] bg-gradient-to-r from-green-600 to-green-500 relative">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.15) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />
          </div>

          <div className="flex justify-center">
            <div className="w-[72px] h-[72px] bg-gradient-to-br from-green-600 to-green-400 rounded-[20px] flex items-center justify-center border-[3px] border-white shadow-card-lg -mt-9 relative z-10">
              <Icon.Store size={36} className="text-white" />
            </div>
          </div>

          <div className="text-center px-5 pt-3 pb-5">
            <div className="font-display font-bold text-[22px] text-gray-900 mb-1 tracking-tight">
              {store.name}
            </div>
            {store.description && (
              <div className="text-xs text-gray-500 leading-relaxed max-w-[280px] mx-auto mb-3.5">
                {store.description}
              </div>
            )}
            <div className="flex gap-1.5 justify-center flex-wrap">
              <div className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 rounded-full px-2.5 py-1 flex items-center gap-1">
                <Icon.Check size={10} /> Terpercaya
              </div>
              <div className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 rounded-full px-2.5 py-1 flex items-center gap-1">
                <Icon.Truck size={10} /> COD & Ongkir
              </div>
              <div className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 rounded-full px-2.5 py-1 flex items-center gap-1">
                <Icon.Zap size={10} /> Respon Cepat
              </div>
            </div>
          </div>
        </div>

        {/* SHIPPING INFO */}
        {store.shipping_info && (
          <div className="px-3.5 mb-4">
            <div className="flex items-start gap-2.5 bg-warm border border-border rounded-xl px-3.5 py-3">
              <div className="flex-shrink-0 mt-0.5"><Icon.Truck size={14} className="text-muted" /></div>
              <div className="text-[11px] text-body leading-relaxed">{store.shipping_info}</div>
            </div>
          </div>
        )}

        {/* PRODUCTS SECTION */}
        <div className="px-3.5 mb-5">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 px-0.5">
            {products.length > 0 ? 'Pilih Produk' : 'Belum ada produk'}
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {products.map(p => (
              <div
                key={p.id}
                onClick={() => toggleProduct(p.id)}
                className={`bg-white border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 relative ${cart[p.id] ? 'border-green-500 shadow-[0_0_0_3px_rgba(22,163,74,.12)]' : 'border-gray-200 hover:border-green-200 hover:shadow-[0_6px_20px_rgba(22,163,74,.1)] hover:-translate-y-0.5'}`}
              >
                <div className="w-full aspect-square relative overflow-hidden" style={{ background: p.bg_color }}>
                  <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.3) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon.Package size={56} className="text-white/80" />
                  </div>
                </div>

                <div className={`absolute top-2 right-2 w-[22px] h-[22px] rounded-full bg-green-600 text-white flex items-center justify-center transition-all duration-200 ${cart[p.id] ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.6]'}`}>
                  <Icon.Check size={14} />
                </div>

                <div className="p-2.5">
                  <div className="text-xs font-bold text-gray-900 mb-0.5 leading-tight">{p.name}</div>
                  <div className="text-sm font-bold text-green-600">
                    {formatRupiah(p.price)} <span className="text-[10px] text-gray-500 font-normal">/ {p.unit}</span>
                  </div>
                </div>

                {cart[p.id] && (
                  <div className="flex items-center justify-center gap-2 p-2 bg-green-50 border-t border-green-200" onClick={e => e.stopPropagation()}>
                    <button onClick={() => setQty(p.id, cart[p.id] - 1)} className="w-6 h-6 rounded-full bg-white border border-green-200 text-green-600 text-sm font-bold flex items-center justify-center hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors font-sans">
                      −
                    </button>
                    <div className="text-sm font-bold text-gray-900 min-w-4 text-center">{cart[p.id]}</div>
                    <button onClick={() => setQty(p.id, cart[p.id] + 1)} className="w-6 h-6 rounded-full bg-white border border-green-200 text-green-600 text-sm font-bold flex items-center justify-center hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors font-sans">
                      +
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: totalQty > 0 ? 120 : 60 }} />
      </div>

      {/* CART BAR */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] bg-white border-t-2 border-gray-200 p-3.5 z-50">
        {totalQty === 0 ? (
          <div className="text-center py-3 text-sm text-gray-500"><Icon.Hand size={14} className="inline-block align-middle mr-1" /> Tap produk untuk memilih</div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-2.5">
              <div>
                <div className="text-sm font-bold text-gray-900">{totalQty} produk dipilih</div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  {cartItems.map(p => `${p.name.slice(0, 12)} ×${cart[p.id]}`).join('  ')}
                </div>
              </div>
              <div className="text-lg font-bold text-green-600">{formatRupiah(total)}</div>
            </div>
            <button onClick={openCheckout} disabled={sending} className="w-full py-3.5 bg-[#25d366] text-white rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(37,211,102,.3)] hover:bg-green-500 hover:-translate-y-px transition-all disabled:opacity-60 disabled:cursor-not-allowed">
              <WhatsAppIcon size={20} /> Pesan via WhatsApp
            </button>
          </>
        )}
      </div>

      {/* CHECKOUT FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-[60] bg-black/40 flex items-end sm:items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="bg-white w-full max-w-[440px] sm:rounded-3xl rounded-t-3xl p-5 pb-8" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Data Pemesan</h3>
            <p className="text-xs text-gray-500 mb-5">Isi nama kamu dulu sebelum pesan via WhatsApp</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nama *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                  placeholder="cth: Siti Nurhaliza"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">No. WhatsApp <span className="text-gray-400 font-normal">(opsional)</span></label>
                <input
                  type="text"
                  value={customerWA}
                  onChange={e => setCustomerWA(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                  placeholder="cth: 08123456789"
                />
                <div className="text-[11px] text-gray-400 mt-1">Supaya penjual bisa hubungi kamu balik</div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Catatan <span className="text-gray-400 font-normal">(opsional)</span></label>
                <textarea
                  value={customerNotes}
                  onChange={e => setCustomerNotes(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 resize-none min-h-20"
                  placeholder="Alamat, catatan pesanan, dll."
                />
              </div>
            </div>

            <div className="flex gap-2.5 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-3 bg-white text-gray-500 border border-gray-200 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all">
                Batal
              </button>
              <button onClick={orderWA} disabled={!customerName.trim() || sending} className="flex-1 py-3 bg-[#25d366] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(37,211,102,.3)] hover:bg-green-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {sending ? 'Memproses...' : <><WhatsAppIcon size={16} /> Pesan via WA</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
