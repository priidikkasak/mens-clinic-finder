import Link from 'next/link'
import { Clinic } from '@/lib/types'
import { countryFlag } from '@/lib/utils'
import CategoryPill from './CategoryPill'
import RatingStars from './RatingStars'
import PriceRange from './PriceRange'
import VerifiedBadge from './VerifiedBadge'
import { Category } from '@/lib/types'

interface ClinicCardProps {
  clinic: Clinic
}

export default function ClinicCard({ clinic }: ClinicCardProps) {
  return (
    <Link href={`/clinics/${clinic.slug}`} className="group block">
      <article
        className={`relative h-full flex flex-col bg-[var(--surface)] rounded-xl border transition-all duration-200 group-hover:shadow-[0_8px_30px_rgba(23,20,13,0.08)] group-hover:border-[var(--border-hover)] group-hover:-translate-y-0.5 ${
          clinic.premium
            ? 'border-[var(--gold-border)] shadow-[inset_0_2px_0_0_var(--gold)]'
            : 'border-[var(--border)]'
        }`}
      >
        {clinic.premium && (
          <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl bg-gradient-to-r from-[var(--gold)] via-[#D4AA78] to-[var(--gold)]" />
        )}

        <div className="p-5 flex flex-col gap-4 flex-1">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-[15px] text-[var(--text-1)] leading-snug group-hover:text-[var(--ink)] transition-colors">
                {clinic.name}
              </h3>
              <p className="text-[13px] text-[var(--text-2)] mt-0.5">
                {countryFlag(clinic.country)} {clinic.city}, {clinic.country}
              </p>
            </div>
            {clinic.verified && <VerifiedBadge size="sm" />}
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5">
            {clinic.categories.map((cat) => (
              <CategoryPill key={cat} category={cat as Category} small />
            ))}
          </div>

          {/* Stats */}
          <div className="mt-auto flex flex-col gap-2 pt-3 border-t border-[var(--border)]">
            <PriceRange min={clinic.price_min} max={clinic.price_max} currency={clinic.currency} className="text-[14px]" />
            <RatingStars rating={clinic.rating} reviewCount={clinic.review_count} size="sm" />
          </div>
        </div>

        {/* CTA footer */}
        <div className="px-5 pb-5">
          <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--text-2)] group-hover:text-[var(--text-1)] transition-colors">
            View clinic
            <svg width="12" height="12" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5" className="transform group-hover:translate-x-0.5 transition-transform" aria-hidden>
              <path d="M2.5 6h7M6.5 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  )
}
