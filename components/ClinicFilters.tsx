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
    setCats([]); setRegion(''); setCountry('');
    setPriceMax(10000); setMinRating(0); setVerified(false)
  }

  return (
    <div className="flex flex-col gap-7">

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-3)]">Filters</p>
        {hasFilters ? (
          <button onClick={clear} className="text-[11px] text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors underline underline-offset-2">
            Clear all
          </button>
        ) : null}
      </div>

      {/* Procedure */}
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-3)]">Procedure</p>
        {getAllCategories().map((cat) => {
          const on = cats.includes(cat)
          return (
            <button
              key={cat}
              onClick={() => toggle(cat)}
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-left text-[12px] font-medium border transition-all ${
                on ? 'bg-[var(--navy)] text-white border-[var(--navy)]'
                   : 'bg-white text-[var(--text-2)] border-[var(--border)] hover:border-[var(--border-strong)] hover:text-[var(--text-1)]'
              }`}
            >
              <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                on ? 'bg-white/20 border-white/40' : 'border-[var(--border-strong)]'
              }`}>
                {on && <svg width="7" height="7" viewBox="0 0 7 7" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3.5l2 2L6 1"/></svg>}
              </span>
              {getCategoryLabel(cat as Category)}
            </button>
          )
        })}
      </div>

      {/* Region */}
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-3)]">Region</p>
        <div className="flex gap-1.5">
          {[['', 'All'], ['EU', 'Europe'], ['World', 'Global']].map(([v, l]) => (
            <button key={v} onClick={() => setRegion(v as string)}
              className={`flex-1 py-2 rounded-lg text-[11px] font-semibold border transition-colors ${
                region === v
                  ? 'bg-[var(--navy)] text-white border-[var(--navy)]'
                  : 'bg-white text-[var(--text-2)] border-[var(--border)] hover:border-[var(--border-strong)]'
              }`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Country */}
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-3)]">Country</p>
        <div className="relative">
          <select value={country} onChange={(e) => setCountry(e.target.value)}
            className="w-full appearance-none bg-white border border-[var(--border)] rounded-lg px-3 py-2.5 text-[12px] text-[var(--text-1)] pr-8 focus:outline-none focus:border-[var(--border-strong)] cursor-pointer transition-colors">
            <option value="">All countries</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-3)]" width="12" height="12" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 4.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Max price */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-3)]">Max budget</p>
          <span className="font-[family-name:var(--font-geist-mono)] text-[12px] font-semibold text-[var(--text-1)]">
            {priceMax >= 10000 ? 'Any' : `€${priceMax.toLocaleString()}`}
          </span>
        </div>
        <input type="range" min={500} max={10000} step={250} value={priceMax}
          onChange={(e) => setPriceMax(parseInt(e.target.value))} className="w-full" />
        <div className="flex justify-between text-[10px] font-mono text-[var(--text-3)]">
          <span>€500</span><span>No limit</span>
        </div>
      </div>

      {/* Rating */}
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-3)]">Min. rating</p>
        <div className="flex gap-1.5">
          {[[0,'Any'],[4.0,'4+'],[4.5,'4.5+']].map(([v,l]) => (
            <button key={String(v)} onClick={() => setMinRating(Number(v))}
              className={`flex-1 py-2 rounded-lg text-[11px] font-semibold border transition-colors ${
                minRating === Number(v)
                  ? 'bg-[var(--navy)] text-white border-[var(--navy)]'
                  : 'bg-white text-[var(--text-2)] border-[var(--border)] hover:border-[var(--border-strong)]'
              }`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Verified */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <p className="text-[12px] font-semibold text-[var(--text-1)]">Verified only</p>
          <p className="text-[10px] text-[var(--text-3)] mt-0.5">Confirmed credentials</p>
        </div>
        <button
          role="switch" aria-checked={verified}
          onClick={() => setVerified(!verified)}
          className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${verified ? 'bg-[var(--navy)]' : 'bg-[var(--surface-3)]'}`}
        >
          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${verified ? 'translate-x-5' : 'translate-x-0.5'}`} />
        </button>
      </div>

    </div>
  )
}
