'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import MobileBottomNav from '@/components/dashboard/MobileBottomNav'
import Badge from '@/components/ui/Badge'
import { useAuth } from '@/lib/store'
import { getStoreByUserId, getOrdersByStoreId, updateOrderStatus, deleteOrder } from '@/lib/db'
import { formatRupiah } from '@/lib/utils'
import { Icon } from '@/components/ui/Icons'
import type { Store, Order } from '@/lib/types'
import { toast } from 'sonner'

const statusLabel: Record<string, string> = {
  new: 'Baru',
  confirmed: 'Dikonfirmasi',
  done: 'Selesai',
  cancelled: 'Dibatalkan',
}

const statusNext: Record<string, { label: string; status: 'confirmed' | 'done' | 'cancelled'; color: string }[]> = {
  new: [
    { label: 'Konfirmasi', status: 'confirmed', color: 'bg-green-600 hover:bg-green-700' },
    { label: 'Batalkan', status: 'cancelled', color: 'bg-red-500 hover:bg-red-600' },
  ],
  confirmed: [
    { label: 'Selesai', status: 'done', color: 'bg-green-600 hover:bg-green-700' },
    { label: 'Batalkan', status: 'cancelled', color: 'bg-red-500 hover:bg-red-600' },
  ],
  done: [],
  cancelled: [],
}

export default function PesananPage() {
  const router = useRouter()
  const { user, initialized } = useAuth()
  const [store, setStore] = useState<Store | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!initialized) return
    if (!user) { router.push('/login'); return }

    async function load() {
      if (!user) return
      const { data: storeData } = await getStoreByUserId(user.id)
      if (!storeData) { setLoading(false); return }
      setStore(storeData)
      const { data: ordersData } = await getOrdersByStoreId(storeData.id)
      if (ordersData) setOrders(ordersData)
      setLoading(false)
    }
    load()
  }, [user, initialized])

  const handleStatusChange = async (orderId: string, status: 'confirmed' | 'done' | 'cancelled') => {
    const { error } = await updateOrderStatus(orderId, status)
    if (error) { toast.error('Gagal update status'); return }
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
    toast.success(`Pesanan ${statusLabel[status].toLowerCase()}`)
  }

  const handleDelete = async (orderId: string) => {
    if (!confirm('Hapus pesanan ini?')) return
    const { error } = await deleteOrder(orderId)
    if (error) { toast.error('Gagal hapus pesanan'); return }
    setOrders(prev => prev.filter(o => o.id !== orderId))
    toast.success('Pesanan dihapus')
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)
  const counts = {
    all: orders.length,
    new: orders.filter(o => o.status === 'new').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    done: orders.filter(o => o.status === 'done').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
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
      <DashboardSidebar currentPage="Pesanan" />

      <main className="flex-1 px-4 py-5 sm:p-6 lg:p-10 min-w-0 pb-20 lg:pb-10">
        <div className="flex items-center justify-between gap-4 mb-7 flex-wrap">
          <div>
            <h1 className="font-display font-bold text-gray-900 tracking-tight text-2xl lg:text-3xl flex items-center gap-2.5"><Icon.Orders size={28} /> Pesanan</h1>
            <div className="text-xs text-gray-400 mt-1">{orders.length} total pesanan</div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1.5 mb-6 flex-wrap">
          {[
            { key: 'all', label: 'Semua', count: counts.all },
            { key: 'new', label: 'Baru', count: counts.new },
            { key: 'confirmed', label: 'Dikonfirmasi', count: counts.confirmed },
            { key: 'done', label: 'Selesai', count: counts.done },
            { key: 'cancelled', label: 'Dibatalkan', count: counts.cancelled },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition-all
                ${filter === tab.key
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-green-200'
                }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Orders list */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center">
            <div className="mb-3"><Icon.Orders size={48} className="text-gray-300 mx-auto" /></div>
            <div className="text-gray-900 font-bold text-lg mb-1">Tidak ada pesanan</div>
            <div className="text-gray-400 text-sm">Belum ada pesanan dengan status ini</div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map(order => (
              <div key={order.id} className="bg-white border border-gray-200 rounded-3xl p-5 hover:border-green-200 transition-all">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center text-green-600"><Icon.User size={18} /></div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{order.customer_name}</div>
                      {order.customer_contact && (
                        <div className="text-xs text-gray-400">{order.customer_contact}</div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">{formatRupiah(order.total)}</div>
                    <div className="mt-1">
                      <Badge variant={order.status}>{statusLabel[order.status]}</Badge>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="text-xs font-semibold text-gray-500 mb-1.5">Pesanan:</div>
                  <div className="flex flex-col gap-1">
                    {order.items.map((item: any, i: number) => (
                      <div key={i} className="text-xs text-gray-700 flex justify-between">
                        <span>{item.name} × {item.qty}</span>
                        <span className="font-semibold">{formatRupiah(item.price * item.qty)}</span>
                      </div>
                    ))}
                  </div>
                  {order.notes && (
                    <div className="mt-2 pt-2 border-t border-dashed border-gray-100">
                      <span className="text-[11px] text-gray-500">Catatan: </span>
                      <span className="text-xs text-gray-700">{order.notes}</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
                  <div className="text-[11px] text-gray-400">{new Date(order.created_at).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</div>
                  <div className="flex gap-1.5">
                    {order.status === 'new' && (
                      <button onClick={() => handleDelete(order.id)}
                        className="text-xs font-bold px-3 py-1.5 rounded-xl text-red-500 border border-red-200 hover:bg-red-50 transition-all">
                        Hapus
                      </button>
                    )}
                    {statusNext[order.status]?.map(action => (
                      <button
                        key={action.status}
                        onClick={() => handleStatusChange(order.id, action.status)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl text-white transition-all ${action.color}`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <MobileBottomNav />
    </div>
  )
}
