import Link from 'next/link'
import { Clinic, Category } from '@/lib/types'
import { countryFlag, getCategoryLabel } from '@/lib/utils'

export default function ClinicCard({ clinic }: { clinic: Clinic }) {
  const primaryCat = clinic.categories[0]
  const extraCats = clinic.categories.length - 1

  return (
    <Link href={`/clinics/${clinic.slug}`} className="card-link" style={{ display: 'block', height: '100%', textDecoration: 'none' }}>
      <article className={`clinic-card${clinic.premium ? ' clinic-card--premium' : ''}`}>

        {/* Top row */}
        <div className="card-top">
          <span className="card-cat-chip">
            {primaryCat ? getCategoryLabel(primaryCat as Category) : 'Clinic'}
            {extraCats > 0 && <span style={{ opacity: 0.6 }}> +{extraCats}</span>}
          </span>
          {clinic.premium
            ? <span className="card-premium-badge">Premium ↗</span>
            : <span className="card-view-arrow">→</span>
          }
        </div>

        {/* Name */}
        <h3 className="card-name">{clinic.name}</h3>

        {/* Location */}
        <p className="card-location">
          {countryFlag(clinic.country)} {clinic.city} · {clinic.country}
        </p>

        {/* Description */}
        {clinic.description && (
          <p className="card-description">{clinic.description}</p>
        )}

        {/* Spacer */}
        <div style={{ flex: 1, minHeight: '1rem' }} />

        {/* Footer */}
        <div className="card-footer">
          <div className="card-meta">
            {clinic.rating != null ? (
              <div className="card-rating">
                <div className="card-stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} width="10" height="10" viewBox="0 0 10 10"
                      fill={s <= Math.round(clinic.rating!) ? '#C9A057' : 'var(--border)'}>
                      <path d="M5 0.5l1.05 2.13 2.45.47-1.75 1.71.41 2.41L5 6.17 2.84 7.22l.41-2.41L1.5 3.1l2.45-.47L5 .5z"/>
                    </svg>
                  ))}
                </div>
                <span className="card-rating-n">{clinic.rating.toFixed(1)}</span>
                <span className="card-rating-ct">({clinic.review_count})</span>
              </div>
            ) : (
              <span className="card-no-reviews">No reviews yet</span>
            )}

            {clinic.verified && (
              <span className="card-verified">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1.5 4l1.75 1.75L6.5 2"/>
                </svg>
                Verified
              </span>
            )}
          </div>

          {clinic.price_min != null && (
            <div className="card-price">
              <span className="card-price-n">€{clinic.price_min.toLocaleString()}</span>
              <span className="card-price-label">from</span>
            </div>
          )}
        </div>

      </article>
    </Link>
  )
}
