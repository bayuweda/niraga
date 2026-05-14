'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/store'
import Navbar from '@/components/ui/Navbar'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signIn, loading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
    } else {
      const redirect = typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search).get('redirect') || '/dashboard'
        : '/dashboard'
      router.push(redirect)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
              Masuk ke Niraga
            </h1>
            <p className="text-gray-500">
              Kelola toko dan bot AI kamu
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
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Memproses...' : 'Masuk'}
              </button>
            </form>

            <div className="text-center mt-6 text-sm text-gray-500">
              Belum punya akun?{' '}
              <a href="/register" className="text-green-600 font-semibold hover:text-green-700">
                Daftar Gratis
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
