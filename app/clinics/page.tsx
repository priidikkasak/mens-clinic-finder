import { Suspense } from 'react'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase-server'
import { Clinic, Region } from '@/lib/types'
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
  try {
    const sb = createServerClient()
    const cats = p.categories ? p.categories.split(',').filter(Boolean) : []
    const region = p.region as Region | undefined
    const priceMax = p.priceMax ? parseInt(p.priceMax) : undefined
    const minRating = p.minRating ? parseFloat(p.minRating) : undefined
    const sort = p.sort ?? 'rating'
    const page = p.page ? parseInt(p.page) : 1

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
    return { clinics: (data ?? []) as Clinic[], total: count ?? 0, page }
  } catch {
    return { clinics: [] as Clinic[], total: 0, page: 1 }
  }
}

async function getCountries() {
  try {
    const sb = createServerClient()
    const { data } = await sb.from('clinics').select('country').order('country')
    return [...new Set((data ?? []).map((c: { country: string }) => c.country))]
  } catch { return [] }
}

export default async function ClinicsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const [{ clinics, total, page }, countries] = await Promise.all([getClinics(params), getCountries()])
  const totalPages = Math.ceil(total / PAGE_SIZE)
  const sort = params.sort ?? 'rating'

  return (
    <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

      {/* Page header */}
      <div className="py-10 border-b border-[var(--border)]">
        <div className="flex items-baseline gap-5">
          <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[var(--text-3)] uppercase tracking-widest">Directory</span>
          <h1 className="font-[family-name:var(--font-syne)] font-extrabold text-[28px] md:text-[36px] tracking-[-0.03em] text-[var(--text-1)]">
            Men&apos;s health clinics
          </h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-0">

        {/* Sidebar */}
        <aside className="w-full lg:w-[220px] xl:w-[240px] shrink-0 border-b lg:border-b-0 lg:border-r border-[var(--border)] py-8 lg:pr-8">
          <div className="lg:sticky lg:top-20">
            <Suspense>
              <ClinicFilters countries={countries} />
            </Suspense>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0 py-8 lg:pl-8">

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7 pb-6 border-b border-[var(--border)]">
            <p className="text-[13px] text-[var(--text-2)]">
              {total === 0
                ? 'No clinics found'
                : <><span className="font-[family-name:var(--font-syne)] font-bold text-[16px] text-[var(--text-1)]">{total}</span> {total === 1 ? 'clinic' : 'clinics'} found</>
              }
            </p>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono text-[var(--text-3)] uppercase tracking-wider mr-1">Sort</span>
              {[
                { v: 'rating', l: 'Top rated' },
                { v: 'price_asc', l: 'Price ↑' },
                { v: 'price_desc', l: 'Price ↓' },
                { v: 'newest', l: 'Newest' },
              ].map((o) => {
                const url = '/clinics?' + Object.entries({ ...params, sort: o.v, page: '1' })
                  .filter(([, v]) => v).map(([k, v]) => `${k}=${encodeURIComponent(v!)}`).join('&')
                return (
                  <a key={o.v} href={url}
                    className={`text-[11px] px-3 py-1.5 rounded-md border font-medium transition-colors ${
                      sort === o.v
                        ? 'bg-[var(--navy)] text-white border-[var(--navy)]'
                        : 'bg-white text-[var(--text-2)] border-[var(--border)] hover:border-[var(--border-strong)]'
                    }`}>
                    {o.l}
                  </a>
                )
              })}
            </div>
          </div>

          {clinics.length === 0 ? (
            <div className="py-32 flex flex-col items-center gap-5 text-center">
              <p className="font-[family-name:var(--font-syne)] font-bold text-[20px] text-[var(--text-1)]">No clinics match</p>
              <p className="text-[13px] text-[var(--text-3)] max-w-xs">Try adjusting your filters to see more results.</p>
              <Link href="/clinics" className="text-[12px] font-semibold px-5 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-2)] hover:border-[var(--border-strong)] hover:text-[var(--text-1)] transition-colors">
                Clear all filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {clinics.map((c) => <ClinicCard key={c.id} clinic={c} />)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-14 pt-8 border-t border-[var(--border)]">
              {page > 1 ? (
                <a href={'/clinics?' + Object.entries({ ...params, page: String(page - 1) }).filter(([,v]) => v).map(([k,v]) => `${k}=${encodeURIComponent(v!)}`).join('&')}
                  className="flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-2)] hover:border-[var(--border-strong)] hover:text-[var(--text-1)] bg-white transition-colors">
                  <svg width="13" height="13" fill="none" viewBox="0 0 13 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 3L5 6.5 8.5 10"/></svg>
                  Prev
                </a>
              ) : <span className="text-[12px] px-4 py-2.5 text-[var(--text-3)]">Prev</span>}

              <span className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[var(--text-2)]">
                {page} <span className="text-[var(--text-3)]">/ {totalPages}</span>
              </span>

              {page < totalPages ? (
                <a href={'/clinics?' + Object.entries({ ...params, page: String(page + 1) }).filter(([,v]) => v).map(([k,v]) => `${k}=${encodeURIComponent(v!)}`).join('&')}
                  className="flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-2)] hover:border-[var(--border-strong)] hover:text-[var(--text-1)] bg-white transition-colors">
                  Next
                  <svg width="13" height="13" fill="none" viewBox="0 0 13 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 3L8 6.5 4.5 10"/></svg>
                </a>
              ) : <span className="text-[12px] px-4 py-2.5 text-[var(--text-3)]">Next</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
