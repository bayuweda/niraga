'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

export default function LoadingBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const mountedRef = useRef(false)

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }

    setVisible(true)
    setProgress(20)

    const t1 = setTimeout(() => setProgress(50), 100)
    const t2 = setTimeout(() => setProgress(75), 250)

    const done = setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setVisible(false)
        setProgress(0)
      }, 300)
    }, 500)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(done)
    }
  }, [pathname, searchParams])

  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px]">
      <div
        className="h-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 shadow-[0_0_8px_rgba(34,197,94,0.5)] transition-all duration-[400ms] ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
