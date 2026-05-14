import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'
import { Suspense } from 'react'
import LoadingBar from '@/components/ui/LoadingBar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>
        <Suspense fallback={null}>
          <LoadingBar />
        </Suspense>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
