'use client'

import { Icon } from '@/components/ui/Icons'

const viewsData = [
  { day: 'Sen', views: 12 },
  { day: 'Sel', views: 28 },
  { day: 'Rab', views: 19 },
  { day: 'Kam', views: 35 },
  { day: 'Jum', views: 42 },
  { day: 'Sab', views: 31 },
  { day: 'Min', views: 47 },
]

const topProducts = [
  { name: 'Siomay Frozen Ayam', views: 89, orders: 23 },
  { name: 'Bakso Sapi Premium', views: 67, orders: 18 },
  { name: 'Nugget Ayam Homemade', views: 45, orders: 12 },
]

const maxViews = Math.max(...viewsData.map(d => d.views))
const maxTopViews = Math.max(...topProducts.map(p => p.views))

export default function AnalyticsCard({ themeColor = '#16a34a' }: { themeColor?: string }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-6">
      {/* Chart views */}
      <div className="bg-white border border-gray-200 rounded-3xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-bold text-gray-900">Pengunjung Toko</div>
          <span className="text-[11px] text-gray-400">7 hari terakhir</span>
        </div>
        <div className="flex items-end justify-between gap-1.5 h-24">
          {viewsData.map(d => (
            <div key={d.day} className="flex flex-col items-center gap-1 flex-1">
              <div className="w-full rounded-md transition-all duration-300 hover:opacity-80"
                style={{
                  height: `${(d.views / maxViews) * 100}%`,
                  background: themeColor,
                  opacity: 0.7,
                  minHeight: 4,
                }} />
              <div className="text-[9px] text-gray-400 font-medium">{d.day}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3 text-[10px] text-gray-500">
          <span>Rata-rata {Math.round(viewsData.reduce((s, d) => s + d.views, 0) / viewsData.length)}/hari</span>
          <span className="font-semibold text-green-600">↑ 12% minggu lalu</span>
        </div>
      </div>

      {/* Produk terpopuler */}
      <div className="bg-white border border-gray-200 rounded-3xl p-5">
        <div className="text-sm font-bold text-gray-900 mb-4">Produk Terpopuler</div>
        <div className="space-y-3">
          {topProducts.map((p, i) => (
            <div key={p.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-semibold text-gray-900">{i + 1}. {p.name}</div>
                <div className="text-[10px] text-gray-500">{p.views} dilihat</div>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${(p.views / maxTopViews) * 100}%`, background: themeColor }} />
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5">{p.orders} kali dipesan</div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="xl:col-span-2 grid grid-cols-3 gap-3">
        {[
          { label: 'Total Views Bulan Ini', value: '247', change: '↑ 8.2/hari' },
          { label: 'Produk Terlaris', value: 'Siomay', change: '23 order' },
          { label: 'Hari Tersibuk', value: 'Jumat', change: 'Rata-rata 47 views' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-3.5 text-center">
            <div className="text-[10px] text-gray-400 mb-1">{s.label}</div>
            <div className="text-sm font-bold text-gray-900">{s.value}</div>
            <div className="text-[10px] text-green-600 font-medium mt-0.5">{s.change}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
