import { createServerClient } from '@supabase/ssr'
import type { Metadata } from 'next'

const SITE_URL = 'https://niraga.online'

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params
  const defaultTitle = 'Toko tidak ditemukan - Niraga'
  const defaultDesc = 'Toko tidak tersedia atau belum aktif.'

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseKey) {
    return { title: defaultTitle, description: defaultDesc }
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: { getAll() { return [] }, setAll() {} },
  })

  const { data: store } = await supabase
    .from('stores')
    .select('name, description, banner_url')
    .eq('slug', username)
    .maybeSingle()

  if (!store) {
    return { title: defaultTitle, description: defaultDesc }
  }

  const title = `${store.name} - Belanja via WhatsApp`
  const description = store.description || `Katalog produk ${store.name}. Pesan langsung via WhatsApp.`
  const ogImage = store.banner_url || `${SITE_URL}/favicon.svg`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/toko/${username}`,
      siteName: 'Niraga',
      images: [{ url: ogImage, width: 880, height: 176 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: { canonical: `${SITE_URL}/toko/${username}` },
  }
}

export default async function StoreLayout({ children, params }: { children: React.ReactNode; params: Promise<{ username: string }> }) {
  const { username } = await params

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  let store: { name: string; description: string | null; banner_url: string | null; whatsapp: string | null } | null = null

  if (supabaseUrl && supabaseKey) {
    const { createServerClient } = await import('@supabase/ssr')
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: { getAll() { return [] }, setAll() {} },
    })
    const { data } = await supabase
      .from('stores')
      .select('name, description, banner_url, whatsapp')
      .eq('slug', username)
      .maybeSingle()
    store = data
  }

  const jsonLd = store ? {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: store.name,
    description: store.description || `Katalog produk ${store.name}`,
    url: `${SITE_URL}/toko/${username}`,
    image: store.banner_url,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: store.whatsapp ? `+62${store.whatsapp.replace(/^0/, '')}` : undefined,
      contactType: 'sales',
    },
  } : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  )
}
