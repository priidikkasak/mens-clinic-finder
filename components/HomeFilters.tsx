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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Procedure */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        <p style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-3)' }}>
          Procedure
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          {getAllCategories().map((cat) => {
            const on = cats.includes(cat)
            return (
              <button
                key={cat}
                onClick={() => toggleCat(cat)}
                className={`filter-cat-btn${on ? ' active' : ''}`}
              >
                <span>{getCategoryLabel(cat as Category)}</span>
                {on && (
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6.5l3 3 6-5.5"/>
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Country */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        <p style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-3)' }}>
          Country
        </p>
        <div style={{ position: 'relative' }}>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{
              width: '100%', appearance: 'none', background: 'white',
              border: '1px solid var(--border)', borderRadius: 8,
              padding: '0.625rem 2.25rem 0.625rem 0.875rem',
              fontSize: 13, color: 'var(--text-1)',
              cursor: 'pointer', outline: 'none',
            }}
          >
            <option value="">Any country</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <svg style={{ pointerEvents: 'none', position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }}
            width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5">
            <path d="M3.5 5.5l3.5 3.5 3.5-3.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Min rating */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        <p style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-3)' }}>
          Min. rating
        </p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {([[0,'Any'],[4,'4.0+'],[4.5,'4.5+']] as const).map(([v, l]) => (
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '0.5rem' }}>
        <button
          onClick={find}
          style={{
            width: '100%', padding: '0.875rem', borderRadius: 8,
            background: 'var(--navy)', color: 'white',
            fontSize: 14, fontWeight: 700, letterSpacing: '0.01em',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Find clinics
          <svg width="15" height="15" fill="none" viewBox="0 0 15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7.5h9M8.5 3.5L12 7.5l-3.5 4"/>
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
