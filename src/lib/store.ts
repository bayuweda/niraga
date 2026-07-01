'use client'

import { create } from 'zustand'
import { getSupabaseClient } from './supabase'

interface User {
  id: string
  email: string
}

interface AuthState {
  user: User | null
  loading: boolean
  initialized: boolean
  initialize: () => Promise<void>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signInWithGoogle: (redirect?: string) => Promise<void>
  signOut: () => Promise<void>
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: false,
  initialized: false,

  initialize: async () => {
    try {
      if (typeof window === 'undefined') {
        set({ initialized: true })
        return
      }

      const supabase = getSupabaseClient()
      if (!supabase) {
        set({ initialized: true })
        return
      }

      const { data: { session } } = await supabase.auth.getSession()

      if (session?.user) {
        set({
          user: {
            id: session.user.id,
            email: session.user.email!,
          },
          initialized: true,
        })
      } else {
        set({ initialized: true })
      }

      supabase.auth.onAuthStateChange((_event: string, session: any) => {
        if (session?.user) {
          set({
            user: {
              id: session.user.id,
              email: session.user.email!,
            },
          })
        } else {
          set({ user: null })
        }
      })
    } catch (error) {
      console.error('Auth initialization error:', error)
      set({ initialized: true })
    }
  },

  signIn: async (email, password) => {
    set({ loading: true })
    const supabase = getSupabaseClient()
    if (!supabase) {
      set({ loading: false })
      return { error: new Error('Supabase belum dikonfigurasi. Cek .env.local') }
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    set({ loading: false })
    return { error }
  },

  signUp: async (email, password) => {
    set({ loading: true })
    const supabase = getSupabaseClient()
    if (!supabase) {
      set({ loading: false })
      return { error: new Error('Supabase belum dikonfigurasi. Cek .env.local') }
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    set({ loading: false })
    return { error }
  },

  signInWithGoogle: async (redirect?: string) => {
    set({ loading: true })
    const supabase = getSupabaseClient()
    if (!supabase) {
      set({ loading: false })
      return
    }
    const redirectTo = redirect
      ? `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirect)}`
      : `${window.location.origin}/auth/callback`
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    })
    if (error) console.error('Google sign-in error:', error.message)
    set({ loading: false })
  },

  signOut: async () => {
    const supabase = getSupabaseClient()
    if (supabase) {
      await supabase.auth.signOut()
    }
    set({ user: null })
  },
}))