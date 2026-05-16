'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@/components/ui/Icons'

const items = [
  { icon: Icon.Dashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Icon.Package, label: 'Produk', href: '/dashboard/produk' },
  { icon: Icon.Orders, label: 'Pesanan', href: '/dashboard/pesanan' },
  { icon: Icon.Link, label: 'Link', href: '/dashboard/link' },
  { icon: Icon.Settings, label: 'Setting', href: '/dashboard/settings' },
]

export default function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-2 pb-1 pt-1.5 safe-area-bottom">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-semibold transition-all duration-150
                ${isActive
                  ? 'text-green-600'
                  : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
