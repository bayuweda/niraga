'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import { useAuth } from '@/lib/store'
import { getStoreByUserId, updateStore, deleteStore } from '@/lib/db'
import { Icon } from '@/components/ui/Icons'
import type { Store } from '@/lib/types'
import { toast } from 'sonner'

export default function SettingsPage() {
  const router = useRouter()
  const { user, initialized } = useAuth()
  const [store, setStore] = useState<Store | null>(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', description: '', wa: '', shippingInfo: '' })

  useEffect(() => {
    if (!initialized) return
    if (!user) { router.push('/login'); return }

    async function load() {
      if (!user) return
      const { data } = await getStoreByUserId(user.id)
      if (data) {
        setStore(data)
        setForm({ name: data.name, description: data.description || '', wa: data.whatsapp || '', shippingInfo: data.shipping_info || '' })
      }
      setLoading(false)
    }
    load()
  }, [user, initialized])

  const handleSave = async () => {
    if (!store || !form.name) { toast.error('Nama toko wajib diisi'); return }
    const { error } = await updateStore(store.id, {
      name: form.name,
      description: form.description || undefined,
      whatsapp: form.wa || undefined,
      shipping_info: form.shippingInfo || undefined,
    })
    if (error) { toast.error('Gagal menyimpan'); return }
    setStore(prev => prev ? { ...prev, name: form.name, description: form.description, whatsapp: form.wa, shipping_info: form.shippingInfo } : null)
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

      <main className="flex-1 px-4 py-5 sm:p-6 lg:p-10 min-w-0">
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
    </div>
  )
}
