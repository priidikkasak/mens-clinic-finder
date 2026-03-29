import { MetadataRoute } from 'next'
import { createServerClient } from '@/lib/supabase-server'

export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let clinics: { slug: string; updated_at: string }[] = []
  try {
    const supabase = createServerClient()
    const { data } = await supabase.from('clinics').select('slug, updated_at')
    clinics = data ?? []
  } catch {
    // no env vars yet
  }

  const clinicUrls: MetadataRoute.Sitemap = clinics.map((c: { slug: string; updated_at: string }) => ({
    url: `https://mensclincfinder.com/clinics/${c.slug}`,
    lastModified: new Date(c.updated_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: 'https://mensclincfinder.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://mensclincfinder.com/clinics',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://mensclincfinder.com/for-clinics',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://mensclincfinder.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...clinicUrls,
  ]
}
