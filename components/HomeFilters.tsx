'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAllCategories, getCategoryLabel } from '@/lib/utils'
import { Category } from '@/lib/types'

const COUNTRIES = [
  'United Kingdom', 'Germany', 'France', 'Poland', 'Czech Republic', 'Hungary',
  'Turkey', 'Thailand', 'UAE', 'Netherlands', 'Spain', 'Portugal', 'Estonia',
  'Sweden', 'Finland', 'Latvia', 'Switzerland', 'Singapore',
]

export default function HomeFilters() {
  const router = useRouter()
  const [selectedCats, setSelectedCats] = useState<Category[]>([])
  const [country, setCountry] = useState('')

  function toggleCat(cat: Category) {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  function handleFind() {
    const params = new URLSearchParams()
    if (selectedCats.length) params.set('categories', selectedCats.join(','))
    if (country) params.set('country', country)
    router.push(`/clinics?${params.toString()}`)
  }

  return (
    <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-[0_4px_40px_rgba(23,20,13,0.06)] overflow-hidden">
      {/* Category section */}
      <div className="p-6 pb-5 border-b border-[var(--border)]">
        <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--text-3)] mb-4">
          What are you looking for?
        </p>
        <div className="flex flex-wrap gap-2">
          {getAllCategories().map((cat) => {
            const active = selectedCats.includes(cat)
            return (
              <button
                key={cat}
                onClick={() => toggleCat(cat)}
                className={`text-[13px] font-medium px-4 py-2 rounded-lg border transition-all duration-150 ${
                  active
                    ? 'bg-[var(--ink)] text-[var(--ink-fg)] border-[var(--ink)]'
                    : 'bg-[var(--bg)] text-[var(--text-2)] border-[var(--border)] hover:border-[var(--border-hover)] hover:text-[var(--text-1)]'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            )
          })}
        </div>
      </div>

      {/* Filters + CTA row */}
      <div className="p-6 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <label className="sr-only">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full appearance-none bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3 text-[14px] text-[var(--text-1)] pr-10 focus:outline-none focus:border-[var(--border-hover)] transition-colors cursor-pointer"
          >
            <option value="">Any country</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-3)] pointer-events-none" width="16" height="16" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <button
          onClick={handleFind}
          className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-[var(--ink)] text-[var(--ink-fg)] text-[14px] font-semibold hover:opacity-85 transition-opacity whitespace-nowrap"
        >
          Find clinics
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {selectedCats.length > 0 && (
        <div className="px-6 pb-4 -mt-2">
          <p className="text-[12px] text-[var(--text-3)]">
            {selectedCats.length} category{selectedCats.length > 1 ? 'ies' : ''} selected
            <button onClick={() => setSelectedCats([])} className="ml-2 underline hover:text-[var(--text-2)] transition-colors">
              Clear
            </button>
          </p>
        </div>
      )}
    </div>
  )
}
