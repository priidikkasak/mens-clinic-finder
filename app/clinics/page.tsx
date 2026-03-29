import { Suspense } from 'react'
import { createServerClient } from '@/lib/supabase-server'
import { Clinic, Category, Region } from '@/lib/types'
import ClinicCard from '@/components/ClinicCard'
import ClinicFilters from '@/components/ClinicFilters'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browse Men\'s Health Clinics',
  description: 'Compare men\'s health clinics worldwide. Filter by category, country, price and rating.',
}

export const revalidate = 3600

const PAGE_SIZE = 12

interface PageProps {
  searchParams: Promise<{
    categories?: string
    region?: string
    country?: string
    priceMin?: string
    priceMax?: string
    minRating?: string
    verifiedOnly?: string
    sort?: string
    page?: string
  }>
}

async function getClinics(searchParams: Awaited<PageProps['searchParams']>) {
  try {
  const supabase = createServerClient()

  const categoriesRaw = searchParams.categories
  const categories = categoriesRaw ? categoriesRaw.split(',').filter(Boolean) : []
  const region = searchParams.region as Region | undefined
  const country = searchParams.country
  const priceMin = searchParams.priceMin ? parseInt(searchParams.priceMin) : undefined
  const priceMax = searchParams.priceMax ? parseInt(searchParams.priceMax) : undefined
  const minRating = searchParams.minRating ? parseFloat(searchParams.minRating) : undefined
  const verifiedOnly = searchParams.verifiedOnly === 'true'
  const sort = searchParams.sort ?? 'rating'
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  let query = supabase.from('clinics').select('*', { count: 'exact' })

  if (categories.length > 0) {
    query = query.contains('categories', categories)
  }
  if (region) query = query.eq('region', region)
  if (country) query = query.eq('country', country)
  if (minRating) query = query.gte('rating', minRating)
  if (verifiedOnly) query = query.eq('verified', true)
  if (priceMin !== undefined && priceMin > 0) query = query.gte('price_min', priceMin)
  if (priceMax !== undefined && priceMax < 10000) query = query.lte('price_max', priceMax)

  if (sort === 'price_asc') query = query.order('price_min', { ascending: true })
  else if (sort === 'price_desc') query = query.order('price_min', { ascending: false })
  else if (sort === 'newest') query = query.order('created_at', { ascending: false })
  else query = query.order('rating', { ascending: false })

  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1
  query = query.range(from, to)

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
  const [{ clinics, total, page }, countries] = await Promise.all([
    getClinics(params),
    getCountries(),
  ])

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const sort = params.sort ?? 'rating'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[var(--color-text-primary)]">Men&apos;s health clinics</h1>
        <p className="text-[var(--color-text-secondary)] mt-2">
          Find verified clinics for testosterone therapy, penile enhancement, ED treatment and more.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="lg:sticky lg:top-24">
            <Suspense>
              <ClinicFilters countries={countries} />
            </Suspense>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Showing {Math.min((page - 1) * PAGE_SIZE + 1, total)}–{Math.min(page * PAGE_SIZE, total)} of{' '}
              <span className="text-[var(--color-text-primary)] font-medium">{total}</span> clinics
            </p>
            <SortSelect current={sort} searchParams={params} />
          </div>

          {clinics.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-[var(--color-text-secondary)]">No clinics match your filters.</p>
              <p className="text-sm text-[var(--color-text-tertiary)] mt-2">Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clinics.map((clinic) => (
                <ClinicCard key={clinic.id} clinic={clinic} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} searchParams={params} />
          )}
        </div>
      </div>
    </div>
  )
}

function SortSelect({
  current,
  searchParams,
}: {
  current: string
  searchParams: Record<string, string | undefined>
}) {
  const options = [
    { value: 'rating', label: 'Top rated' },
    { value: 'price_asc', label: 'Price: low to high' },
    { value: 'price_desc', label: 'Price: high to low' },
    { value: 'newest', label: 'Newest first' },
  ]

  function buildUrl(sort: string) {
    const p = { ...searchParams, sort, page: '1' }
    const qs = Object.entries(p)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}=${encodeURIComponent(v!)}`)
      .join('&')
    return `/clinics?${qs}`
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-[var(--color-text-tertiary)]">Sort:</span>
      <div className="flex gap-1 flex-wrap">
        {options.map((opt) => (
          <a
            key={opt.value}
            href={buildUrl(opt.value)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
              current === opt.value
                ? 'border-[var(--color-border-hover)] text-[var(--color-text-primary)] bg-[var(--color-surface-2)]'
                : 'border-[var(--color-border)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]'
            }`}
          >
            {opt.label}
          </a>
        ))}
      </div>
    </div>
  )
}

function Pagination({
  page,
  totalPages,
  searchParams,
}: {
  page: number
  totalPages: number
  searchParams: Record<string, string | undefined>
}) {
  function buildUrl(p: number) {
    const params = { ...searchParams, page: String(p) }
    const qs = Object.entries(params)
      .filter(([, v]) => v && v !== '1' || (Object.keys(params).indexOf('page') === -1))
      .map(([k, v]) => `${k}=${encodeURIComponent(v!)}`)
      .join('&')
    return `/clinics?${qs}`
  }

  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      {page > 1 ? (
        <a
          href={buildUrl(page - 1)}
          className="px-4 py-2 text-sm rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          ← Previous
        </a>
      ) : (
        <span className="px-4 py-2 text-sm text-[var(--color-text-tertiary)]">← Previous</span>
      )}

      <span className="text-sm text-[var(--color-text-secondary)] font-mono">
        {page} / {totalPages}
      </span>

      {page < totalPages ? (
        <a
          href={buildUrl(page + 1)}
          className="px-4 py-2 text-sm rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          Next →
        </a>
      ) : (
        <span className="px-4 py-2 text-sm text-[var(--color-text-tertiary)]">Next →</span>
      )}
    </div>
  )
}
