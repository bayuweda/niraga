'use client'

import { create } from 'zustand'
import { supabase } from './supabase'

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
  signOut: () => Promise<void>
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: false,
  initialized: false,

  initialize: async () => {
    try {
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

      // Listen for auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
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
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    set({ loading: false })
    return { error }
  },

  signUp: async (email, password) => {
    set({ loading: true })
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    set({ loading: false })
    return { error }
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null })
  },
}))
