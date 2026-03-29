'use client'

import { useQueryState, parseAsArrayOf, parseAsString, parseAsInteger, parseAsFloat, parseAsBoolean } from 'nuqs'
import { getAllCategories, getCategoryLabel } from '@/lib/utils'
import { Category } from '@/lib/types'

interface ClinicFiltersProps {
  countries: string[]
}

export default function ClinicFilters({ countries }: ClinicFiltersProps) {
  const [categories, setCategories] = useQueryState('categories', parseAsArrayOf(parseAsString).withDefault([]))
  const [region, setRegion] = useQueryState('region', parseAsString.withDefault(''))
  const [country, setCountry] = useQueryState('country', parseAsString.withDefault(''))
  const [priceMax, setPriceMax] = useQueryState('priceMax', parseAsInteger.withDefault(10000))
  const [minRating, setMinRating] = useQueryState('minRating', parseAsFloat.withDefault(0))
  const [verifiedOnly, setVerifiedOnly] = useQueryState('verifiedOnly', parseAsBoolean.withDefault(false))

  function toggleCat(cat: string) {
    setCategories(categories.includes(cat) ? categories.filter((c) => c !== cat) : [...categories, cat])
  }

  const hasFilters = categories.length > 0 || region || country || priceMax < 10000 || minRating > 0 || verifiedOnly

  function clearAll() {
    setCategories([])
    setRegion('')
    setCountry('')
    setPriceMax(10000)
    setMinRating(0)
    setVerifiedOnly(false)
  }

  return (
    <aside className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[var(--text-3)]">Filters</p>
        {hasFilters && (
          <button onClick={clearAll} className="text-[12px] text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors underline">
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <div className="flex flex-col gap-2.5">
        <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--text-3)]">Procedure</p>
        {getAllCategories().map((cat) => {
          const active = categories.includes(cat)
          return (
            <button
              key={cat}
              onClick={() => toggleCat(cat)}
              className={`flex items-center gap-2.5 text-left text-[13px] transition-colors px-3 py-2 rounded-lg border ${
                active
                  ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--ink-fg)]'
                  : 'border-[var(--border)] text-[var(--text-2)] hover:border-[var(--border-hover)] hover:text-[var(--text-1)] bg-[var(--surface)]'
              }`}
            >
              <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 ${active ? 'bg-[var(--ink-fg)] border-[var(--ink-fg)]' : 'border-[var(--border-hover)]'}`}>
                {active && (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4l2 2L6.5 2" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              {getCategoryLabel(cat as Category)}
            </button>
          )
        })}
      </div>

      {/* Region */}
      <div className="flex flex-col gap-2.5">
        <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--text-3)]">Region</p>
        <div className="flex gap-2">
          {[['', 'All'], ['EU', 'Europe'], ['World', 'Global']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setRegion(val)}
              className={`flex-1 text-[12px] font-medium py-2 rounded-lg border transition-colors ${
                region === val
                  ? 'bg-[var(--ink)] text-[var(--ink-fg)] border-[var(--ink)]'
                  : 'border-[var(--border)] text-[var(--text-2)] hover:border-[var(--border-hover)] bg-[var(--surface)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Country */}
      <div className="flex flex-col gap-2.5">
        <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--text-3)]">Country</p>
        <div className="relative">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full appearance-none bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-[13px] text-[var(--text-1)] pr-8 focus:outline-none focus:border-[var(--border-hover)] transition-colors cursor-pointer"
          >
            <option value="">All countries</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-3)] pointer-events-none" width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5">
            <path d="M3.5 5.25l3.5 3.5 3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Budget */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--text-3)]">Max budget</p>
          <span className="text-[12px] font-mono text-[var(--text-2)]">€{priceMax.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min={500}
          max={10000}
          step={250}
          value={priceMax}
          onChange={(e) => setPriceMax(parseInt(e.target.value))}
          className="w-full accent-[var(--ink)] h-1.5 rounded-full cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-[var(--text-3)]">
          <span>€500</span><span>€10,000+</span>
        </div>
      </div>

      {/* Min rating */}
      <div className="flex flex-col gap-2.5">
        <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--text-3)]">Minimum rating</p>
        <div className="flex gap-2">
          {[[0, 'Any'], [4.0, '4.0+'], [4.5, '4.5+']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setMinRating(Number(val))}
              className={`flex-1 text-[12px] font-medium py-2 rounded-lg border transition-colors ${
                minRating === val
                  ? 'bg-[var(--ink)] text-[var(--ink-fg)] border-[var(--ink)]'
                  : 'border-[var(--border)] text-[var(--text-2)] hover:border-[var(--border-hover)] bg-[var(--surface)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Verified toggle */}
      <label className="flex items-center justify-between cursor-pointer group">
        <div>
          <p className="text-[13px] font-medium text-[var(--text-1)]">Verified only</p>
          <p className="text-[11px] text-[var(--text-3)] mt-0.5">Clinics with confirmed credentials</p>
        </div>
        <div
          role="switch"
          aria-checked={verifiedOnly}
          onClick={() => setVerifiedOnly(!verifiedOnly)}
          className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer shrink-0 ${
            verifiedOnly ? 'bg-[var(--ink)]' : 'bg-[var(--surface-3)]'
          }`}
        >
          <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${verifiedOnly ? 'translate-x-5' : 'translate-x-1'}`} />
        </div>
      </label>
    </aside>
  )
}
