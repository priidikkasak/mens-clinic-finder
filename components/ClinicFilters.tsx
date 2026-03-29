'use client'

import { useQueryState, parseAsArrayOf, parseAsString, parseAsInteger, parseAsFloat, parseAsBoolean } from 'nuqs'
import { getAllCategories, getCategoryLabel } from '@/lib/utils'
import { Category } from '@/lib/types'

export default function ClinicFilters({ countries }: { countries: string[] }) {
  const [cats, setCats] = useQueryState('categories', parseAsArrayOf(parseAsString).withDefault([]))
  const [region, setRegion] = useQueryState('region', parseAsString.withDefault(''))
  const [country, setCountry] = useQueryState('country', parseAsString.withDefault(''))
  const [priceMax, setPriceMax] = useQueryState('priceMax', parseAsInteger.withDefault(10000))
  const [minRating, setMinRating] = useQueryState('minRating', parseAsFloat.withDefault(0))
  const [verified, setVerified] = useQueryState('verifiedOnly', parseAsBoolean.withDefault(false))

  const toggle = (c: string) => setCats(cats.includes(c) ? cats.filter((x) => x !== c) : [...cats, c])
  const hasFilters = cats.length || region || country || priceMax < 10000 || minRating || verified

  function clear() {
    setCats([]); setRegion(''); setCountry('')
    setPriceMax(10000); setMinRating(0); setVerified(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-3)' }}>Filters</p>
        {hasFilters ? (
          <button onClick={clear} style={{ fontSize: 11, color: 'var(--text-3)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 2 }}>
            Clear all
          </button>
        ) : null}
      </div>

      {/* Procedure */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-3)' }}>Procedure</p>
        {getAllCategories().map((cat) => {
          const on = cats.includes(cat)
          return (
            <button
              key={cat}
              onClick={() => toggle(cat)}
              className={`filter-cat-btn${on ? ' active' : ''}`}
            >
              <span>{getCategoryLabel(cat as Category)}</span>
              {on && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6l2.5 2.5 5.5-5"/>
                </svg>
              )}
            </button>
          )
        })}
      </div>

      {/* Region */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-3)' }}>Region</p>
        <div style={{ display: 'flex', gap: '0.375rem' }}>
          {[['', 'All'], ['EU', 'Europe'], ['World', 'Global']].map(([v, l]) => (
            <button key={v} onClick={() => setRegion(v as string)}
              className={`filter-pill-btn${region === v ? ' active' : ''}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Country */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-3)' }}>Country</p>
        <div style={{ position: 'relative' }}>
          <select value={country} onChange={(e) => setCountry(e.target.value)}
            style={{
              width: '100%', appearance: 'none', background: 'white',
              border: '1px solid var(--border)', borderRadius: 8,
              padding: '0.625rem 2.25rem 0.625rem 0.875rem',
              fontSize: 12, color: 'var(--text-1)',
              cursor: 'pointer', outline: 'none',
            }}>
            <option value="">All countries</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <svg style={{ pointerEvents: 'none', position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }}
            width="12" height="12" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 4.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Max price */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-3)' }}>Max budget</p>
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>
            {priceMax >= 10000 ? 'Any' : `€${priceMax.toLocaleString()}`}
          </span>
        </div>
        <input type="range" min={500} max={10000} step={250} value={priceMax}
          onChange={(e) => setPriceMax(parseInt(e.target.value))} style={{ width: '100%' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'var(--font-geist-mono)', color: 'var(--text-3)' }}>
          <span>€500</span><span>No limit</span>
        </div>
      </div>

      {/* Rating */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-3)' }}>Min. rating</p>
        <div style={{ display: 'flex', gap: '0.375rem' }}>
          {([[0,'Any'],[4.0,'4+'],[4.5,'4.5+']] as const).map(([v, l]) => (
            <button key={String(v)} onClick={() => setMinRating(Number(v))}
              className={`filter-pill-btn${minRating === Number(v) ? ' active' : ''}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Verified */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.25rem' }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>Verified only</p>
          <p style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>Confirmed credentials</p>
        </div>
        <button
          role="switch" aria-checked={verified}
          onClick={() => setVerified(!verified)}
          style={{
            position: 'relative', width: 40, height: 20, borderRadius: 9999,
            background: verified ? 'var(--navy)' : 'var(--surface-3)',
            border: 'none', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0,
          }}
        >
          <span style={{
            position: 'absolute', top: 2,
            left: verified ? 22 : 2,
            width: 16, height: 16, borderRadius: '50%',
            background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            transition: 'left 0.2s',
          }} />
        </button>
      </div>

    </div>
  )
}
