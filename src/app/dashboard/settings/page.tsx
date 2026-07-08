'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import MobileBottomNav from '@/components/dashboard/MobileBottomNav'
import { useAuth } from '@/lib/store'
import { getStoreByUserId, updateStore, deleteStore } from '@/lib/db'
import { Icon } from '@/components/ui/Icons'
import { STORE_THEMES } from '@/lib/themes'
import type { Store } from '@/lib/types'
import { toast } from 'sonner'

export default function SettingsPage() {
  const router = useRouter()
  const { user, initialized, signOut } = useAuth()
  const [store, setStore] = useState<Store | null>(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', description: '', wa: '', shippingInfo: '', paymentInfo: '', bannerBase64: '', qrisBase64: '', themeColor: '#16a34a' })
  const [bannerRemoved, setBannerRemoved] = useState(false)
  const [qrisRemoved, setQrisRemoved] = useState(false)
  const qrisInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!initialized) return
    if (!user) { router.push('/login'); return }

    async function load() {
      if (!user) return
      const { data } = await getStoreByUserId(user.id)
      if (data) {
        setStore(data)
        setForm({ name: data.name, description: data.description || '', wa: data.whatsapp || '', shippingInfo: data.shipping_info || '', paymentInfo: data.payment_info || '', bannerBase64: data.banner_url || '', qrisBase64: data.qris_url || '', themeColor: data.theme_color })
        setBannerRemoved(false)
        setQrisRemoved(false)
      }
      setLoading(false)
    }
    load()
  }, [user, initialized])

  const handleSave = async () => {
    if (!store || !form.name) { toast.error('Nama toko wajib diisi'); return }
    const bannerUrl: string | null | undefined = bannerRemoved ? null : (form.bannerBase64 || undefined)
    const qrisUrl: string | null | undefined = qrisRemoved ? null : (form.qrisBase64 || undefined)
    const { error } = await updateStore(store.id, {
      name: form.name,
      description: form.description || undefined,
      whatsapp: form.wa || undefined,
      shipping_info: form.shippingInfo || undefined,
      payment_info: form.paymentInfo || undefined,
      qris_url: qrisUrl,
      banner_url: bannerUrl,
      theme_color: form.themeColor,
    })
    if (error) { toast.error('Gagal menyimpan'); return }
    setStore(prev => prev ? { ...prev, name: form.name, description: form.description, whatsapp: form.wa, shipping_info: form.shippingInfo, payment_info: form.paymentInfo, qris_url: form.qrisBase64 || null, banner_url: form.bannerBase64 || null } : null)
    setBannerRemoved(false)
    setQrisRemoved(false)
    toast.success('Pengaturan disimpan')
  }

  if (loading) return (
    <div className="flex min-h-screen bg-gray-50 pt-16 items-center justify-center">
      <div className="text-gray-400">Memuat...</div>
    </div>
  )

  if (!store) return (
    <div className="flex min-h-screen bg-gray-50 pt-16 items-center justify-center">
      <div className="text-center">
        <div className="mb-3"><Icon.Store size={48} className="text-gray-300 mx-auto" /></div>
        <div className="text-gray-900 font-bold text-lg mb-1">Belum punya toko</div>
        <a href="/buat-toko" className="btn-primary">Buat Toko</a>
      </div>
    </div>
  )

  const handleDeleteStore = async () => {
    if (!store) return
    if (!confirm('Yakin ingin menghapus toko ini? Semua data termasuk produk dan pesanan akan hilang permanen.')) return
    const { error } = await deleteStore(store.id)
    if (error) { toast.error('Gagal menghapus toko'); return }
    toast.success('Toko berhasil dihapus')
    router.push('/')
  }

  return (
    <div className="flex min-h-screen bg-gray-50 pt-16">
      <DashboardSidebar currentPage="Pengaturan" />

      <main className="flex-1 px-4 py-5 sm:p-6 lg:p-10 min-w-0 pb-20 lg:pb-10">
        <div className="mb-7">
          <h1 className="font-display font-bold text-gray-900 tracking-tight text-2xl lg:text-3xl flex items-center gap-2.5"><Icon.Settings size={28} /> Pengaturan</h1>
          <div className="text-xs text-gray-400 mt-1">Atur informasi toko kamu</div>
        </div>

        <div className="max-w-xl space-y-5">
          {/* Store Info */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-card-sm">
            <div className="text-sm font-bold text-gray-900 mb-4">Info Toko</div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Nama Toko</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Banner Toko <span className="text-gray-400 font-normal">(opsional)</span></label>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  if (file.size > 2 * 1024 * 1024) { toast.error('Maksimal 2MB'); return }
                  const reader = new FileReader()
                  reader.onload = () => { setForm({ ...form, bannerBase64: reader.result as string }); setBannerRemoved(false) }
                  reader.readAsDataURL(file)
                }} />
                {form.bannerBase64 ? (
                  <div className="relative mb-2">
                    <img src={form.bannerBase64} alt="Banner" className="w-full h-24 object-contain rounded-xl border border-gray-200" />
                    <button onClick={() => { setForm({ ...form, bannerBase64: '' }); setBannerRemoved(true) }}
                      className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600">×</button>
                  </div>
                ) : (
                  <button onClick={() => fileInputRef.current?.click()}
                    className="w-full h-24 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 hover:border-green-500 hover:text-green-600 transition-all text-sm gap-1.5">
                    <Icon.Camera size={18} /> Upload Banner
                  </button>
                )}
                <div className="text-[11px] text-gray-400 mt-1">Ukuran recomendasi: 880×176px. Max 2MB.</div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Warna Tema</label>
                <div className="flex gap-2.5 flex-wrap">
                  {STORE_THEMES.map(t => (
                    <button key={t.id} onClick={() => setForm({ ...form, themeColor: t.primary })}
                      title={t.label}
                      className="w-8 h-8 rounded-full transition-all duration-150"
                      style={{
                        background: t.primary,
                        border: form.themeColor === t.primary ? '3px solid #0f1a0f' : '3px solid transparent',
                        outline: form.themeColor === t.primary ? `2px solid ${t.primary}` : 'none',
                        outlineOffset: 2,
                        transform: form.themeColor === t.primary ? 'scale(1.15)' : 'scale(1)',
                      }} />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Deskripsi</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 resize-none min-h-20" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Nomor WhatsApp</label>
                <input value={form.wa} onChange={e => setForm({ ...form, wa: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                  placeholder="08123456789" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Info Pengiriman</label>
                <input value={form.shippingInfo} onChange={e => setForm({ ...form, shippingInfo: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                  placeholder="Min. order Rp 50rb · COD area Depok" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Pembayaran <span className="text-gray-400 font-normal">(opsional)</span></label>
                <textarea value={form.paymentInfo} onChange={e => setForm({ ...form, paymentInfo: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 resize-none min-h-20"
                  placeholder={"BCA: 1234567890 a.n. Siti Nurhaliza\nMandiri: 9876543210 a.n. Siti Nurhaliza"} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">QRIS <span className="text-gray-400 font-normal">(opsional)</span></label>
                <input ref={qrisInputRef} type="file" accept="image/*" className="hidden" onChange={e => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  if (file.size > 2 * 1024 * 1024) { toast.error('Maksimal 2MB'); return }
                  const reader = new FileReader()
                  reader.onload = () => { setForm({ ...form, qrisBase64: reader.result as string }); setQrisRemoved(false) }
                  reader.readAsDataURL(file)
                }} />
                {form.qrisBase64 ? (
                  <div className="relative inline-block">
                    <img src={form.qrisBase64} alt="QRIS" className="w-32 h-32 object-cover rounded-xl border border-gray-200" />
                    <button onClick={() => { setForm({ ...form, qrisBase64: '' }); setQrisRemoved(true) }}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] hover:bg-red-600">×</button>
                  </div>
                ) : (
                  <button onClick={() => qrisInputRef.current?.click()}
                    className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 hover:border-green-500 hover:text-green-600 transition-all text-sm gap-1.5">
                    <Icon.Camera size={18} /> Upload
                  </button>
                )}
              </div>
              <button onClick={handleSave} className="btn-primary-sm">Simpan</button>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-card-sm">
            <div className="text-sm font-bold text-gray-900 mb-4">Akun</div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Email</span>
                <span className="text-sm font-semibold text-gray-900">{user?.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Slug Toko</span>
                <span className="text-sm font-semibold text-gray-900">{store.slug}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-500">Bergabung sejak</span>
                <span className="text-sm font-semibold text-gray-900">
                  {new Date(store.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
            <button onClick={signOut}
              className="mt-4 w-full py-2.5 bg-red-50 text-red-600 rounded-xl font-semibold text-sm hover:bg-red-100 transition-all">
              Keluar
            </button>
          </div>

          {/* Danger Zone */}
          <div className="bg-white border border-red-200 rounded-3xl p-6">
            <div className="text-sm font-bold text-red-600 mb-1">Zone Berbahaya</div>
            <div className="text-xs text-gray-400 mb-4">Hati-hati, aksi ini tidak bisa dibatalkan</div>
            <button onClick={handleDeleteStore} className="py-2 px-4 bg-red-500 text-white rounded-xl font-bold text-xs hover:bg-red-600 transition-all">
              Hapus Toko
            </button>
          </div>
        </div>
      </main>
      <MobileBottomNav />
    </div>
  )
}
