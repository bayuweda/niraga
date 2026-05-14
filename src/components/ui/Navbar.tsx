'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/store'
import { Icon } from '@/components/ui/Icons'

export default function Navbar() {
  const { initialized, user, initialize } = useAuth()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    initialize()
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 md:px-14 bg-[#fffdf7]/90 backdrop-blur-md border-b border-gray-200">
      <Link href="/" className="font-bold text-[22px] text-green-600">
        Nira<span className="text-gray-900 font-normal" style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>ga</span>
      </Link>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-1 bg-green-50 rounded-full p-1">
          <Link href="/" className="npill"><Icon.Dashboard size={14} /> Landing</Link>
          <Link href="/buat-toko" className="npill"><Icon.Plus size={14} /> Buat Toko</Link>
          <Link href="/contoh" className="npill"><Icon.Store size={14} /> Contoh</Link>
          {initialized && user && (
            <Link href="/dashboard" className="npill"><Icon.Dashboard size={14} /> Dashboard</Link>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-green-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {initialized && user ? (
          <Link href="/dashboard" className="hidden md:flex btn-primary text-sm py-2 px-4">
            Dashboard →
          </Link>
        ) : (
          <Link href="/login" className="hidden md:flex btn-outline text-sm py-2 px-4">
            Login
          </Link>
        )}
      </div>

      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 p-4 md:hidden">
          <div className="flex flex-col gap-2">
            <Link href="/" className="npill w-full text-left inline-flex items-center gap-2" onClick={() => setMenuOpen(false)}><Icon.Dashboard size={14} /> Landing</Link>
            <Link href="/buat-toko" className="npill w-full text-left inline-flex items-center gap-2" onClick={() => setMenuOpen(false)}><Icon.Plus size={14} /> Buat Toko</Link>
            <Link href="/contoh" className="npill w-full text-left inline-flex items-center gap-2" onClick={() => setMenuOpen(false)}><Icon.Store size={14} /> Contoh</Link>
            {initialized && user && (
              <Link href="/dashboard" className="npill w-full text-left inline-flex items-center gap-2" onClick={() => setMenuOpen(false)}><Icon.Dashboard size={14} /> Dashboard</Link>
            )}
            <hr className="my-2 border-gray-200" />
            {initialized && user ? (
              <Link href="/dashboard" className="btn-primary w-full justify-center" onClick={() => setMenuOpen(false)}>Dashboard →</Link>
            ) : (
              <Link href="/login" className="btn-outline w-full justify-center" onClick={() => setMenuOpen(false)}>Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}