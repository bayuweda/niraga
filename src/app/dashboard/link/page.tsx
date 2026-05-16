'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import MobileBottomNav from '@/components/dashboard/MobileBottomNav'
import { useAuth } from '@/lib/store'
import { getStoreByUserId } from '@/lib/db'
import { Icon } from '@/components/ui/Icons'
import type { Store } from '@/lib/types'

export default function LinkPage() {
  const router = useRouter()
  const { user, initialized } = useAuth()
  const [store, setStore] = useState<Store | null>(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!initialized) return
    if (!user) { router.push('/login'); return }
    getStoreByUserId(user.id).then(({ data }) => {
      if (data) setStore(data)
      setLoading(false)
    })
  }, [user, initialized])

  const storeUrl = store ? `${window.location.origin}/toko/${store.slug}` : ''
  const shareWA = store ? `https://wa.me/?text=${encodeURIComponent(`Yuk lihat katalog ${store.name} di sini:\n${storeUrl}\n\nPilih produk langsung order via WA!`)}` : ''
  const shareIG = store ? `https://instagram.com` : ''

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(storeUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
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
      <DashboardSidebar currentPage="Link Toko" />

      <main className="flex-1 px-4 py-5 sm:p-6 lg:p-10 min-w-0 pb-20 lg:pb-10">
        <div className="mb-7">
          <h1 className="font-display font-bold text-gray-900 tracking-tight text-2xl lg:text-3xl flex items-center gap-2.5"><Icon.Link size={28} /> Link Toko</h1>
          <div className="text-xs text-gray-400 mt-1">Share link toko kamu ke pelanggan</div>
        </div>

        <div className="max-w-xl space-y-5">
          {/* Link Card */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-card-sm">
            <div className="text-sm font-bold text-gray-900 mb-4">Link Toko Kamu</div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-2.5 mb-4">
              <div className="flex-1 text-sm font-bold text-green-600 break-all">{storeUrl}</div>
              <button onClick={handleCopy} className="flex-shrink-0 py-2 px-4 bg-green-600 text-white rounded-lg font-bold text-xs hover:bg-green-700 transition-colors">
                {copied ? <span className="inline-flex items-center gap-1"><Icon.Check size={14} /> Disalin!</span> : 'Salin'}
              </button>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-card-sm">
            <div className="text-sm font-bold text-gray-900 mb-4">Share ke Pelanggan</div>
            <div className="flex flex-col gap-2.5">
              <a href={shareWA} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 bg-[#dcf8c6]/40 border border-[#25d366]/30 rounded-2xl hover:bg-[#dcf8c6]/60 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#25d366] flex items-center justify-center text-white"><Icon.Chat size={20} /></div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Bagikan ke WhatsApp</div>
                  <div className="text-xs text-gray-400">Kirim link toko via WA ke pelanggan</div>
                </div>
              </a>

              <a href={shareIG} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 bg-pink-50 border border-pink-200 rounded-2xl hover:bg-pink-100 transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white"><Icon.Share2 size={20} /></div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Bagikan ke Instagram</div>
                  <div className="text-xs text-gray-400">Tempel link di bio atau story IG</div>
                </div>
              </a>

              <button onClick={handleCopy}
                className="flex items-center gap-3 p-3.5 bg-gray-50 border border-gray-200 rounded-2xl hover:bg-gray-100 transition-all text-left">
                <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center text-gray-600"><Icon.Copy size={20} /></div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Salin Link</div>
                  <div className="text-xs text-gray-400">Copy link ke clipboard</div>
                </div>
              </button>
            </div>
          </div>

          {/* Preview Card */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-card-sm">
            <div className="text-sm font-bold text-gray-900 mb-4">Preview Halaman Toko</div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-400 rounded-[18px] flex items-center justify-center text-2xl mx-auto mb-2.5 shadow-green">
                <Icon.Store size={28} className="text-white" />
              </div>
              <div className="font-bold text-base text-gray-900 mb-0.5">{store.name}</div>
              <div className="text-xs text-gray-500 mb-3">{store.description || 'Toko online kamu'}</div>
              <a href={`/toko/${store.slug}`} target="_blank"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 border border-green-200 rounded-xl px-4 py-2 hover:bg-green-100 transition-all">
                <Icon.ExternalLink size={14} /> Buka Halaman Toko
              </a>
            </div>
          </div>
        </div>
      </main>
      <MobileBottomNav />
    </div>
  )
}
