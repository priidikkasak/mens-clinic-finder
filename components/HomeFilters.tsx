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

  return (
    <div className="flex flex-col gap-6">

      {/* Procedure */}
      <div className="flex flex-col gap-3">
        <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-3)]">
          Procedure
        </label>
        <div className="flex flex-col gap-2">
          {getAllCategories().map((cat) => {
            const on = cats.includes(cat)
            return (
              <button
                key={cat}
                onClick={() => toggleCat(cat)}
                className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-left text-[13px] font-medium border transition-all duration-150 ${
                  on
                    ? 'bg-[var(--navy)] text-white border-[var(--navy)]'
                    : 'bg-white text-[var(--text-2)] border-[var(--border)] hover:border-[var(--border-strong)] hover:text-[var(--text-1)]'
                }`}
              >
                <span>{getCategoryLabel(cat)}</span>
                {on && (
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                    <path d="M2.5 6.5l3 3 5-5" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Country */}
      <div className="flex flex-col gap-3">
        <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-3)]">Country</label>
        <div className="relative">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full appearance-none bg-white border border-[var(--border)] rounded-lg px-4 py-2.5 text-[13px] text-[var(--text-1)] pr-9 focus:outline-none focus:border-[var(--border-strong)] cursor-pointer transition-colors"
          >
            <option value="">Any country</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-3)]" width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5">
            <path d="M3.5 5.5l3.5 3.5 3.5-3.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Min rating */}
      <div className="flex flex-col gap-3">
        <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-3)]">Min. rating</label>
        <div className="flex gap-2">
          {[[0,'Any'],[4,'4.0+'],[4.5,'4.5+']].map(([v,l]) => (
            <button
              key={v}
              onClick={() => setRating(Number(v))}
              className={`flex-1 py-2 rounded-lg text-[12px] font-semibold border transition-colors ${
                rating === Number(v)
                  ? 'bg-[var(--navy)] text-white border-[var(--navy)]'
                  : 'bg-white text-[var(--text-2)] border-[var(--border)] hover:border-[var(--border-strong)]'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-2 pt-2">
        <button
          onClick={find}
          className="w-full py-3.5 rounded-lg bg-[var(--navy)] text-white text-[14px] font-bold tracking-wide hover:opacity-85 transition-opacity flex items-center justify-center gap-2"
        >
          Find clinics
          <svg width="15" height="15" fill="none" viewBox="0 0 15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7.5h9M8.5 3.5L12 7.5l-3.5 4"/>
          </svg>
        </button>
        {(cats.length > 0 || country || rating > 0) && (
          <button
            onClick={() => { setCats([]); setCountry(''); setRating(0) }}
            className="text-[12px] text-[var(--text-3)] hover:text-[var(--text-2)] text-center py-1 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

    </div>
  )
}
