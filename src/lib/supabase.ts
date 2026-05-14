'use client'

import { createBrowserClient } from '@supabase/ssr'

let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null

function getEnvVars() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    console.warn(
      'Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
    )
    return null
  }
  return { url, key }
}

type SupabaseClient = ReturnType<typeof createBrowserClient>

export function getSupabaseClient(): SupabaseClient {
  if (supabaseInstance) return supabaseInstance!
  if (typeof window === 'undefined') return null as any

  const env = getEnvVars()
  if (!env) return null as any

  supabaseInstance = createBrowserClient(env.url, env.key)
  return supabaseInstance
}

export const supabase = {
  auth: {
    getSession: async () => {
      const client = getSupabaseClient()
      return client.auth.getSession()
    },
    signInWithPassword: async (options: { email: string; password: string }) => {
      const client = getSupabaseClient()
      return client.auth.signInWithPassword(options)
    },
    signUp: async (options: { email: string; password: string }) => {
      const client = getSupabaseClient()
      return client.auth.signUp(options)
    },
    signOut: async () => {
      const client = getSupabaseClient()
      return client.auth.signOut()
    },
    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      const client = getSupabaseClient()
      return client.auth.onAuthStateChange(callback)
    },
  },
}