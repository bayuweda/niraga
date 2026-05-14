'use client'

import { useEffect, useState } from 'react'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import { useAuth } from '@/lib/store'
import { getStoreByUserId, getProductsByStoreId, createProduct, updateProduct, deleteProduct } from '@/lib/db'
import { formatRupiah } from '@/lib/utils'
import { Icon } from '@/components/ui/Icons'
import type { Store, Product } from '@/lib/types'
import { toast } from 'sonner'

export default function ProdukPage() {
  const { user, initialized } = useAuth()
  const [store, setStore] = useState<Store | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', price: '', unit: '', stock: '' })

  useEffect(() => {
    if (!initialized) return
    if (!user) { window.location.href = '/login'; return }

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
    setForm({ name: '', price: '', unit: '', stock: '' })
    setEditingId(null)
    setShowForm(false)
  }

  const openEdit = (p: Product) => {
    setForm({ name: p.name, price: String(p.price), unit: p.unit, stock: String(p.stock) })
    setEditingId(p.id)
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!store || !form.name || !form.price || !form.unit) {
      toast.error('Lengkapi nama, harga, dan unit')
      return
    }

    const payload = {
      name: form.name,
      price: parseInt(form.price),
      unit: form.unit,
      stock: parseInt(form.stock) || 0,
    }

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

      <main className="flex-1 px-4 py-5 sm:p-6 lg:p-10 min-w-0">
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
              <div className="flex items-end gap-2">
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
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3">Produk</th>
                  <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3 hidden md:table-cell">Harga</th>
                  <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3 hidden md:table-cell">Unit</th>
                  <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3 hidden md:table-cell">Stok</th>
                  <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3">Status</th>
                  <th className="text-right px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-green-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0" style={{ background: p.bg_color }}><Icon.Package size={18} /></div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">{p.name}</div>
                          <div className="flex md:hidden items-center gap-2 text-[11px] text-gray-500 mt-0.5 flex-wrap">
                            <span className="font-semibold text-green-600">{formatRupiah(p.price)}</span>
                            <span>{p.unit}</span>
                            {p.stock !== undefined && <span className={p.stock <= 2 ? 'text-red-500 font-semibold' : ''}>Stok: {p.stock}</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <div className="text-sm font-bold text-green-600">{formatRupiah(p.price)}</div>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <div className="text-sm text-gray-500">{p.unit}</div>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
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
        )}
      </main>
    </div>
  )
}
