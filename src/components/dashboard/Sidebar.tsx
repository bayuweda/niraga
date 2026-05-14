'use client'

import { useAuth } from '@/lib/store'
import { useEffect, useState } from 'react'
import { getStoreByUserId } from '@/lib/db'
import type { Store } from '@/lib/types'
import { Icon } from '@/components/ui/Icons'

const menuItems = [
  { icon: Icon.Dashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Icon.Package, label: 'Produk', href: '/dashboard/produk' },
  { icon: Icon.Orders, label: 'Pesanan', href: '/dashboard/pesanan' },
  { icon: Icon.Link, label: 'Link Toko', href: '/dashboard/link' },
  { icon: Icon.Settings, label: 'Pengaturan', href: '/dashboard/settings' },
]

export default function DashboardSidebar({ currentPage }: { currentPage: string }) {
  const { user, initialized } = useAuth()
  const [store, setStore] = useState<Store | null>(null)

  useEffect(() => {
    if (!initialized || !user) return
    getStoreByUserId(user.id).then(({ data }) => {
      if (data) setStore(data)
    })
  }, [user, initialized])

  return (
    <aside className="hidden lg:flex w-60 flex-shrink-0 bg-dark min-h-[calc(100vh-64px)] sticky top-16 self-start p-4 flex-col">
      <div className="font-display italic font-bold text-green-400 text-lg px-2.5 pb-4 mb-1 border-b border-white/8">
        Niraga
      </div>

      {store && (
        <div className="flex items-center gap-2.5 bg-white/5 border border-white/8 rounded-xl p-3 mt-4 mb-5">
          <div className="w-9 h-9 rounded-[10px] bg-green-600 flex items-center justify-center text-white">
            <Icon.Store size={18} />
          </div>
          <div>
            <div className="text-xs font-bold text-white">{store.name}</div>
            <div className="flex items-center gap-1 text-[10px] text-green-400 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              {store.status === 'active' ? 'Toko Aktif' : 'Tidak Aktif'}
            </div>
          </div>
        </div>
      )}

      <div className="text-[10px] font-bold text-white/25 uppercase tracking-widest px-2.5 mt-4 mb-1.5">Menu</div>

      <div className="flex flex-col gap-0.5">
        {menuItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2.5 w-full text-left px-2.5 py-2.5 rounded-[10px] text-xs font-medium transition-all duration-150
              ${currentPage === item.label
                ? 'bg-green-500/12 text-green-400 border border-green-500/20'
                : 'text-white/40 hover:bg-white/5 hover:text-white/80'
              }`}
          >
            <item.icon size={16} />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </aside>
  )
}
