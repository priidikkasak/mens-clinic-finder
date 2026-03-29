'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAllCategories, getCategoryLabel } from '@/lib/utils'
import { Category } from '@/lib/types'

const COUNTRIES = [
  'Czech Republic','Estonia','Finland','France','Germany','Hungary','Latvia',
  'Netherlands','Poland','Portugal','Singapore','Spain','Sweden','Switzerland',
  'Thailand','Turkey','UAE','United Kingdom',
]

export default function HomeFilters() {
  const router = useRouter()
  const [cats, setCats] = useState<Category[]>([])
  const [country, setCountry] = useState('')
  const [rating, setRating] = useState(0)

  function toggleCat(c: Category) {
    setCats((p) => p.includes(c) ? p.filter((x) => x !== c) : [...p, c])
  }

  function find() {
    const p = new URLSearchParams()
    if (cats.length) p.set('categories', cats.join(','))
    if (country) p.set('country', country)
    if (rating) p.set('minRating', String(rating))
    router.push(`/clinics?${p.toString()}`)
  }

  const hasFilters = cats.length > 0 || country || rating > 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Procedure */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <p style={{ fontSize: 9, fontFamily: 'var(--font-geist-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-3)', marginBottom: '0.5rem' }}>
          Procedure
        </p>
        <div>
          {getAllCategories().map((cat) => {
            const on = cats.includes(cat)
            return (
              <button
                key={cat}
                onClick={() => toggleCat(cat)}
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p style={{ fontSize: 9, fontFamily: 'var(--font-geist-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-3)' }}>
          Country
        </p>
        <div style={{ position: 'relative' }}>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{
              width: '100%', appearance: 'none', background: 'white',
              border: '1px solid var(--border)', borderRadius: 6,
              padding: '0.625rem 2.25rem 0.625rem 0.875rem',
              fontSize: 13, color: country ? 'var(--text-1)' : 'var(--text-3)',
              cursor: 'pointer', outline: 'none',
            }}
          >
            <option value="">Any country</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <svg style={{ pointerEvents: 'none', position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }}
            width="12" height="12" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 4.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Min rating */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p style={{ fontSize: 9, fontFamily: 'var(--font-geist-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-3)' }}>
          Min. rating
        </p>
        <div style={{ display: 'flex', gap: '0.375rem' }}>
          {([[0, 'Any'], [4, '4.0+'], [4.5, '4.5+']] as const).map(([v, l]) => (
            <button
              key={String(v)}
              onClick={() => setRating(Number(v))}
              className={`filter-pill-btn${rating === Number(v) ? ' active' : ''}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button
          onClick={find}
          style={{
            width: '100%', padding: '0.875rem', borderRadius: 6,
            background: 'var(--navy)', color: 'white',
            fontSize: 13, fontWeight: 700, letterSpacing: '0.04em',
            textTransform: 'uppercase',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Find clinics
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"/>
          </svg>
        </button>
        {hasFilters && (
          <button
            onClick={() => { setCats([]); setCountry(''); setRating(0) }}
            style={{ fontSize: 12, color: 'var(--text-3)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', transition: 'color 0.15s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-2)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
          >
            Clear filters
          </button>
        )}
      </div>

    </div>
  )
}
