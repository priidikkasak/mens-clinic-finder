import Link from 'next/link'
import { Clinic, Category } from '@/lib/types'
import { countryFlag, getCategoryLabel, formatPriceRange } from '@/lib/utils'
import VerifiedBadge from './VerifiedBadge'

interface ClinicCardProps {
  clinic: Clinic
}

export default function ClinicCard({ clinic }: ClinicCardProps) {
  return (
    <Link href={`/clinics/${clinic.slug}`} className="group block h-full">
      <article className={`relative h-full flex flex-col bg-white border transition-all duration-200 group-hover:shadow-[0_12px_40px_rgba(12,28,46,0.10)] group-hover:-translate-y-[3px] rounded-xl overflow-hidden ${
        clinic.premium
          ? 'border-[var(--gold)]'
          : 'border-[var(--border)] group-hover:border-[var(--border-strong)]'
      }`}>

        {/* Premium top bar */}
        {clinic.premium && (
          <div className="h-[3px] bg-gradient-to-r from-[#9E7840] via-[#C9A057] to-[#9E7840] shrink-0" />
        )}

        <div className="flex flex-col gap-0 flex-1">
          {/* Top section: name + price */}
          <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-4">
            <div className="flex flex-col gap-1 min-w-0">
              {clinic.verified && (
                <div className="mb-1">
                  <VerifiedBadge size="sm" />
                </div>
              )}
              <h3 className="font-[family-name:var(--font-syne)] font-bold text-[16px] text-[var(--text-1)] leading-tight tracking-tight group-hover:text-[var(--navy)] transition-colors">
                {clinic.name}
              </h3>
              <p className="text-[12px] text-[var(--text-3)] flex items-center gap-1">
                <span>{countryFlag(clinic.country)}</span>
                <span>{clinic.city}, {clinic.country}</span>
              </p>
            </div>

            {/* Price — hero stat */}
            {clinic.price_min && (
              <div className="text-right shrink-0">
                <p className="font-[family-name:var(--font-syne)] font-bold text-[22px] leading-none text-[var(--text-1)] tabular-nums">
                  €{clinic.price_min.toLocaleString()}
                </p>
                <p className="text-[10px] text-[var(--text-3)] mt-0.5 uppercase tracking-wider">from</p>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="mx-5 border-t border-[var(--border)]" />

          {/* Categories */}
          <div className="px-5 py-3 flex flex-wrap gap-1.5">
            {clinic.categories.map((cat) => (
              <span key={cat} className="text-[11px] font-medium text-[var(--text-2)] uppercase tracking-wide">
                {getCategoryLabel(cat as Category)}
                <span className="text-[var(--border-strong)] ml-1.5">·</span>
              </span>
            )).reduce((acc: React.ReactNode[], el, i, arr) => {
              acc.push(el)
              return acc
            }, []).map((el, i) => <span key={i}>{el}</span>)}
          </div>

          {/* Bottom: rating + CTA */}
          <div className="mt-auto px-5 pb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {clinic.rating ? (
                <>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <svg key={s} width="11" height="11" viewBox="0 0 11 11" fill={s <= Math.round(clinic.rating!) ? 'var(--gold)' : 'var(--border)'}>
                        <path d="M5.5 1l1.09 2.21L9 3.67l-1.75 1.7.41 2.4L5.5 6.7 3.34 7.77l.41-2.4L2 3.67l2.41-.46L5.5 1z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-[12px] font-mono font-semibold text-[var(--text-1)]">{clinic.rating.toFixed(1)}</span>
                  <span className="text-[11px] text-[var(--text-3)]">({clinic.review_count})</span>
                </>
              ) : (
                <span className="text-[12px] text-[var(--text-3)]">No reviews yet</span>
              )}
            </div>

            <span className="text-[12px] font-semibold text-[var(--navy)] flex items-center gap-1 group-hover:gap-2 transition-all">
              View
              <svg width="13" height="13" fill="none" viewBox="0 0 13 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 6.5h8M6.5 3l3.5 3.5L6.5 10"/>
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
