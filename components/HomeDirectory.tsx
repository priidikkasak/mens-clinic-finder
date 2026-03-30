'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { Clinic, Category } from '@/lib/types'
import { getAllCategories, getCategoryLabel, countryFlag } from '@/lib/utils'
import ClinicCard from './ClinicCard'

const PAGE_SIZE = 10

export default function HomeDirectory({ clinics }: { clinics: Clinic[] }) {
  const [activeCat, setActiveCat] = useState<Category | null>(null)
  const [country, setCountry] = useState('')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [priceMax, setPriceMax] = useState(5000)
  const [page, setPage] = useState(1)
  const resultsRef = useRef<HTMLDivElement>(null)

  const countries = useMemo(() =>
    [...new Set(clinics.map(c => c.country))].sort(),
    [clinics]
  )

  const filteredAll = useMemo(() => {
    let r = [...clinics]
    if (activeCat) r = r.filter(c => c.categories.includes(activeCat))
    if (country) r = r.filter(c => c.country === country)
    if (verifiedOnly) r = r.filter(c => c.verified)
    if (priceMax < 5000) r = r.filter(c => c.price_min !== null && c.price_min <= priceMax)
    r.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    return r
  }, [clinics, activeCat, country, verifiedOnly, priceMax])

  useEffect(() => { setPage(1) }, [filteredAll])

  const totalPages = Math.ceil(filteredAll.length / PAGE_SIZE)
  const paginated = filteredAll.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const showFrom = filteredAll.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const showTo = Math.min(page * PAGE_SIZE, filteredAll.length)
  const hasFilters = activeCat !== null || country !== '' || verifiedOnly || priceMax < 5000

  function clear() {
    setActiveCat(null); setCountry('')
    setVerifiedOnly(false); setPriceMax(5000)
  }

  function scrollToResults() {
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="pg-w" ref={resultsRef}>
      <div style={{ paddingTop: '3rem' }}>

        {/* ── Clear filter strip — fixed height so layout never jumps ── */}
        <div style={{ height: '2.25rem', display: 'flex', alignItems: 'center' }}>
          <button
            onClick={clear}
            className="filter-clear-btn"
            style={{ margin: 0, visibility: hasFilters ? 'visible' : 'hidden' }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="2" y1="2" x2="8" y2="8"/><line x1="8" y1="2" x2="2" y2="8"/>
            </svg>
            Clear all filters
          </button>
        </div>

        {/* ── Body ── */}
        <div style={{ display: 'flex', borderTop: '1px solid var(--border)' }}>

          {/* Sidebar */}
          <aside style={{
            width: 240, flexShrink: 0,
            borderRight: '1px solid var(--border)',
            paddingRight: '2.5rem',
            paddingTop: '2rem',
            paddingBottom: '4rem',
          }}>

            {/* Procedure */}
            <div className="filter-group">
              <p className="filter-group-label">Procedure</p>
              {getAllCategories().map((cat) => {
                const on = activeCat === cat
                return (
                  <button key={cat} onClick={() => setActiveCat(on ? null : cat)}
                    className={`filter-cat-btn${on ? ' active' : ''}`}>
                    <span className="filter-check">
                      {on && (
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1.5 4.5l2 2L7.5 2"/>
                        </svg>
                      )}
                    </span>
                    <span>{getCategoryLabel(cat as Category)}</span>
                  </button>
                )
              })}
            </div>

            {/* Country */}
            <div className="filter-group">
              <p className="filter-group-label">Country</p>
              <div style={{ position: 'relative' }}>
                <select value={country} onChange={e => setCountry(e.target.value)}
                  style={{
                    width: '100%', appearance: 'none', background: 'white',
                    border: '1px solid var(--border)', borderRadius: 6,
                    padding: '0.5625rem 2rem 0.5625rem 0.75rem',
                    fontSize: 12, color: country ? 'var(--text-1)' : 'var(--text-3)',
                    cursor: 'pointer', outline: 'none',
                  }}>
                  <option value="">All countries</option>
                  {countries.map(c => <option key={c} value={c}>{countryFlag(c)} {c}</option>)}
                </select>
                <svg style={{ pointerEvents: 'none', position: 'absolute', right: 9, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }}
                  width="11" height="11" fill="none" viewBox="0 0 11 11" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2.5 4l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Max budget */}
            <div className="filter-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                <p className="filter-group-label" style={{ marginBottom: 0 }}>Max budget</p>
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>
                  {priceMax >= 5000 ? 'Any' : `€${priceMax.toLocaleString()}`}
                </span>
              </div>
              <input type="range" min={250} max={5000} step={250} value={priceMax}
                onChange={e => setPriceMax(parseInt(e.target.value))} style={{ width: '100%' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'var(--font-geist-mono)', color: 'var(--text-3)', marginTop: '0.375rem' }}>
                <span>€250</span><span>No limit</span>
              </div>
            </div>

            {/* Verified */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.125rem' }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>Verified only</p>
                <p style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>Confirmed credentials</p>
              </div>
              <button role="switch" aria-checked={verifiedOnly} onClick={() => setVerifiedOnly(!verifiedOnly)}
                style={{
                  position: 'relative', width: 38, height: 20, borderRadius: 9999,
                  background: verifiedOnly ? 'var(--navy)' : 'var(--surface-3)',
                  border: 'none', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0,
                }}>
                <span style={{
                  position: 'absolute', top: 2, left: verifiedOnly ? 20 : 2,
                  width: 16, height: 16, borderRadius: '50%',
                  background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  transition: 'left 0.2s',
                }} />
              </button>
            </div>

          </aside>

          {/* Results */}
          <div style={{ flex: 1, minWidth: 0, paddingLeft: '3rem', paddingTop: '2rem', paddingBottom: '4rem' }}>

            {/* Count — aligned with "Procedure" label */}
            <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: '1.5rem' }}>
              {filteredAll.length === 0 ? (
                'No clinics found'
              ) : (
                <>
                  Showing{' '}
                  <strong style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>
                    {showFrom}–{showTo}
                  </strong>
                  {' '}of{' '}
                  <strong style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>
                    {filteredAll.length}
                  </strong>
                  {' '}{filteredAll.length === 1 ? 'clinic' : 'clinics'}
                </>
              )}
            </p>

            {/* Grid */}
            {filteredAll.length === 0 ? (
              <div style={{ padding: '5rem 0', textAlign: 'center' }}>
                <p style={{ fontSize: 15, color: 'var(--text-2)', marginBottom: '0.875rem' }}>No clinics match your filters.</p>
                <button onClick={clear} style={{
                  fontSize: 13, color: 'var(--navy)', background: 'none',
                  border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0,
                }}>Clear all filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1.125rem' }}>
                {paginated.map(c => <ClinicCard key={c.id} clinic={c} />)}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '0.75rem', marginTop: '2.5rem', paddingTop: '2rem',
                borderTop: '1px solid var(--border)',
              }}>
                <button
                  onClick={() => { setPage(p => p - 1); scrollToResults() }}
                  disabled={page <= 1}
                  className="pagination-btn"
                >
                  ← Prev
                </button>
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 13, color: 'var(--text-2)', minWidth: '5rem', textAlign: 'center' }}>
                  {page} <span style={{ color: 'var(--text-3)' }}>/ {totalPages}</span>
                </span>
                <button
                  onClick={() => { setPage(p => p + 1); scrollToResults() }}
                  disabled={page >= totalPages}
                  className="pagination-btn"
                >
                  Next →
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
