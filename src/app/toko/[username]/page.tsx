'use client'

import { useEffect, useState, use, useRef } from 'react'
import { formatRupiah } from '@/lib/utils'
import { getStoreBySlug, getProductsByStoreId, createOrder } from '@/lib/db'
import { getSupabaseClient } from '@/lib/supabase'
import { Icon, WhatsAppIcon } from '@/components/ui/Icons'
import { getThemeByColor } from '@/lib/themes'
import type { Store, Product } from '@/lib/types'

export default function StorePage({ params }: { params: Promise<{ username: string }> }) {
  const { username: slug } = use(params)
  const [store, setStore] = useState<Store | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState<{ [key: string]: number }>({})
  const [selectedProd, setSelectedProd] = useState<Product | null>(null)
  const [detailQty, setDetailQty] = useState(1)
  const [detailImgIdx, setDetailImgIdx] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerNotes, setCustomerNotes] = useState('')
  const [sending, setSending] = useState(false)
  const [todayViews, setTodayViews] = useState<number>(0)
  const [activeCategory, setActiveCategory] = useState('Semua')
  const touchStartX = useRef(0)

  useEffect(() => {
    async function load() {
      try {
        const { data: storeData } = await getStoreBySlug(slug)
        if (!storeData) { setLoading(false); return }
        setStore(storeData)
        const { data: productsData } = await getProductsByStoreId(storeData.id)
        if (productsData) setProducts(productsData)
        const supabase = getSupabaseClient()
        if (supabase) {
          supabase.rpc('increment_store_view', { sid: storeData.id })
            .then(({ data }: { data: number | null }) => { if (data) setTodayViews(data) })
        }
      } catch (e) { console.error('Failed to load store:', e) }
      setLoading(false)
    }
    load()
  }, [slug])

  const openDetail = (p: Product) => {
    setSelectedProd(p)
    setDetailQty(cart[p.id] || 1)
    setDetailImgIdx(0)
  }

  const addToCart = () => {
    if (!selectedProd) return
    setCart(c => ({ ...c, [selectedProd.id]: detailQty }))
    setSelectedProd(null)
  }

  const setQty = (id: string, qty: number) => {
    if (qty < 1) {
      const n = { ...cart }; delete n[id]; setCart(n)
      return
    }
    setCart(c => ({ ...c, [id]: qty }))
  }

  const removeFromCart = (id: string) => {
    const n = { ...cart }; delete n[id]; setCart(n)
  }

  const cartItems = products.filter(p => cart[p.id])
  const total = cartItems.reduce((s, p) => s + p.price * cart[p.id], 0)
  const totalQty = Object.values(cart).reduce((s, v) => s + v, 0)

  const getProductImages = (p: Product): string[] => {
    if (p.images?.length) return p.images
    if (p.image_url) return [p.image_url]
    return []
  }

  const theme = getThemeByColor(store?.theme_color)
  const categories = ['Semua', ...new Set(products.map(p => p.category).filter(c => c && c !== 'Semua'))]
  const filteredProducts = activeCategory === 'Semua' ? products : products.filter(p => p.category === activeCategory)

  const openCheckout = () => {
    setShowCart(false)
    setCustomerName('')
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
      notes: customerNotes.trim() || undefined,
      items: cartItems.map(p => ({ product_id: p.id, name: p.name, qty: cart[p.id], price: p.price })),
      total,
    })

    const lines = cartItems.map(p => `• ${p.name} × ${cart[p.id]} — ${formatRupiah(p.price * cart[p.id])}`).join('\n')
    const notes = customerNotes.trim() ? `\n\nCatatan: ${customerNotes.trim()}` : ''
    const msg = encodeURIComponent(`Halo ${store.name}! 👋\n\nSaya ${customerName.trim()} mau pesan:\n${lines}\n\nTotal: ${formatRupiah(total)}${notes}\n\nMohon konfirmasinya ya kak 🙏`)

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
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-[440px] mx-auto pb-32">
        {/* STORE HEADER */}
        <header className="bg-white border-b border-gray-200 mb-4">
          {store.banner_url ? (
            <div className="h-[120px] relative overflow-hidden bg-gray-100">
              <img src={store.banner_url} alt={`Banner ${store.name}`} loading="lazy" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="h-[88px] relative" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primary}cc)` }}>
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.15) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />
            </div>
          )}

          <div className="flex justify-center">
            <div className="w-[72px] h-[72px] rounded-[20px] flex items-center justify-center border-[3px] border-white shadow-card-lg -mt-9 relative z-10"
              style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primary}cc)` }}>
              <Icon.Store size={36} className="text-white" />
            </div>
          </div>

          <div className="text-center px-5 pt-3 pb-5">
            <h1 className="font-display font-bold text-[22px] text-gray-900 mb-1 tracking-tight">{store.name}</h1>
            {store.description && (
              <div className="text-xs text-gray-500 leading-relaxed max-w-[280px] mx-auto mb-3.5">{store.description}</div>
            )}
            <div className="flex gap-1.5 justify-center flex-wrap">
              <div className="text-[10px] font-bold rounded-full px-2.5 py-1 flex items-center gap-1"
                style={{ color: theme.primary, background: theme.light, border: `1px solid ${theme.border}` }}>
                <Icon.Check size={10} /> Terpercaya
              </div>
              <div className="text-[10px] font-bold rounded-full px-2.5 py-1 flex items-center gap-1"
                style={{ color: theme.primary, background: theme.light, border: `1px solid ${theme.border}` }}>
                <Icon.Zap size={10} /> Respon Cepat
              </div>
            </div>
            {todayViews > 0 && (
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[11px] text-gray-500 font-medium">{todayViews} orang melihat toko ini hari ini</span>
              </div>
            )}
          </div>
        </header>

        {/* SHIPPING INFO */}
        {store.shipping_info && (
          <div className="px-3.5 mb-4">
            <div className="flex items-start gap-2.5 bg-warm border border-border rounded-xl px-3.5 py-3">
              <div className="flex-shrink-0 mt-0.5"><Icon.Truck size={14} className="text-muted" /></div>
              <div className="text-[11px] text-body leading-relaxed">{store.shipping_info}</div>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        <div className="px-3.5 mb-5">
          <div className="flex items-center justify-between mb-2.5 px-0.5">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              {products.length > 0 ? 'Pilih Produk' : 'Belum ada produk'}
            </div>
            {totalQty > 0 && (
              <button onClick={() => setShowCart(true)} className="relative text-[11px] font-bold text-green-600 bg-green-50 border border-green-200 rounded-full px-2.5 py-1 flex items-center gap-1">
                <Icon.Cart size={12} /> Keranjang
                <span className="absolute -top-1.5 -right-1.5 bg-green-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{totalQty}</span>
              </button>
            )}
          </div>

          {categories.length > 1 && (
            <div className="flex gap-1.5 flex-wrap mb-3.5 px-0.5">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className="text-[11px] font-bold rounded-full px-3 py-1.5 transition-all"
                  style={{
                    background: activeCategory === cat ? theme.primary : '#ffffff',
                    color: activeCategory === cat ? '#ffffff' : '#6b7280',
                    border: activeCategory === cat ? 'none' : '1.5px solid #e5e7eb',
                  }}>
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2.5">
            {filteredProducts.map(p => {
              const images = getProductImages(p)
              const firstImg = images[0]
              const inCart = cart[p.id]
              return (
                <div
                  key={p.id}
                  onClick={() => openDetail(p)}
                  className={`bg-white border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 ${inCart ? 'border-green-500 shadow-[0_0_0_3px_rgba(22,163,74,.12)]' : 'border-gray-200 hover:border-green-200 hover:shadow-[0_6px_20px_rgba(22,163,74,.1)] hover:-translate-y-0.5'}`}
                >
                  <div className="w-full aspect-square relative overflow-hidden" style={{ background: firstImg ? '#f3f4f6' : p.bg_color }}>
                    {firstImg ? (
                      <img src={firstImg} alt={p.name} className="w-full h-full object-contain" />
                    ) : (
                      <>
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.3) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                        <div className="absolute inset-0 flex items-center justify-center"><Icon.Package size={56} className="text-white/80" /></div>
                      </>
                    )}
                  </div>

                  {inCart && (
                    <div className="absolute top-2 right-2 w-[22px] h-[22px] rounded-full bg-green-600 text-white flex items-center justify-center">
                      <Icon.Check size={14} />
                    </div>
                  )}

                  <div className="p-2.5">
                    <div className="text-xs font-bold text-gray-900 mb-0.5 leading-tight">{p.name}</div>
                    <div className="text-sm font-bold text-green-600">
                      {formatRupiah(p.price)} <span className="text-[10px] text-gray-500 font-normal">/ {p.unit}</span>
                    </div>
                    {inCart && (
                      <div className="text-[10px] text-green-600 font-semibold mt-1">✓ {cart[p.id]} di keranjang</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CHAT DULU */}
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl p-4 mx-3.5 mb-5">
          <div className="flex-shrink-0"><Icon.Chat size={24} className="text-gray-400" /></div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-gray-900 mb-0.5">Mau tanya dulu?</div>
            <div className="text-xs text-gray-500">Chat langsung sebelum order, kami siap bantu!</div>
          </div>
          <button
            onClick={() => window.open(`https://wa.me/${store.whatsapp?.replace(/[^0-9]/g, '') || ''}`, '_blank')}
            className="flex-shrink-0 py-2.5 px-4 bg-green-600 text-white rounded-xl font-bold text-xs hover:bg-green-700 transition-all"
          >
            Chat WA
          </button>
        </div>

        <div style={{ height: totalQty > 0 ? 120 : 60 }} />
      </div>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProd && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-end sm:items-center justify-center" onClick={() => setSelectedProd(null)}>
          <div className="bg-white w-full max-w-[440px] sm:rounded-3xl rounded-t-3xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {/* Images */}
            {(() => {
              const images = getProductImages(selectedProd)
              return images.length > 0 ? (
                <div className="relative bg-gray-100"
                  onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
                  onTouchEnd={e => {
                    const diff = e.changedTouches[0].clientX - touchStartX.current
                    if (Math.abs(diff) > 50) {
                      if (diff < 0) setDetailImgIdx(i => Math.min(images.length - 1, i + 1))
                      else setDetailImgIdx(i => Math.max(0, i - 1))
                    }
                  }}>
                  <img src={images[detailImgIdx]} alt={selectedProd.name} className="w-full aspect-square object-contain" />
                  {images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <button key={i} onClick={() => setDetailImgIdx(i)}
                          className={`w-2 h-2 rounded-full transition-all ${i === detailImgIdx ? 'bg-white w-5' : 'bg-white/50'}`} />
                      ))}
                    </div>
                  )}
                  {selectedProd.description && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 pt-8">
                      <div className="text-white/90 text-xs leading-relaxed">{selectedProd.description}</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full aspect-square bg-gray-100 flex items-center justify-center" style={{ background: selectedProd.bg_color }}>
                  <Icon.Package size={80} className="text-gray-300" />
                </div>
              )
            })()}

            {/* Info */}
            <div className="p-4 pb-2">
              <div className="text-lg font-bold text-gray-900 mb-1">{selectedProd.name}</div>
              <div className="text-xl font-bold text-green-600 mb-0.5">{formatRupiah(selectedProd.price)}</div>
              <div className="text-xs text-gray-500 mb-3">/ {selectedProd.unit}</div>
              {!getProductImages(selectedProd).length && selectedProd.description && (
                <div className="text-xs text-gray-600 leading-relaxed mb-3">{selectedProd.description}</div>
              )}
            </div>

            {/* Qty selector */}
            <div className="px-4 pb-4">
              <div className="text-xs font-semibold text-gray-600 mb-2">Jumlah</div>
              <div className="flex items-center gap-3">
                <button onClick={() => setDetailQty(q => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-full border border-gray-200 text-gray-600 text-lg font-bold flex items-center justify-center hover:bg-gray-100 transition-colors font-sans">−</button>
                <div className="text-lg font-bold text-gray-900 min-w-8 text-center">{detailQty}</div>
                <button onClick={() => setDetailQty(q => q + 1)}
                  className="w-9 h-9 rounded-full border border-gray-200 text-gray-600 text-lg font-bold flex items-center justify-center hover:bg-gray-100 transition-colors font-sans">+</button>
                <span className="text-xs text-gray-500 ml-2">× {formatRupiah(selectedProd.price)} = <span className="font-bold text-green-600">{formatRupiah(selectedProd.price * detailQty)}</span></span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2.5 p-4 pt-0">
              {cart[selectedProd.id] && (
                <button onClick={() => { removeFromCart(selectedProd.id); setSelectedProd(null) }}
                  className="py-3 px-3 bg-red-50 text-red-600 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors">
                  <Icon.X size={18} />
                </button>
              )}
              <button onClick={addToCart}
                className="flex-1 py-3 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-1.5"
                style={{ background: theme.primary, boxShadow: `0 4px 12px ${theme.primary}44` }}>
                <Icon.Cart size={16} /> {cart[selectedProd.id] ? 'Update Keranjang' : 'Tambah ke Keranjang'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CART MODAL */}
      {showCart && (
        <div className="fixed inset-0 z-[60] bg-black/40 flex items-end sm:items-center justify-center" onClick={() => setShowCart(false)}>
          <div className="bg-white w-full max-w-[440px] sm:rounded-3xl rounded-t-3xl p-5 pb-8 max-h-[70vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-lg">🛒 Keranjang</h3>
              <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-gray-600"><Icon.X size={20} /></button>
            </div>
            {cartItems.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">Belum ada produk</div>
            ) : (
              <div className="space-y-2.5 mb-5">
                {cartItems.map(p => (
                  <div key={p.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                    {getProductImages(p)[0] ? (
                      <img src={getProductImages(p)[0]} alt={p.name} className="w-12 h-12 object-cover rounded-lg border border-gray-200 flex-shrink-0" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-green-600 flex-shrink-0" style={{ background: p.bg_color }}>
                        <Icon.Package size={22} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-gray-900">{p.name}</div>
                      <div className="text-xs text-gray-500">{formatRupiah(p.price)} / {p.unit}</div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button onClick={() => setQty(p.id, cart[p.id] - 1)}
                        className="w-6 h-6 rounded-full bg-white border border-gray-200 text-gray-500 text-sm font-bold flex items-center justify-center hover:bg-gray-100 font-sans">−</button>
                      <div className="text-sm font-bold text-gray-900 min-w-4 text-center">{cart[p.id]}</div>
                      <button onClick={() => setQty(p.id, cart[p.id] + 1)}
                        className="w-6 h-6 rounded-full bg-white border border-gray-200 text-gray-500 text-sm font-bold flex items-center justify-center hover:bg-gray-100 font-sans">+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-bold text-gray-900">Total</div>
              <div className="text-lg font-bold text-green-600">{formatRupiah(total)}</div>
            </div>
            <button onClick={openCheckout} disabled={totalQty === 0} className="w-full py-3.5 bg-[#25d366] text-white rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(37,211,102,.3)] hover:bg-green-500 hover:-translate-y-px transition-all disabled:opacity-60 disabled:cursor-not-allowed">
              <WhatsAppIcon size={20} /> Pesan via WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* FLOATING CART BAR */}
      {totalQty > 0 && !showCart && !selectedProd && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] bg-white border-t-2 border-gray-200 p-3.5 z-50">
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <div className="text-sm font-bold text-gray-900">{totalQty} produk</div>
              <div className="text-[11px] text-gray-500 mt-0.5">
                {cartItems.slice(0, 2).map(p => `${p.name.slice(0, 10)} ×${cart[p.id]}`).join(', ')}
                {cartItems.length > 2 && <span className="text-green-600"> +{cartItems.length - 2} lagi</span>}
              </div>
            </div>
            <div className="text-lg font-bold text-green-600">{formatRupiah(total)}</div>
          </div>
          <button onClick={() => setShowCart(true)} className="w-full py-3.5 bg-[#25d366] text-white rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(37,211,102,.3)] hover:bg-green-500 hover:-translate-y-px transition-all">
            <WhatsAppIcon size={20} /> Lihat Keranjang & Pesan
          </button>
        </div>
      )}

      {/* CHECKOUT FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-[60] bg-black/40 flex items-end sm:items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="bg-white w-full max-w-[440px] sm:rounded-3xl rounded-t-3xl p-5 pb-8" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Data Pemesan</h3>
            <p className="text-xs text-gray-500 mb-5">Isi nama kamu dulu sebelum pesan via WhatsApp</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nama *</label>
                <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                  placeholder="cth: Siti Nurhaliza" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Catatan <span className="text-gray-400 font-normal">(opsional)</span></label>
                <textarea value={customerNotes} onChange={e => setCustomerNotes(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 resize-none min-h-20"
                  placeholder="Alamat, catatan pesanan, dll." />
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
    </main>
  )
}
