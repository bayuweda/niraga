'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import MobileBottomNav from '@/components/dashboard/MobileBottomNav'
import { useAuth } from '@/lib/store'
import { getStoreByUserId, getProductsByStoreId, createProduct, updateProduct, deleteProduct } from '@/lib/db'
import { formatRupiah } from '@/lib/utils'
import { Icon } from '@/components/ui/Icons'
import type { Store, Product } from '@/lib/types'
import { toast } from 'sonner'

export default function ProdukPage() {
  const router = useRouter()
  const { user, initialized } = useAuth()
  const [store, setStore] = useState<Store | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', price: '', unit: '', stock: '', imageBase64: '' })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!initialized) return
    if (!user) { router.push('/login'); return }

    async function load() {
      if (!user) return
      const { data: storeData } = await getStoreByUserId(user.id)
      if (!storeData) { setLoading(false); return }
      setStore(storeData)
      const { data: productsData } = await getProductsByStoreId(storeData.id)
      if (productsData) setProducts(productsData)
      setLoading(false)
    }
    load()
  }, [user, initialized])

  const resetForm = () => {
    setForm({ name: '', price: '', unit: '', stock: '', imageBase64: '' })
    setEditingId(null)
    setShowForm(false)
  }

  const openEdit = (p: Product) => {
    setForm({ name: p.name, price: String(p.price), unit: p.unit, stock: String(p.stock), imageBase64: p.image_url || '' })
    setEditingId(p.id)
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!store || !form.name || !form.price || !form.unit) {
      toast.error('Lengkapi nama, harga, dan unit')
      return
    }

    const payload: any = {
      name: form.name,
      price: parseInt(form.price),
      unit: form.unit,
      stock: parseInt(form.stock) || 0,
    }
    if (form.imageBase64) payload.image_url = form.imageBase64

    if (editingId) {
      const { error } = await updateProduct(editingId, payload)
      if (error) { toast.error('Gagal update produk'); return }
      setProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...payload } : p))
      toast.success('Produk diupdate')
    } else {
      const { data, error } = await createProduct({ store_id: store.id, ...payload })
      if (error || !data) { toast.error('Gagal tambah produk'); return }
      setProducts(prev => [...prev, data])
      toast.success('Produk ditambahkan')
    }
    resetForm()
  }

  const handleToggleActive = async (p: Product) => {
    const { error } = await updateProduct(p.id, { is_active: !p.is_active })
    if (error) { toast.error('Gagal update status'); return }
    setProducts(prev => prev.map(x => x.id === p.id ? { ...x, is_active: !x.is_active } : x))
    toast.success(p.is_active ? 'Produk dinonaktifkan' : 'Produk diaktifkan')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin hapus produk ini?')) return
    const { error } = await deleteProduct(id)
    if (error) { toast.error('Gagal hapus produk'); return }
    setProducts(prev => prev.filter(p => p.id !== id))
    toast.success('Produk dihapus')
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

  return (
    <div className="flex min-h-screen bg-gray-50 pt-16">
      <DashboardSidebar currentPage="Produk" />

      <main className="flex-1 px-4 py-5 sm:p-6 lg:p-10 min-w-0 pb-20 lg:pb-10">
        <div className="flex items-center justify-between gap-4 mb-7 flex-wrap">
          <div>
            <h1 className="font-display font-bold text-gray-900 tracking-tight text-2xl lg:text-3xl flex items-center gap-2.5"><Icon.Package size={28} /> Produk</h1>
            <div className="text-xs text-gray-400 mt-1">{products.length} produk aktif</div>
          </div>
          <button onClick={() => { resetForm(); setShowForm(true) }} className="btn-primary-sm">+ Tambah Produk</button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 mb-6 shadow-card-sm">
            <div className="text-sm font-bold text-gray-900 mb-4">{editingId ? 'Edit Produk' : 'Tambah Produk Baru'}</div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Nama Produk</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                  placeholder="Siomay Frozen Ayam" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Harga (Rp)</label>
                <input value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                  placeholder="45000" type="number" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Unit</label>
                <input value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                  placeholder="isi 20 pcs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Stok</label>
                <input value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                  placeholder="0" type="number" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Foto Produk</label>
                <div className="flex items-center gap-3">
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={e => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    if (file.size > 2 * 1024 * 1024) { toast.error('Maksimal 2MB'); return }
                    const reader = new FileReader()
                    reader.onload = () => setForm({ ...form, imageBase64: reader.result as string })
                    reader.readAsDataURL(file)
                  }} className="hidden" />
                  {form.imageBase64 ? (
                    <div className="relative">
                      <img src={form.imageBase64} alt="Preview" className="w-14 h-14 object-cover rounded-xl border border-gray-200" />
                      <button onClick={() => setForm({ ...form, imageBase64: '' })}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px]">×</button>
                    </div>
                  ) : (
                    <button onClick={() => fileInputRef.current?.click()}
                      className="w-14 h-14 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 hover:border-green-500 hover:text-green-600 transition-all">
                      <Icon.Camera size={20} />
                    </button>
                  )}
                  <span className="text-[11px] text-gray-400">Opsional. Max 2MB.</span>
                </div>
              </div>
              <div className="flex items-end gap-2 md:col-span-4">
                <button onClick={handleSave} className="btn-primary-sm">Simpan</button>
                <button onClick={resetForm} className="py-2.5 px-4 bg-white text-gray-500 border border-gray-200 rounded-2xl font-semibold text-sm hover:bg-gray-50">Batal</button>
              </div>
            </div>
          </div>
        )}

        {/* Product list */}
        {products.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center">
            <div className="mb-3"><Icon.Package size={48} className="text-gray-300 mx-auto" /></div>
            <div className="text-gray-900 font-bold text-lg mb-1">Belum ada produk</div>
            <div className="text-gray-400 text-sm mb-4">Tambah produk pertama kamu</div>
          </div>
        ) : (
          <>
            {/* Mobile: Card View */}
            <div className="flex flex-col gap-3 md:hidden">
              {products.map(p => (
                <div key={p.id} className="bg-white border border-gray-200 rounded-3xl p-4">
                  <div className="flex items-start gap-3">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="w-16 h-16 object-cover rounded-xl border border-gray-200 flex-shrink-0" />
                    ) : (
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0" style={{ background: p.bg_color }}>
                        <Icon.Package size={28} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-gray-900">{p.name}</div>
                      <div className="text-sm font-bold text-green-600 mt-0.5">{formatRupiah(p.price)}</div>
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-1 flex-wrap">
                        <span>{p.unit}</span>
                        <span className={p.stock <= 2 ? 'font-semibold text-red-500' : ''}>Stok: {p.stock}</span>
                      </div>
                    </div>
                    <button onClick={() => handleToggleActive(p)}
                      className={`text-[10px] font-bold px-2 py-1 rounded-full border shrink-0 ${p.is_active ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                      {p.is_active ? 'Aktif' : 'Nonaktif'}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                    <button onClick={() => openEdit(p)} className="flex-1 py-2 text-xs font-semibold text-gray-500 bg-gray-50 rounded-xl hover:bg-green-50 hover:text-green-600 transition-colors inline-flex items-center justify-center gap-1"><Icon.Pencil size={12} /> Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="flex-1 py-2 text-xs font-semibold text-red-500 bg-red-50 rounded-xl hover:bg-red-100 transition-colors inline-flex items-center justify-center gap-1"><Icon.X size={12} /> Hapus</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Table */}
            <div className="hidden md:block bg-white border border-gray-200 rounded-3xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3">Produk</th>
                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3">Harga</th>
                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3">Unit</th>
                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3">Stok</th>
                    <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3">Status</th>
                    <th className="text-right px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-green-50/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          {p.image_url ? (
                            <img src={p.image_url} alt={p.name} className="w-10 h-10 object-cover rounded-xl border border-gray-200 flex-shrink-0" />
                          ) : (
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0" style={{ background: p.bg_color }}>
                              <Icon.Package size={20} />
                            </div>
                          )}
                          <div className="text-sm font-bold text-gray-900">{p.name}</div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="text-sm font-bold text-green-600">{formatRupiah(p.price)}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="text-sm text-gray-500">{p.unit}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className={`text-sm font-semibold ${p.stock <= 2 ? 'text-red-500' : 'text-gray-900'}`}>{p.stock}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <button onClick={() => handleToggleActive(p)}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${p.is_active ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                          {p.is_active ? 'Aktif' : 'Nonaktif'}
                        </button>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEdit(p)} className="py-1.5 px-2.5 text-xs font-semibold text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors inline-flex items-center gap-1"><Icon.Pencil size={12} /> Edit</button>
                          <button onClick={() => handleDelete(p.id)} className="py-1.5 px-2.5 text-xs font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center gap-1"><Icon.X size={12} /> Hapus</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
      <MobileBottomNav />
    </div>
  )
}
