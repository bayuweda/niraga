'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { formatRupiah } from '@/lib/utils'
import { useAuth } from '@/lib/store'
import { getSupabaseClient } from '@/lib/supabase'
import { createStore, createProduct } from '@/lib/db'
import { Icon, WhatsAppIcon } from '@/components/ui/Icons'

interface Product {
  id: number
  name: string
  price: string
  unit: string
  emoji: string
  imageBase64: string
  imageUrl: string
}

export default function BuatTokoPage() {
  const router = useRouter()
  const { user, initialized, initialize } = useAuth()
  const [step, setStep] = useState(0)
  const [store, setStore] = useState({ name: '', username: '', wa: '', desc: '', shippingInfo: '' })
  const [products, setProducts] = useState<Product[]>([
    { id: 1, emoji: '🥟', name: 'Siomay Frozen Ayam', price: '45000', unit: 'isi 20 pcs', imageBase64: '', imageUrl: '' },
  ])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProd, setNewProd] = useState({ emoji: '', name: '', price: '', unit: '', imageBase64: '' })
  const [copied, setCopied] = useState(false)
  const [saving, setSaving] = useState(false)
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'too-short'>('idle')
  const manualUsername = useRef(false)

  // Initialize auth + restore wizard data after login/register redirect
  useEffect(() => {
    initialize()
    if (typeof window !== 'undefined') {
      try {
        const savedStore = sessionStorage.getItem('niraga_wizard_store')
        const savedProducts = sessionStorage.getItem('niraga_wizard_products')
        if (savedStore) {
          const parsed = JSON.parse(savedStore)
          setStore(parsed)
          if (parsed.username) manualUsername.current = true
        }
        if (savedProducts) setProducts(JSON.parse(savedProducts))
      } catch {}
    }
  }, [])

  const saveWizardData = () => {
    sessionStorage.setItem('niraga_wizard_store', JSON.stringify(store))
    sessionStorage.setItem('niraga_wizard_products', JSON.stringify(products))
  }

  // Auto-slugify username from store name
  useEffect(() => {
    if (!manualUsername.current) {
      const slug = store.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      setStore(prev => ({ ...prev, username: slug }))
    }
  }, [store.name])

  // Debounce username availability check
  useEffect(() => {
    if (!store.username || store.username.length < 3) {
      setUsernameStatus(store.username.length > 0 && store.username.length < 3 ? 'too-short' : 'idle')
      return
    }

    const timer = setTimeout(async () => {
      setUsernameStatus('checking')
      try {
        const supabase = getSupabaseClient()
        const { data } = await supabase.rpc('check_username_available', { uname: store.username })
        setUsernameStatus(data ? 'available' : 'taken')
      } catch {
        setUsernameStatus('available')
      }
    }, 600)

    return () => clearTimeout(timer)
  }, [store.username])

  const steps = ['Info Toko', 'Produk', 'Preview & Link']
  const fileInputRef = { current: null as any }

  const addProduct = () => {
    if (!newProd.name || !newProd.price) return
    setProducts(p => [...p, { id: Date.now(), emoji: '📦', name: newProd.name, price: newProd.price, unit: newProd.unit, imageBase64: newProd.imageBase64, imageUrl: '' }])
    setNewProd({ emoji: '', name: '', price: '', unit: '', imageBase64: '' })
    setShowAddForm(false)
  }

  const removeProduct = (id: number) => {
    setProducts(p => p.filter(x => x.id !== id))
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(storeUrl)
      setCopied(true)
    } catch {
      setCopied(true)
    }
    setTimeout(() => setCopied(false), 2000)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran maksimal 2MB')
      return
    }
    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diperbolehkan')
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setNewProd(prev => ({ ...prev, imageBase64: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  const slug = store.username || 'toko'
  const storeUrl = typeof window !== 'undefined' ? `${window.location.origin}/${slug}` : `${slug}`

  const handleCreateStore = async () => {
    if (!initialized) {
      toast.loading('Memeriksa sesi...')
      return
    }

    if (!user) {
      saveWizardData()
      router.push(`/register?redirect=/buat-toko`)
      return
    }

    setSaving(true)
    try {
      const { data: newStore, error } = await createStore({
        user_id: user.id,
        name: store.name,
        slug,
        whatsapp: store.wa || undefined,
        description: store.desc || undefined,
        shipping_info: store.shippingInfo || undefined,
      })

      if (error || !newStore) {
        console.error('Gagal simpan toko:', error, newStore)
        toast.error(error?.message || 'Gagal menyimpan toko')
        setSaving(false)
        return
      }

      for (const p of products) {
        const { error: prodErr } = await createProduct({
          store_id: newStore.id,
          name: p.name,
          price: parseInt(p.price),
          unit: p.unit,
          emoji: p.emoji || '📦',
        })
        if (prodErr) console.error('Gagal simpan produk:', prodErr)
      }

      sessionStorage.removeItem('niraga_wizard_store')
      sessionStorage.removeItem('niraga_wizard_products')
      toast.success('Toko berhasil dibuat!')
      router.push('/dashboard')
    } catch {
      toast.error('Terjadi kesalahan')
      setSaving(false)
    }
  }

  const usernameFieldClass = (base: string) => {
    if (usernameStatus === 'available') return `${base} border-green-500 bg-green-50`
    if (usernameStatus === 'taken') return `${base} border-red-400 bg-red-50`
    return base
  }

  const usernameStatusIcon = () => {
    if (usernameStatus === 'checking') return <div className="w-3.5 h-3.5 border-2 border-muted border-t-transparent rounded-full animate-spin" />
    if (usernameStatus === 'available') return <Icon.Check size={14} className="text-green-600" />
    if (usernameStatus === 'taken') return <Icon.X size={14} className="text-red-500" />
    return null
  }

  const usernameStatusText = () => {
    if (usernameStatus === 'checking') return <span className="text-xs text-muted">Mengecek...</span>
    if (usernameStatus === 'available') return <span className="text-xs text-green-600">Tersedia!</span>
    if (usernameStatus === 'taken') return <span className="text-xs text-red-500">Sudah dipakai, coba yang lain</span>
    if (usernameStatus === 'too-short') return <span className="text-xs text-muted">Minimal 3 karakter</span>
    return null
  }

  const canContinue = store.name && store.wa && store.username && usernameStatus === 'available'

  return (
    <div className="min-h-screen bg-cream pt-16">
      {/* HEADER */}
      <div className="text-center pt-10 md:pt-16 pb-0 px-4">
        <div className="tag-pill mb-3.5 w-fit mx-auto">
          <div className="live-dot" />
          Gratis · Tanpa login dulu
        </div>
        <h1 className="font-bold text-gray-900 text-[28px] md:text-[46px] tracking-[-1.5px] mb-2.5" style={{ fontFamily: 'Instrument Serif, serif' }}>
          Buat Toko Kamu
        </h1>
        <p className="text-base text-gray-600">Isi info di bawah — toko siap dalam 2 menit.</p>
      </div>

      {/* STEPPER */}
      <div className="flex items-center justify-center gap-0 py-8 md:py-10 px-4">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 border-2 ${i < step ? 'bg-green-600 border-green-600 text-white' : i === step ? 'bg-white border-green-600 text-green-600 shadow-[0_0_0_4px_rgba(22,163,74,.12)]' : 'bg-white border-gray-200 text-gray-500'}`}>
                {i < step ? <Icon.Check size={16} /> : i + 1}
              </div>
              <div className={`text-[11px] font-semibold mt-1.5 whitespace-nowrap ${i < step ? 'text-green-600' : i === step ? 'text-green-600' : 'text-gray-500'}`}>{s}</div>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 w-[40px] md:w-20 bg-gray-200 mx-1 mb-5 transition-all duration-200 ${i < step ? 'bg-green-600' : ''}`} />
            )}
          </div>
        ))}
      </div>

      {/* STEP CONTENT */}
      <div className="max-w-[560px] mx-auto px-4 pb-[60px]">
        {/* STEP 0: INFO TOKO */}
        {step === 0 && (
          <div className="bg-white border border-gray-200 rounded-3xl p-5 md:p-8 shadow-card-sm">
            <div className="text-xl font-bold text-gray-900 mb-1.5 tracking-tight flex items-center gap-2"><Icon.Store size={22} /> Info Toko kamu</div>
            <div className="text-sm text-gray-500 mb-7 leading-relaxed">Info ini yang pelanggan lihat di halaman tokomu.</div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Nama Toko *</label>
                <input
                  type="text"
                  value={store.name}
                  onChange={e => setStore({ ...store, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 bg-cream transition-all"
                  placeholder="cth: Dapur Dinda, Toko Baju Cantik..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Link Toko *</label>
                <div className="flex items-stretch">
                  <div className="flex items-center px-3.5 bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl text-sm text-muted font-medium">niraga.vercel.app/</div>
                  <input
                    type="text"
                    maxLength={30}
                    value={store.username}
                    onChange={e => {
                      const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                      manualUsername.current = true
                      setStore({ ...store, username: val })
                    }}
                    className={`flex-1 px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${usernameFieldClass('border rounded-r-xl bg-cream border-gray-200 focus:border-green-500 focus:ring-green-500/20')}`}
                    placeholder="nama-toko"
                  />
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 min-h-5">
                  {usernameStatusIcon()}
                  {usernameStatusText()}
                  {usernameStatus === 'idle' && <span className="text-xs text-muted">Ini akan jadi link permanenmu.</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Nomor WhatsApp *</label>
                <input
                  type="text"
                  value={store.wa}
                  onChange={e => setStore({ ...store, wa: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 bg-cream transition-all"
                  placeholder="cth: 08123456789"
                />
                <div className="text-[11px] text-gray-500 mt-1.5">Order dari pelanggan akan masuk ke nomor ini.</div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Deskripsi Singkat <span className="text-gray-500 font-normal">(opsional)</span></label>
                <textarea
                  value={store.desc}
                  onChange={e => setStore({ ...store, desc: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 bg-cream transition-all resize-none min-h-20"
                  placeholder="cth: Frozen food homemade, bebas pengawet, dikirim setiap hari..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Info Pengiriman <span className="text-gray-500 font-normal">(opsional)</span></label>
                <input
                  type="text"
                  value={store.shippingInfo}
                  onChange={e => setStore({ ...store, shippingInfo: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 bg-cream transition-all"
                  placeholder="cth: Min. order Rp 50rb · COD area Depok · Order sebelum jam 3"
                />
                <div className="text-[11px] text-gray-500 mt-1.5">Ditampilkan di halaman toko untuk ngurangin pertanyaan pelanggan.</div>
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              disabled={!canContinue}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-500 text-white font-bold py-3.5 rounded-2xl transition-all duration-200 shadow-green disabled:shadow-none"
            >
              Lanjut — Tambah Produk →
            </button>
          </div>
        )}

        {/* STEP 1: PRODUK */}
        {step === 1 && (
          <div className="bg-white border border-gray-200 rounded-3xl p-5 md:p-8 shadow-card-sm">
            <div className="text-xl font-bold text-gray-900 mb-1.5 tracking-tight flex items-center gap-2"><Icon.Package size={22} /> Produk kamu</div>
            <div className="text-sm text-gray-500 mb-7 leading-relaxed">Tambah produk yang mau kamu jual. Bisa diedit kapanpun.</div>

            <div className="space-y-2.5 mb-4">
              {products.map(p => (
                <div key={p.id} className="flex items-center gap-3 bg-warm border border-gray-200 rounded-xl p-3.5">
                  <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0"><Icon.Package size={22} /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-gray-900">{p.name}</div>
                    <div className="text-xs font-bold text-green-600">{formatRupiah(parseInt(p.price))}</div>
                  </div>
                  <button onClick={() => removeProduct(p.id)} className="w-7 h-7 bg-red-100 text-red-600 rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-red-200 transition-colors"><Icon.X size={14} /></button>
                </div>
              ))}
            </div>

            {!showAddForm ? (
              <button onClick={() => setShowAddForm(true)} className="w-full py-3 border-2 border-dashed border-green-200 bg-green-50 text-green-600 font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 hover:bg-green-100 hover:border-green-500 transition-all">
                + Tambah Produk
              </button>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2.5">
                  <input
                    type="text"
                    value={newProd.name}
                    onChange={e => setNewProd({ ...newProd, name: e.target.value })}
                    className="w-full px-3 py-2.5 border border-green-200 rounded-lg text-sm bg-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                    placeholder="Nama produk"
                  />
                  <input
                    type="text"
                    value={newProd.price}
                    onChange={e => setNewProd({ ...newProd, price: e.target.value })}
                    className="w-full px-3 py-2.5 border border-green-200 rounded-lg text-sm bg-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                    placeholder="Harga (cth: 45000)"
                  />
                </div>
                <input
                  type="text"
                  value={newProd.unit}
                  onChange={e => setNewProd({ ...newProd, unit: e.target.value })}
                  className="w-full px-3 py-2.5 border border-green-200 rounded-lg text-sm bg-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 mb-2.5"
                  placeholder="Unit (cth: isi 20 pcs)"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {newProd.imageBase64 && (
                  <div className="relative mb-2.5">
                    <img src={newProd.imageBase64} alt="Preview" className="w-full h-20 object-cover rounded-lg" />
                  </div>
                )}
                <button onClick={() => fileInputRef.current?.click()} className="w-full py-2 border border-green-200 rounded-lg text-xs text-gray-500 bg-white mb-2.5 hover:border-green-500 flex items-center justify-center gap-1.5">
                  <Icon.Camera size={14} /> Upload foto (opsional)
                </button>
                <div className="flex gap-2">
                  <button onClick={() => setShowAddForm(false)} className="flex-1 py-2.5 bg-white text-gray-500 border border-gray-200 rounded-lg font-semibold text-sm hover:bg-gray-50">Batal</button>
                  <button onClick={addProduct} className="flex-1 py-2.5 bg-green-600 text-white rounded-lg font-bold text-sm hover:bg-green-700">+ Tambah</button>
                </div>
              </div>
            )}

            <div className="flex gap-2.5 mt-6">
              <button onClick={() => setStep(0)} className="flex-1 py-3.5 bg-white text-gray-900 border border-gray-200 rounded-2xl font-bold text-sm hover:border-gray-400 transition-all">← Kembali</button>
              <button onClick={() => setStep(2)} disabled={products.length === 0} className="flex-1 py-3.5 bg-green-600 text-white rounded-2xl font-bold text-sm shadow-green disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none hover:bg-green-700 transition-all">Lihat Preview →</button>
            </div>
          </div>
        )}

        {/* STEP 2: PREVIEW */}
        {step === 2 && (
          <div className="bg-white border border-gray-200 rounded-3xl p-5 md:p-8 shadow-card-sm">
            <div className="text-xl font-bold text-gray-900 mb-1.5 tracking-tight flex items-center gap-2"><Icon.Sparkles size={22} className="text-green-500" /> Toko kamu siap!</div>
            <div className="text-sm text-gray-500 mb-6 leading-relaxed">Ini tampilan toko kamu. Salin link di bawah dan share ke pelanggan.</div>

            {/* Preview Phone */}
            <div className="bg-white rounded-[28px] p-4 shadow-card-lg border border-gray-200 mb-5">
              <div className="text-center pb-4 border-b border-gray-200 mb-3.5">
                <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-400 rounded-[18px] flex items-center justify-center mx-auto mb-2.5 shadow-green"><Icon.Store size={28} className="text-white" /></div>
                <div className="font-bold text-base text-gray-900 mb-0.5">{store.name || 'Nama Toko'}</div>
                <div className="text-[11px] text-gray-500">{store.desc || 'Toko online kamu'}</div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {products.slice(0, 4).map(p => (
                  <div key={p.id} className="bg-warm border border-gray-200 rounded-xl p-2.5">
                    <div className="mb-1"><Icon.Package size={24} className="text-green-600" /></div>
                    <div className="text-[10px] font-bold text-gray-900 leading-tight mb-0.5">{p.name}</div>
                    <div className="text-[11px] font-bold text-green-600">{formatRupiah(parseInt(p.price))}</div>
                  </div>
                ))}
              </div>
              <button className="w-full py-2.5 bg-green-600 text-white rounded-xl font-bold text-[11px] shadow-green flex items-center justify-center gap-1.5"><Icon.Cart size={14} /> Pilih & Pesan via WA</button>
            </div>

            {/* Link Box */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 mb-3">
              <div className="text-xs sm:text-sm font-bold text-green-600 break-all w-full sm:flex-1">
                {storeUrl}
              </div>
              <button onClick={handleCopy} className="w-full sm:w-auto py-2.5 sm:py-2 px-4 bg-green-600 text-white rounded-lg font-bold text-xs hover:bg-green-700 transition-colors text-center">
                {copied ? <span className="inline-flex items-center gap-1"><Icon.Check size={14} /> Disalin!</span> : 'Salin'}
              </button>
            </div>

            {/* Save Banner */}
            <div className="bg-white border border-amber-400 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="hidden sm:block flex-shrink-0"><Icon.Save size={24} className="text-amber-500" /></div>
              <div className="flex items-start gap-3 sm:gap-0 w-full sm:w-auto">
                <div className="sm:hidden flex-shrink-0"><Icon.Save size={20} className="text-amber-500" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-gray-900 mb-0.5">Simpan toko kamu</div>
                  <div className="text-[11px] text-gray-500">
                    {user ? 'Tinggal klik simpan, toko langsung aktif!' : 'Buat akun gratis biar toko bisa diedit kapanpun.'}
                  </div>
                </div>
              </div>
              <button
                onClick={handleCreateStore}
                disabled={saving}
                className="w-full sm:w-auto py-2.5 sm:py-2 px-4 bg-amber-500 text-white rounded-lg font-bold text-xs hover:bg-amber-600 transition-colors disabled:opacity-50 text-center"
              >
                {saving ? 'Menyimpan...' : 'Simpan Gratis'}
              </button>
            </div>

            <div className="flex gap-2.5 mt-4">
              <button onClick={() => setStep(1)} className="flex-1 py-3.5 bg-white text-gray-900 border border-gray-200 rounded-2xl font-bold text-sm hover:border-gray-400 transition-all">← Edit Produk</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
