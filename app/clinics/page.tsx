import { Suspense } from 'react'
import { createServerClient } from '@/lib/supabase-server'
import { Clinic, Region } from '@/lib/types'
import ClinicCard from '@/components/ClinicCard'
import ClinicFilters from '@/components/ClinicFilters'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Browse Men\'s Health Clinics',
  description: 'Compare men\'s health clinics worldwide. Filter by procedure, country, price and rating.',
}

export const revalidate = 3600

const PAGE_SIZE = 12

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>
}

async function getClinics(params: Awaited<PageProps['searchParams']>) {
  try {
    const supabase = createServerClient()
    const categories = params.categories ? params.categories.split(',').filter(Boolean) : []
    const region = params.region as Region | undefined
    const country = params.country
    const priceMax = params.priceMax ? parseInt(params.priceMax) : undefined
    const minRating = params.minRating ? parseFloat(params.minRating) : undefined
    const verifiedOnly = params.verifiedOnly === 'true'
    const sort = params.sort ?? 'rating'
    const page = params.page ? parseInt(params.page) : 1

    let query = supabase.from('clinics').select('*', { count: 'exact' })

    if (categories.length > 0) query = query.contains('categories', categories)
    if (region) query = query.eq('region', region)
    if (country) query = query.eq('country', country)
    if (minRating) query = query.gte('rating', minRating)
    if (verifiedOnly) query = query.eq('verified', true)
    if (priceMax !== undefined && priceMax < 10000) query = query.lte('price_max', priceMax)

    if (sort === 'price_asc') query = query.order('price_min', { ascending: true })
    else if (sort === 'price_desc') query = query.order('price_min', { ascending: false })
    else if (sort === 'newest') query = query.order('created_at', { ascending: false })
    else query = query.order('rating', { ascending: false })

    const from = (page - 1) * PAGE_SIZE
    query = query.range(from, from + PAGE_SIZE - 1)

    const { data, count } = await query
    return { clinics: (data ?? []) as Clinic[], total: count ?? 0, page }
  } catch {
    return { clinics: [] as Clinic[], total: 0, page: 1 }
  }
}

async function getCountries() {
  try {
    const supabase = createServerClient()
    const { data } = await supabase.from('clinics').select('country').order('country')
    return [...new Set((data ?? []).map((c: { country: string }) => c.country))]
  } catch {
    return []
  }
}

export default async function ClinicsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const [{ clinics, total, page }, countries] = await Promise.all([getClinics(params), getCountries()])

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const sort = params.sort ?? 'rating'
  const showing = clinics.length

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">

      {/* Page header */}
      <div className="mb-10">
        <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--text-3)] mb-2">Directory</p>
        <h1 className="text-[32px] md:text-[40px] font-semibold text-[var(--text-1)] tracking-tight">Men&apos;s health clinics</h1>
        <p className="text-[15px] text-[var(--text-2)] mt-2">
          Vetted clinics for testosterone therapy, penile enhancement, erectile dysfunction and more.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">

        {/* Sidebar filters */}
        <aside className="w-full lg:w-[220px] xl:w-[240px] shrink-0">
          <div className="lg:sticky lg:top-20">
            <Suspense>
              <ClinicFilters countries={countries} />
            </Suspense>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 pb-5 border-b border-[var(--border)]">
            <p className="text-[13px] text-[var(--text-2)]">
              {total === 0 ? 'No clinics found' : (
                <>
                  Showing <span className="font-medium text-[var(--text-1)]">{showing}</span> of{' '}
                  <span className="font-medium text-[var(--text-1)]">{total}</span> clinics
                </>
              )}
            </p>
            <SortBar current={sort} params={params} />
          </div>

          {clinics.length === 0 ? (
            <div className="py-24 text-center flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center">
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-3)]">
                  <circle cx="9" cy="9" r="6" /><path d="M15 15l3 3" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-[15px] font-medium text-[var(--text-1)]">No clinics match your filters</p>
                <p className="text-[13px] text-[var(--text-3)] mt-1">Try adjusting your criteria.</p>
              </div>
              <Link href="/clinics" className="text-[13px] font-medium px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-2)] hover:border-[var(--border-hover)] hover:text-[var(--text-1)] transition-colors">
                Clear all filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clinics.map((clinic) => (
                <ClinicCard key={clinic.id} clinic={clinic} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} params={params} />
          )}
        </div>
      </div>
    </div>
  )
}

function SortBar({ current, params }: { current: string; params: Record<string, string | undefined> }) {
  const opts = [
    { value: 'rating', label: 'Top rated' },
    { value: 'price_asc', label: 'Price ↑' },
    { value: 'price_desc', label: 'Price ↓' },
    { value: 'newest', label: 'Newest' },
  ]

  function url(sort: string) {
    const p = { ...params, sort, page: '1' }
    return '/clinics?' + Object.entries(p).filter(([, v]) => v).map(([k, v]) => `${k}=${encodeURIComponent(v!)}`).join('&')
  }

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className="text-[11px] text-[var(--text-3)] mr-1">Sort:</span>
      {opts.map((o) => (
        <a
          key={o.value}
          href={url(o.value)}
          className={`text-[12px] px-3 py-1.5 rounded-lg border transition-colors ${
            current === o.value
              ? 'bg-[var(--ink)] text-[var(--ink-fg)] border-[var(--ink)]'
              : 'border-[var(--border)] text-[var(--text-2)] hover:border-[var(--border-hover)] hover:text-[var(--text-1)] bg-[var(--surface)]'
          }`}
        >
          {o.label}
        </a>
      ))}
    </div>
  )
}

function Pagination({ page, totalPages, params }: { page: number; totalPages: number; params: Record<string, string | undefined> }) {
  function url(p: number) {
    const next = { ...params, page: String(p) }
    return '/clinics?' + Object.entries(next).filter(([, v]) => v).map(([k, v]) => `${k}=${encodeURIComponent(v!)}`).join('&')
  }

  return (
    <div className="flex items-center justify-center gap-3 mt-14 pt-8 border-t border-[var(--border)]">
      {page > 1 ? (
        <a href={url(page - 1)} className="flex items-center gap-1.5 text-[13px] font-medium px-4 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-2)] hover:border-[var(--border-hover)] hover:text-[var(--text-1)] bg-[var(--surface)] transition-colors">
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5"><path d="M9 3.5L5 7l4 3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Previous
        </a>
      ) : (
        <span className="flex items-center gap-1.5 text-[13px] px-4 py-2.5 text-[var(--text-3)]">
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5"><path d="M9 3.5L5 7l4 3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Previous
        </span>
      )}
      <span className="text-[13px] font-mono text-[var(--text-2)] px-3">
        {page} <span className="text-[var(--text-3)]">/ {totalPages}</span>
      </span>
      {page < totalPages ? (
        <a href={url(page + 1)} className="flex items-center gap-1.5 text-[13px] font-medium px-4 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-2)] hover:border-[var(--border-hover)] hover:text-[var(--text-1)] bg-[var(--surface)] transition-colors">
          Next
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5"><path d="M5 3.5L9 7l-4 3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      ) : (
        <span className="flex items-center gap-1.5 text-[13px] px-4 py-2.5 text-[var(--text-3)]">
          Next
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5"><path d="M5 3.5L9 7l-4 3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      )}
    </div>
  )
}
