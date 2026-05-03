'use client'

import { useAuth } from '@/lib/store'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const { user, initialized, signOut } = useAuth()

  if (!initialized) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="container-app flex items-center justify-between h-full">
          <div className="font-display italic font-bold text-green-700 text-xl">
            Nira<span className="text-green-600">ga</span>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="container-app flex items-center justify-between h-full">
        <div className="font-display italic font-bold text-green-700 text-xl">
          Nira<span className="text-green-600">ga</span>
        </div>

        <div className="flex items-center gap-3">
          {initialized && !user && (
            <>
              <a
                href="/login"
                className="btn-outline text-sm py-2 px-5 hidden sm:inline-flex"
              >
                Masuk
              </a>

              {/* Dropdown Demo */}
              <div className="relative group">
                <button className="btn-outline text-sm py-2 px-5">
                  Lihat Demo ▾
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-card-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <a
                    href="/toko/dapur-dinda"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 rounded-t-xl"
                  >
                    🛍️ Toko Publik
                  </a>
                  <a
                    href="/dashboard"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 rounded-b-xl"
                  >
                    📊 Dashboard
                  </a>
                </div>
              </div>

              <a
                href="/register"
                className="btn-primary text-sm py-2 px-5"
              >
                Daftar Gratis
              </a>
            </>
          )}

          {initialized && user && (
            <>
              <a
                href="/dashboard"
                className="btn-outline text-sm py-2 px-5"
              >
                Dashboard
              </a>
              <button
                onClick={signOut}
                className="btn-primary text-sm py-2 px-5"
              >
                Keluar
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
