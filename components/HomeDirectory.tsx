'use client'

import { useState, useMemo } from 'react'
import { Clinic, Category } from '@/lib/types'
import { getAllCategories, getCategoryLabel, countryFlag } from '@/lib/utils'
import ClinicCard from './ClinicCard'

const SORT_OPTIONS = [
  { value: 'rating', label: 'Top rated' },
  { value: 'price_asc', label: 'Price: low → high' },
  { value: 'price_desc', label: 'Price: high → low' },
]

export default function HomeDirectory({ clinics }: { clinics: Clinic[] }) {
  const [activeCat, setActiveCat] = useState<Category | null>(null)
  const [country, setCountry] = useState('')
  const [sort, setSort] = useState('rating')
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  const countries = useMemo(() =>
    [...new Set(clinics.map(c => c.country))].sort(),
    [clinics]
  )

  const filtered = useMemo(() => {
    let r = [...clinics]
    if (activeCat) r = r.filter(c => c.categories.includes(activeCat))
    if (country) r = r.filter(c => c.country === country)
    if (verifiedOnly) r = r.filter(c => c.verified)
    if (sort === 'price_asc') r.sort((a, b) => (a.price_min ?? Infinity) - (b.price_min ?? Infinity))
    else if (sort === 'price_desc') r.sort((a, b) => (b.price_min ?? 0) - (a.price_min ?? 0))
    else r.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    return r
  }, [clinics, activeCat, country, sort, verifiedOnly])

  const hasFilters = activeCat !== null || country !== '' || verifiedOnly

  return (
    <div className="dir-section">
      <div className="pg-w">

        {/* Section header */}
        <div className="dir-header">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
            <h2 className="dir-title">All clinics</h2>
            <span className="dir-count">{filtered.length} of {clinics.length}</span>
          </div>
          {hasFilters && (
            <button
              className="dir-clear"
              onClick={() => { setActiveCat(null); setCountry(''); setVerifiedOnly(false) }}
            >
              Clear filters ×
            </button>
          )}
        </div>

        {/* Filter bar */}
        <div className="dir-filter-bar">
          <div className="dir-cats">
            <button
              className={`dir-cat-btn${!activeCat ? ' on' : ''}`}
              onClick={() => setActiveCat(null)}
            >All</button>
            {getAllCategories().map(cat => (
              <button
                key={cat}
                className={`dir-cat-btn${activeCat === cat ? ' on' : ''}`}
                onClick={() => setActiveCat(activeCat === cat ? null : cat)}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>

          <div className="dir-right-controls">
            <div className="dir-sel-wrap">
              <select
                className="dir-sel"
                value={country}
                onChange={e => setCountry(e.target.value)}
                aria-label="Filter by country"
              >
                <option value="">All countries</option>
                {countries.map(c => (
                  <option key={c} value={c}>{countryFlag(c)} {c}</option>
                ))}
              </select>
              <svg className="dir-sel-chevron" width="10" height="10" fill="none" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3.5l3 3 3-3"/>
              </svg>
            </div>

            <div className="dir-sel-wrap">
              <select
                className="dir-sel"
                value={sort}
                onChange={e => setSort(e.target.value)}
                aria-label="Sort clinics"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <svg className="dir-sel-chevron" width="10" height="10" fill="none" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3.5l3 3 3-3"/>
              </svg>
            </div>

            <button
              className={`dir-verified-btn${verifiedOnly ? ' on' : ''}`}
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              aria-pressed={verifiedOnly}
            >
              <svg width="11" height="11" fill="none" viewBox="0 0 11 11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 5.5l2.5 2.5L9 3"/>
              </svg>
              Verified only
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="dir-grid">
          {filtered.length === 0 ? (
            <div className="dir-empty">
              <p>No clinics match your filters.</p>
              <button
                onClick={() => { setActiveCat(null); setCountry(''); setVerifiedOnly(false) }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filtered.map(c => <ClinicCard key={c.id} clinic={c} />)
          )}
        </div>

      </div>
    </div>
  )
}
