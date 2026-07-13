'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/store'

const errorMessages: Record<string, string> = {
  akun_tidak_terautentikasi: 'Gagal masuk. Silakan coba lagi.',
  gagal_tukar_kode: 'Sesi tidak valid. Silakan coba lagi.',
  kode_kosong: 'Tidak ada kode autentikasi. Silakan coba lagi.',
  konfigurasi_server: 'Terjadi kesalahan server. Hubungi admin.',
}

export default function RegisterPage() {
  const router = useRouter()
  const { user, initialized, signInWithGoogle, signUp, loading } = useAuth()
  const redirectRef = useRef<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [showEmail, setShowEmail] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    redirectRef.current = params.get('redirect')
    const err = params.get('error')
    if (err && errorMessages[err]) {
      setErrorMsg(errorMessages[err])
    }
  }, [])

  useEffect(() => {
    if (initialized && user) {
      const params = new URLSearchParams(window.location.search)
      router.push(params.get('redirect') || '/dashboard')
    }
  }, [initialized, user])

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle(redirectRef.current || undefined)
    } catch {
      setErrorMsg('Gagal terhubung ke Google. Cek koneksi internet dan coba lagi.')
    }
  }

  const handleEmailSignUp = async () => {
    if (!email || !password) return
    setErrorMsg(null)
    const { error } = await signUp(email, password, redirectRef.current || '/buat-toko')
    if (error) {
      setErrorMsg(error.message || 'Gagal daftar. Coba lagi.')
    } else {
      setErrorMsg(null)
      const redirect = redirectRef.current ? `?redirect=${encodeURIComponent(redirectRef.current)}` : ''
      router.push('/login' + redirect)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
              Daftar Niraga
            </h1>
            <p className="text-gray-500">
              Setup toko dalam 5 menit — Gratis selamanya
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3.5 mb-4 text-center font-medium">
              {errorMsg}
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-3xl p-8">
            {showEmail ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1.5">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                    placeholder="cth: email@contoh.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1.5">Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                    placeholder="Minimal 6 karakter" />
                </div>
                <button onClick={handleEmailSignUp} disabled={loading || !email || !password}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-500 text-white font-bold rounded-xl text-sm transition-all duration-200">
                  {loading ? 'Memproses...' : 'Daftar'}
                </button>
                <button onClick={() => setShowEmail(false)}
                  className="w-full text-center text-sm text-gray-500 hover:text-gray-700 pt-1">
                  ← Kembali
                </button>
              </div>
            ) : (
              <>
                <button onClick={handleGoogleSignUp} disabled={loading}
                  className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {loading ? 'Memproses...' : 'Daftar dengan Google'}
                </button>

                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400 font-medium">ATAU</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <button onClick={() => setShowEmail(true)}
                  className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  Daftar dengan Email
                </button>

                <div className="text-center mt-5 text-xs text-gray-500">
                  Sudah punya akun?{' '}
                  <a href={redirectRef.current ? `/login?redirect=${encodeURIComponent(redirectRef.current)}` : '/login'} className="text-green-600 font-semibold hover:text-green-700">
                    Masuk
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
