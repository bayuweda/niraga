'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/store'

export default function Navbar() {
  const pathname = usePathname()
  const { initialized, user } = useAuth()

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/toko')) return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 md:px-14 bg-cream/90 backdrop-blur-md border-b border-border">
      <Link href="/">
        <img src="/niraga-logo-full.svg" alt="Niraga" className="h-11 md:h-9" />
      </Link>

      <div className="flex items-center gap-3">
        <Link
          href="/contoh"
          className="hidden sm:inline-flex items-center gap-2 bg-transparent text-dark px-5 py-2 rounded-2xl cursor-pointer font-sans text-xs font-semibold border border-border transition-all duration-200 hover:text-green-600 hover:border-green-600 hover:bg-green-50"
        >
          Lihat Contoh
        </Link>

        <Link
          href="/buat-toko"
          className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-2xl border-none cursor-pointer font-sans text-xs font-bold shadow-green transition-all duration-200 hover:bg-green-700 hover:-translate-y-px"
        >
          Buat Toko Gratis
        </Link>

        {initialized && user ? (
          <>
            <Link href="/dashboard"
              className="text-xs text-muted hover:text-dark font-medium transition-colors">
              Dashboard
            </Link>
            <button onClick={() => useAuth.getState().signOut()}
              className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors">
              Keluar
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="text-xs text-muted hover:text-dark font-medium transition-colors"
          >
            Masuk
          </Link>
        )}
      </div>
    </nav>
  )
}
