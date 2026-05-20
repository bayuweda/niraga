'use client'

type ViewsData = { day: string; views: number }[]
type TopProduct = { name: string; views: number; orders: number }

export default function AnalyticsCard({
  themeColor = '#16a34a',
  views7Days = [],
  topProducts = [],
  monthlyViews = 0,
}: {
  themeColor?: string
  views7Days: ViewsData
  topProducts: TopProduct[]
  monthlyViews: number
}) {
  const maxViews = views7Days.length > 0 ? Math.max(...views7Days.map(d => d.views), 1) : 1
  const maxTopViews = topProducts.length > 0 ? Math.max(...topProducts.map(p => p.views), 1) : 1
  const avgViews = views7Days.length > 0 ? Math.round(views7Days.reduce((s, d) => s + d.views, 0) / views7Days.length) : 0
  const totalViewsWeek = views7Days.reduce((s, d) => s + d.views, 0)

  const bestDay = views7Days.length > 0
    ? [...views7Days].sort((a, b) => b.views - a.views)[0]
    : null

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-6">
      {/* Chart views */}
      <div className="bg-white border border-gray-200 rounded-3xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-bold text-gray-900">Pengunjung Toko</div>
          <span className="text-[11px] text-gray-400">7 hari terakhir</span>
        </div>
        {views7Days.length > 0 ? (
          <>
            <div className="flex items-end justify-between gap-1.5 h-24">
              {views7Days.map(d => (
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
              <span>Rata-rata {avgViews}/hari</span>
              <span className="font-semibold text-green-600">{totalViewsWeek} total</span>
            </div>
          </>
        ) : (
          <div className="h-24 flex items-center justify-center text-[11px] text-gray-400">Belum ada data</div>
        )}
      </div>

      {/* Produk terpopuler */}
      <div className="bg-white border border-gray-200 rounded-3xl p-5">
        <div className="text-sm font-bold text-gray-900 mb-4">Produk Terpopuler</div>
        {topProducts.length > 0 ? (
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-semibold text-gray-900">{i + 1}. {p.name}</div>
                  <div className="text-[10px] text-gray-500">{p.orders} dipesan</div>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all"
                    style={{ width: `${(p.orders / maxTopViews) * 100}%`, background: themeColor }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-24 flex items-center justify-center text-[11px] text-gray-400">Belum ada data</div>
        )}
      </div>

      {/* Summary stats */}
      <div className="xl:col-span-2 grid grid-cols-3 gap-3">
        <div className="bg-white border border-gray-200 rounded-2xl p-3.5 text-center">
          <div className="text-[10px] text-gray-400 mb-1">Total Views Bulan Ini</div>
          <div className="text-sm font-bold text-gray-900">{monthlyViews}</div>
          <div className="text-[10px] text-green-600 font-medium mt-0.5">{avgViews > 0 ? `~${avgViews}/hari` : '-'}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-3.5 text-center">
          <div className="text-[10px] text-gray-400 mb-1">Produk Terlaris</div>
          <div className="text-sm font-bold text-gray-900">{topProducts[0]?.name || '-'}</div>
          <div className="text-[10px] text-green-600 font-medium mt-0.5">{topProducts[0]?.orders || 0} dipesan</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-3.5 text-center">
          <div className="text-[10px] text-gray-400 mb-1">Hari Tersibuk</div>
          <div className="text-sm font-bold text-gray-900">{bestDay ? `${bestDay.day} (${bestDay.views})` : '-'}</div>
          <div className="text-[10px] text-green-600 font-medium mt-0.5">{bestDay ? `${bestDay.views} pengunjung` : '-'}</div>
        </div>
      </div>
    </div>
  )
}
