'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/store'
import Navbar from '@/components/ui/Navbar'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const { signUp, loading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Password tidak cocok')
      return
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter')
      return
    }

    const { error } = await signUp(email, password)

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-gray-50 pt-16">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
          <div className="text-center">
            <div className="text-6xl mb-4">📧</div>
            <h1 className="font-display font-bold text-2xl text-gray-900 mb-2">
              Cek Email Kamu
            </h1>
            <p className="text-gray-500">
              Link konfirmasi sudah dikirim ke {email}
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <Navbar />

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

          <div className="bg-white border border-gray-200 rounded-3xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                  placeholder="kamu@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                  placeholder="minimal 6 karakter"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Konfirmasi Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                  placeholder="ulangi password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Memproses...' : 'Daftar Gratis'}
              </button>
            </form>

            <div className="text-center mt-6 text-sm text-gray-500">
              Sudah punya akun?{' '}
              <a href="/login" className="text-green-600 font-semibold hover:text-green-700">
                Masuk
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
