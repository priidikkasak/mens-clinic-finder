import { Suspense } from 'react'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase-server'
import { Clinic, Region } from '@/lib/types'
import { MOCK_CLINICS, filterMockClinics } from '@/lib/mock-clinics'
import ClinicCard from '@/components/ClinicCard'
import ClinicFilters from '@/components/ClinicFilters'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browse Men\'s Health Clinics',
  description: 'Compare verified men\'s health clinics worldwide. Filter by procedure, country, price and rating.',
}

export const revalidate = 3600
const PAGE_SIZE = 12

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>
}

async function getClinics(p: Awaited<PageProps['searchParams']>) {
  const cats = p.categories ? p.categories.split(',').filter(Boolean) : []
  const region = p.region as Region | undefined
  const priceMax = p.priceMax ? parseInt(p.priceMax) : undefined
  const minRating = p.minRating ? parseFloat(p.minRating) : undefined
  const sort = p.sort ?? 'rating'
  const page = p.page ? parseInt(p.page) : 1

  try {
    const sb = createServerClient()
    let q = sb.from('clinics').select('*', { count: 'exact' })
    if (cats.length) q = q.contains('categories', cats)
    if (region) q = q.eq('region', region)
    if (p.country) q = q.eq('country', p.country)
    if (minRating) q = q.gte('rating', minRating)
    if (p.verifiedOnly === 'true') q = q.eq('verified', true)
    if (priceMax && priceMax < 10000) q = q.lte('price_max', priceMax)
    if (sort === 'price_asc') q = q.order('price_min', { ascending: true })
    else if (sort === 'price_desc') q = q.order('price_min', { ascending: false })
    else if (sort === 'newest') q = q.order('created_at', { ascending: false })
    else q = q.order('rating', { ascending: false })
    const from = (page - 1) * PAGE_SIZE
    q = q.range(from, from + PAGE_SIZE - 1)
    const { data, count } = await q
    if (!count && (!data || data.length === 0)) throw new Error('empty')
    return { clinics: (data ?? []) as Clinic[], total: count ?? 0, page }
  } catch {
    return filterMockClinics({
      categories: cats, region, country: p.country,
      minRating, verifiedOnly: p.verifiedOnly === 'true',
      priceMax, sort, page, pageSize: PAGE_SIZE,
    })
  }
}

async function getCountries() {
  try {
    const sb = createServerClient()
    const { data } = await sb.from('clinics').select('country').order('country')
    const countries = [...new Set((data ?? []).map((c: { country: string }) => c.country))]
    if (countries.length === 0) throw new Error('empty')
    return countries
  } catch {
    return [...new Set(MOCK_CLINICS.map(c => c.country))].sort()
  }
}

export default async function ClinicsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const [{ clinics, total, page }, countries] = await Promise.all([getClinics(params), getCountries()])
  const totalPages = Math.ceil(total / PAGE_SIZE)
  const sort = params.sort ?? 'rating'

  return (
    <div style={{ minHeight: 'calc(100vh - 56px)' }}>
      <div className="pg-w">

        <div style={{ padding: '2.5rem 0', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>Directory</p>
          <h1 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.5rem,3vw,2rem)', color: 'var(--text-1)', letterSpacing: '-0.03em' }}>
            Men&apos;s health clinics
          </h1>
        </div>

        <div style={{ display: 'flex', gap: 0 }}>

          {/* Sidebar */}
          <aside style={{ width: 220, flexShrink: 0, borderRight: '1px solid var(--border)', paddingRight: '2rem', paddingTop: '2rem', paddingBottom: '2rem' }}>
            <div style={{ position: 'sticky', top: 72 }}>
              <Suspense>
                <ClinicFilters countries={countries} />
              </Suspense>
            </div>
          </aside>

          {/* Results */}
          <div style={{ flex: 1, minWidth: 0, paddingLeft: '2rem', paddingTop: '2rem', paddingBottom: '2rem' }}>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border)' }}>
              <p style={{ fontSize: 13, color: 'var(--text-2)' }}>
                <strong style={{ fontFamily: 'var(--font-syne)', fontSize: 16, fontWeight: 700, color: 'var(--text-1)' }}>{total}</strong>
                {' '}{total === 1 ? 'clinic' : 'clinics'} found
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: 4 }}>Sort</span>
                {[
                  { v: 'rating', l: 'Top rated' },
                  { v: 'price_asc', l: 'Price ↑' },
                  { v: 'price_desc', l: 'Price ↓' },
                  { v: 'newest', l: 'Newest' },
                ].map((o) => {
                  const url = '/clinics?' + Object.entries({ ...params, sort: o.v, page: '1' })
                    .filter(([, v]) => v).map(([k, v]) => `${k}=${encodeURIComponent(v!)}`).join('&')
                  const active = sort === o.v
                  return (
                    <a key={o.v} href={url} style={{
                      fontSize: 11, padding: '0.375rem 0.75rem', borderRadius: 6,
                      border: `1px solid ${active ? 'transparent' : 'var(--border)'}`,
                      background: active ? 'var(--grad-primary)' : 'white',
                      color: active ? 'white' : 'var(--text-2)',
                      fontWeight: 500, textDecoration: 'none',
                    }}>
                      {o.l}
                    </a>
                  )
                })}
              </div>
            </div>

            {clinics.length === 0 ? (
              <div style={{ padding: '6rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 18, color: 'var(--text-1)' }}>No clinics match</p>
                <p style={{ fontSize: 13, color: 'var(--text-3)', maxWidth: 280 }}>Try adjusting your filters.</p>
                <Link href="/clinics" style={{ fontSize: 12, fontWeight: 600, padding: '0.625rem 1.25rem', borderRadius: 8, border: '1px solid var(--border)', color: 'var(--text-2)', textDecoration: 'none' }}>
                  Clear all filters
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3" style={{ gap: '1rem' }}>
                {clinics.map((c) => <ClinicCard key={c.id} clinic={c} />)}
              </div>
            )}

            {totalPages > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                {page > 1 ? (
                  <a href={'/clinics?' + Object.entries({ ...params, page: String(page - 1) }).filter(([,v]) => v).map(([k,v]) => `${k}=${encodeURIComponent(v!)}`).join('&')}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid var(--border)', color: 'var(--text-2)', textDecoration: 'none', background: 'white' }}>
                    ← Prev
                  </a>
                ) : <span style={{ fontSize: 12, padding: '0.5rem 1rem', color: 'var(--text-3)' }}>← Prev</span>}

                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 12, color: 'var(--text-2)' }}>
                  {page} <span style={{ color: 'var(--text-3)' }}>/ {totalPages}</span>
                </span>

                {page < totalPages ? (
                  <a href={'/clinics?' + Object.entries({ ...params, page: String(page + 1) }).filter(([,v]) => v).map(([k,v]) => `${k}=${encodeURIComponent(v!)}`).join('&')}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid var(--border)', color: 'var(--text-2)', textDecoration: 'none', background: 'white' }}>
                    Next →
                  </a>
                ) : <span style={{ fontSize: 12, padding: '0.5rem 1rem', color: 'var(--text-3)' }}>Next →</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
