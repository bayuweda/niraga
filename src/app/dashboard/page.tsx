'use client'

import Navbar from '@/components/ui/Navbar'
import MetricCard from '@/components/ui/MetricCard'
import Badge from '@/components/ui/Badge'

const menuItems = [
  { icon: '📊', label: 'Dashboard', active: true },
  { icon: '📦', label: 'Produk' },
  { icon: '📋', label: 'Pesanan' },
  { icon: '🤖', label: 'Bot AI' },
  { icon: '🔗', label: 'Link Toko' },
  { icon: '⚙️', label: 'Pengaturan' },
]

const orders = [
  {
    emoji: '👩',
    name: 'Siti Rahayu',
    product: 'Siomay Frozen × 3',
    amount: 'Rp 135.000',
    status: 'new' as const,
    statusLabel: 'Baru',
  },
  {
    emoji: '👨',
    name: 'Budi Santoso',
    product: 'Bakso Sapi × 2',
    amount: 'Rp 110.000',
    status: 'confirmed' as const,
    statusLabel: 'Dikonfirmasi',
  },
  {
    emoji: '👩‍💼',
    name: 'Dewi Lestari',
    product: 'Nugget Ayam × 5',
    amount: 'Rp 210.000',
    status: 'done' as const,
    statusLabel: 'Selesai',
  },
  {
    emoji: '🧑',
    name: 'Andi Wijaya',
    product: 'Udang Crispy × 1',
    amount: 'Rp 65.000',
    status: 'confirmed' as const,
    statusLabel: 'Dikonfirmasi',
  },
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 pt-16">
      <Navbar />

      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-60 flex-shrink-0 bg-dark min-h-[calc(100vh-64px)] sticky top-16 self-start p-4 flex-col">
        {/* Logo */}
        <div className="font-display italic font-bold text-green-400 text-lg px-2.5 pb-4 mb-1 border-b border-white/8">
          Niraga
        </div>

        {/* Store Card */}
        <div className="flex items-center gap-2.5 bg-white/5 border border-white/8 rounded-xl p-3 mt-4 mb-5">
          <div className="w-9 h-9 rounded-[10px] bg-green-600 flex items-center justify-center text-base">
            🥟
          </div>
          <div>
            <div className="text-xs font-bold text-white">Dapur Dinda</div>
            <div className="flex items-center gap-1 text-[10px] text-green-400 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Toko Aktif
            </div>
          </div>
        </div>

        {/* Menu Label */}
        <div className="text-[10px] font-bold text-white/25 uppercase tracking-widest px-2.5 mt-4 mb-1.5">
          Menu
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-0.5">
          {menuItems.map((item, i) => (
            <button
              key={i}
              className={`flex items-center gap-2.5 w-full text-left px-2.5 py-2.5 rounded-[10px] text-xs font-medium transition-all duration-150
                ${item.active
                  ? 'bg-green-500/12 text-green-400 border border-green-500/20'
                  : 'text-white/40 hover:bg-white/5 hover:text-white/80'
                }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 lg:p-10 min-w-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-7 flex-wrap">
          <div>
            <h1 className="font-display font-bold text-gray-900 tracking-tight text-2xl lg:text-3xl">
              Selamat pagi, Dinda 👋
            </h1>
            <div className="text-xs text-gray-400 mt-1">Sabtu, 3 Mei 2026</div>
          </div>
          <button className="btn-primary-sm">+ Tambah Produk</button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
          <MetricCard
            label="💰 Pendapatan Hari Ini"
            value="Rp 840rb"
            change="↑ +12% vs kemarin"
            trend="up"
          />
          <MetricCard
            label="📋 Order Masuk"
            value="12"
            change="↑ 3 order baru"
            trend="up"
          />
          <MetricCard
            label="💬 Chat Bot"
            value="47"
            change="↑ 94% auto-replied"
            trend="up"
          />
          <MetricCard
            label="📦 Produk Aktif"
            value="8"
            change="⚠ 2 hampir habis"
            trend="down"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">
          {/* Card Kiri — Order Terbaru */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-5">
              <div className="text-sm font-bold text-gray-900">Order Terbaru</div>
              <button className="text-xs font-semibold text-green-600 bg-transparent border-none cursor-pointer">
                Lihat semua →
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {orders.map((order, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3.5 bg-gray-50 border border-gray-200 rounded-2xl hover:border-green-200 hover:bg-green-50 transition-all duration-150 cursor-pointer"
                >
                  <div className="w-10 h-10 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                    {order.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-gray-900">{order.name}</div>
                    <div className="text-xs text-gray-400">{order.product}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs font-bold text-gray-900 mb-1">{order.amount}</div>
                    <Badge variant={order.status}>{order.statusLabel}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card Kanan — Bot AI */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-5">
              <div className="text-sm font-bold text-gray-900">Bot AI</div>
              <button className="text-xs font-semibold text-green-600 bg-transparent border-none cursor-pointer">
                Atur →
              </button>
            </div>

            {/* Bot Header */}
            <div className="flex items-center gap-2.5 bg-dark rounded-2xl p-3.5 mb-4">
              <div className="w-9 h-9 bg-green-600 rounded-[10px] flex items-center justify-center text-base">
                🤖
              </div>
              <div>
                <div className="text-xs font-bold text-white">Admin Dapur Dinda</div>
                <div className="flex items-center gap-1 text-[10px] text-green-400 mt-0.5">
                  ● Online · Telegram
                </div>
              </div>
            </div>

            {/* Chat Preview */}
            <div className="flex flex-col gap-2 mb-4">
              {[
                { type: 'user', text: 'Kak siomay masih ada stok?', time: '14:23' },
                {
                  type: 'bot',
                  text: 'Masih ada kak! Stok 15 pack. Mau pesan berapa? 😊',
                  time: '14:23',
                },
                { type: 'user', text: 'Mau 3, COD bisa?', time: '14:24' },
                {
                  type: 'bot',
                  text: 'Bisa COD kak! Total Rp 135.000. Boleh share alamatnya? 🏠',
                  time: '14:24',
                },
              ].map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[88%] px-3 py-2.5 rounded-2xl text-xs leading-snug
                    ${msg.type === 'user'
                      ? 'self-end bg-green-600 text-white rounded-br-[4px]'
                      : 'self-start bg-gray-50 border border-gray-200 rounded-bl-[4px] text-gray-800'
                    }`}
                >
                  {msg.text}
                  <div
                    className={`text-[9px] mt-1 ${
                      msg.type === 'user' ? 'text-white/50 text-right' : 'text-gray-400'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              ))}
            </div>

            {/* Bot Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
                <div className="font-display font-bold text-xl text-gray-900">47</div>
                <div className="text-[10px] text-gray-400 font-semibold mt-0.5">Chat hari ini</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
                <div className="font-display font-bold text-xl text-gray-900">94%</div>
                <div className="text-[10px] text-gray-400 font-semibold mt-0.5">Auto-reply rate</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
