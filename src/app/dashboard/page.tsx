'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/ui/Navbar'
import MetricCard from '@/components/ui/MetricCard'
import Badge from '@/components/ui/Badge'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import { useAuth } from '@/lib/store'
import { getStoreByUserId, getOrdersByStoreId, getDashboardMetrics } from '@/lib/db'
import { formatRupiah } from '@/lib/utils'
import { Icon } from '@/components/ui/Icons'
import type { Store, Order } from '@/lib/types'

const statusLabel: Record<string, string> = {
  new: 'Baru',
  confirmed: 'Dikonfirmasi',
  done: 'Selesai',
  cancelled: 'Dibatalkan',
}

export default function DashboardPage() {
  const { user, initialized } = useAuth()
  const [store, setStore] = useState<Store | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [metrics, setMetrics] = useState({
    todayRevenue: 0,
    todayOrders: 0,
    todayChats: 0,
    activeProducts: 0,
    lowStockProducts: 0,
    autoReplyRate: 0,
    totalRevenue: 0,
  })
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!initialized) return
    if (!user) {
      window.location.href = '/login'
      return
    }

    async function load() {
      if (!user) return
      const { data: storeData } = await getStoreByUserId(user.id)
      if (!storeData) {
        setLoading(false)
        return
      }

      setStore(storeData)

      const [ordersRes, metricsRes] = await Promise.all([
        getOrdersByStoreId(storeData.id),
        getDashboardMetrics(storeData.id),
      ])

      if (ordersRes.data) setOrders(ordersRes.data)
      setMetrics(metricsRes)
      setLoading(false)
    }

    load()
  }, [user, initialized])

  const today = new Date()
  const dayName = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][today.getDay()]
  const monthName = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'][today.getMonth()]
  const dateStr = `${dayName}, ${today.getDate()} ${monthName} ${today.getFullYear()}`

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50 pt-16 items-center justify-center">
        <div className="text-gray-400">Memuat...</div>
      </div>
    )
  }

  if (!store) {
    return (
      <div className="flex min-h-screen bg-gray-50 pt-16 items-center justify-center">
        <div className="text-center">
          <div className="mb-3"><Icon.Store size={48} className="text-gray-300 mx-auto" /></div>
          <div className="text-gray-900 font-bold text-lg mb-1">Belum punya toko</div>
          <div className="text-gray-400 text-sm mb-4">Buat toko dulu yuk</div>
          <a href="/buat-toko" className="btn-primary">Buat Toko</a>
        </div>
      </div>
    )
  }

  const recentOrders = orders.slice(0, 5)

  return (
    <div className="flex min-h-screen bg-gray-50 pt-16">
      <Navbar />

      <DashboardSidebar currentPage="Dashboard" />

      {/* MAIN CONTENT */}
      <main className="flex-1 px-4 py-5 sm:p-6 lg:p-10 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-7 flex-wrap">
          <div>
            <h1 className="font-display font-bold text-gray-900 tracking-tight text-2xl lg:text-3xl">
              Selamat pagi{user?.email ? `, ${user.email.split('@')[0]}` : ''}
            </h1>
            <div className="text-xs text-gray-400 mt-1">{dateStr}</div>
          </div>
          <a href="/dashboard/produk" className="btn-primary-sm">+ Tambah Produk</a>
        </div>

        {/* Store Info Card */}
        <div className="bg-white border border-gray-200 rounded-3xl p-5 mb-6 flex items-center gap-4 flex-wrap">
          <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-400 rounded-[14px] flex items-center justify-center text-white text-xl shadow-green shrink-0">
            <Icon.Store size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-gray-900">{store.name}</div>
            <div className="text-xs text-gray-400 mt-0.5 break-all">
              {typeof window !== 'undefined' ? `${window.location.origin}/toko/${store.slug}` : `/toko/${store.slug}`}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={async () => {
                const url = `${window.location.origin}/toko/${store.slug}`
                try { await navigator.clipboard.writeText(url) } catch {}
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
              className="py-2 px-4 bg-gray-100 text-gray-700 rounded-xl font-bold text-xs hover:bg-gray-200 transition-colors"
            >
              {copied ? <span className="inline-flex items-center gap-1"><Icon.Check size={14} /> Disalin!</span> : 'Salin Link'}
            </button>
            <a
              href={`/toko/${store.slug}`}
              target="_blank"
              className="py-2 px-4 bg-green-600 text-white rounded-xl font-bold text-xs hover:bg-green-700 transition-colors inline-flex items-center gap-1"
            >
              <Icon.ExternalLink size={14} /> Buka Toko
            </a>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 mb-6">
          <MetricCard
            label={<span className="flex items-center gap-1.5"><Icon.Money size={14} /> Pendapatan Hari Ini</span>}
            value={formatRupiah(metrics.todayRevenue)}
            change={`${metrics.todayOrders} order masuk`}
            trend="up"
          />
          <MetricCard
            label={<span className="flex items-center gap-1.5"><Icon.Orders size={14} /> Order Masuk</span>}
            value={String(metrics.todayOrders)}
            change={metrics.todayOrders > 0 ? `${metrics.todayOrders} order baru` : 'Belum ada order'}
            trend={metrics.todayOrders > 0 ? 'up' : 'down'}
          />

          <MetricCard
            label={<span className="flex items-center gap-1.5"><Icon.Package size={14} /> Produk Aktif</span>}
            value={String(metrics.activeProducts)}
            change={metrics.lowStockProducts > 0 ? `⚠ ${metrics.lowStockProducts} hampir habis` : 'Stok aman'}
            trend={metrics.lowStockProducts > 0 ? 'down' : 'up'}
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">
          {/* Card Kiri — Order Terbaru */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-5">
              <div className="text-sm font-bold text-gray-900">Order Terbaru</div>
              <a href="/dashboard/pesanan" className="text-xs font-semibold text-green-600 bg-transparent border-none cursor-pointer hover:underline">
                Lihat semua →
              </a>
            </div>

            {recentOrders.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-sm">Belum ada order masuk</div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center gap-3 p-3.5 bg-gray-50 border border-gray-200 rounded-2xl hover:border-green-200 hover:bg-green-50 transition-all duration-150 cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0">
                      <Icon.User size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-gray-900">{order.customer_name}</div>
                      <div className="text-xs text-gray-400">
                        {order.items.map((i: any) => `${i.name} ×${i.qty}`).join(', ')}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs font-bold text-gray-900 mb-1">{formatRupiah(order.total)}</div>
                      <Badge variant={order.status as any}>{statusLabel[order.status] || order.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
