'use client'

import { useEffect } from 'react'
import { useAuth } from '@/lib/store'

export default function AuthInit() {
  const initialize = useAuth(s => s.initialize)
  useEffect(() => { initialize() }, [initialize])
  return null
}
