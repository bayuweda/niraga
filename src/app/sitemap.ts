import type { MetadataRoute } from 'next'

const SITE_URL = 'https://niraga.online'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/contoh`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/buat-toko`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) return staticPages

  const { createServerClient } = await import('@supabase/ssr')
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: { getAll() { return [] }, setAll() {} },
  })

  const { data: stores } = await supabase
    .from('stores')
    .select('slug, created_at')
    .eq('status', 'active')

  if (stores) {
    for (const store of stores) {
      staticPages.push({
        url: `${SITE_URL}/toko/${store.slug}`,
        lastModified: new Date(store.created_at || Date.now()),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  }

  return staticPages
}
