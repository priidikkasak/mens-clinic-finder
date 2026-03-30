'use client'

import { useState, useMemo } from 'react'
import { Clinic, Category } from '@/lib/types'
import { getAllCategories, getCategoryLabel, countryFlag } from '@/lib/utils'
import ClinicCard from './ClinicCard'

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

  function clear() {
    setActiveCat(null)
    setCountry('')
    setVerifiedOnly(false)
    setSort('rating')
  }

  return (
    <div className="pg-w">
      <div style={{ display: 'flex', gap: 0 }}>

        {/* ── Sidebar ──────────────────────────────────── */}
        <aside style={{
          width: 240, flexShrink: 0,
          borderRight: '1px solid var(--border)',
          paddingRight: '2.5rem',
          paddingTop: '3rem',
          paddingBottom: '3rem',
        }}>
          <div style={{ position: 'sticky', top: 72 }}>

            {hasFilters && (
              <button onClick={clear} style={{
                fontSize: 11, color: 'var(--text-3)', background: 'none', border: 'none',
                cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 5,
                marginBottom: '1.75rem', transition: 'color 0.12s',
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-1)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="2" y1="2" x2="8" y2="8"/><line x1="8" y1="2" x2="2" y2="8"/>
                </svg>
                Clear all filters
              </button>
            )}

            {/* Procedure */}
            <div style={{ marginBottom: '2.25rem' }}>
              <p style={{ fontSize: 9, fontFamily: 'var(--font-geist-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-3)', marginBottom: '0.5rem' }}>Procedure</p>
              <div>
                {getAllCategories().map((cat) => {
                  const on = activeCat === cat
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCat(on ? null : cat)}
                      className={`filter-cat-btn${on ? ' active' : ''}`}
                    >
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
            </div>

            {/* Country */}
            <div style={{ marginBottom: '2.25rem' }}>
              <p style={{ fontSize: 9, fontFamily: 'var(--font-geist-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-3)', marginBottom: '0.5rem' }}>Country</p>
              <div style={{ position: 'relative' }}>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  style={{
                    width: '100%', appearance: 'none', background: 'white',
                    border: '1px solid var(--border)', borderRadius: 6,
                    padding: '0.5625rem 2rem 0.5625rem 0.75rem',
                    fontSize: 12, color: country ? 'var(--text-1)' : 'var(--text-3)',
                    cursor: 'pointer', outline: 'none',
                  }}
                >
                  <option value="">All countries</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{countryFlag(c)} {c}</option>
                  ))}
                </select>
                <svg style={{ pointerEvents: 'none', position: 'absolute', right: 9, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }}
                  width="11" height="11" fill="none" viewBox="0 0 11 11" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2.5 4l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Sort */}
            <div style={{ marginBottom: '2.25rem' }}>
              <p style={{ fontSize: 9, fontFamily: 'var(--font-geist-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-3)', marginBottom: '0.5rem' }}>Sort by</p>
              <div style={{ display: 'flex', gap: '0.375rem' }}>
                {[
                  { v: 'rating', l: 'Top rated' },
                  { v: 'price_asc', l: 'Price ↑' },
                  { v: 'price_desc', l: 'Price ↓' },
                ].map((o) => (
                  <button key={o.v} onClick={() => setSort(o.v)}
                    className={`filter-pill-btn${sort === o.v ? ' active' : ''}`}>
                    {o.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Verified */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>Verified only</p>
                <p style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>Confirmed credentials</p>
              </div>
              <button
                role="switch" aria-checked={verifiedOnly}
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                style={{
                  position: 'relative', width: 38, height: 20, borderRadius: 9999,
                  background: verifiedOnly ? 'var(--navy)' : 'var(--surface-3)',
                  border: 'none', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0,
                }}
              >
                <span style={{
                  position: 'absolute', top: 2,
                  left: verifiedOnly ? 20 : 2,
                  width: 16, height: 16, borderRadius: '50%',
                  background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  transition: 'left 0.2s',
                }} />
              </button>
            </div>

          </div>
        </aside>

        {/* ── Results ──────────────────────────────────── */}
        <div style={{ flex: 1, minWidth: 0, paddingLeft: '3rem', paddingTop: '3rem', paddingBottom: '3rem' }}>

          {/* Results header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border)',
          }}>
            <p style={{ fontSize: 13, color: 'var(--text-2)' }}>
              <strong style={{ fontFamily: 'var(--font-syne)', fontSize: 16, fontWeight: 700, color: 'var(--text-1)' }}>
                {filtered.length}
              </strong>
              {' '}{filtered.length === 1 ? 'clinic' : 'clinics'} found
            </p>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div style={{ padding: '5rem 0', textAlign: 'center' }}>
              <p style={{ fontSize: 15, color: 'var(--text-2)', marginBottom: '0.875rem' }}>No clinics match your filters.</p>
              <button onClick={clear} style={{
                fontSize: 13, color: 'var(--navy)', background: 'none',
                border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0,
              }}>
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1.125rem' }}>
              {filtered.map(c => <ClinicCard key={c.id} clinic={c} />)}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
