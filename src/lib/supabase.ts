'use client'

import { createBrowserClient } from '@supabase/ssr'

let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseClient() {
  if (!supabaseInstance && typeof window !== 'undefined') {
    supabaseInstance = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }
  return supabaseInstance!
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