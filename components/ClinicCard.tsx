import Link from 'next/link'
import { Clinic, Category } from '@/lib/types'
import { countryFlag, getCategoryLabel } from '@/lib/utils'

export default function ClinicCard({ clinic }: { clinic: Clinic }) {
  const primaryCat = clinic.categories[0]
  const extraCats = clinic.categories.length - 1

  return (
    <Link href={`/clinics/${clinic.slug}`} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>
      <article className="clinic-card">

        {/* Category eyebrow */}
        <p style={{
          fontSize: 9, fontFamily: 'var(--font-geist-mono)', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-3)',
          marginBottom: '1.25rem',
        }}>
          {primaryCat ? getCategoryLabel(primaryCat as Category) : 'Clinic'}
          {extraCats > 0 && <span style={{ opacity: 0.6 }}> +{extraCats}</span>}
        </p>

        {/* Name */}
        <h3 style={{
          fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 20,
          color: 'var(--text-1)', lineHeight: 1.15, letterSpacing: '-0.03em',
          marginBottom: '0.5rem',
        }}>
          {clinic.name}
        </h3>

        {/* Location */}
        <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1 }}>
          {countryFlag(clinic.country)} {clinic.city} · {clinic.country}
        </p>

        {/* Spacer */}
        <div style={{ flex: 1, minHeight: '2rem' }} />

        {/* Bottom */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem',
          paddingTop: '1.25rem', borderTop: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {clinic.rating != null ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} width="10" height="10" viewBox="0 0 10 10"
                      fill={s <= Math.round(clinic.rating!) ? '#C9A057' : 'var(--border)'}>
                      <path d="M5 0.5l1.05 2.13 2.45.47-1.75 1.71.41 2.41L5 6.17 2.84 7.22l.41-2.41L1.5 3.1l2.45-.47L5 .5z"/>
                    </svg>
                  ))}
                </div>
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 12, fontWeight: 700, color: 'var(--text-1)' }}>
                  {clinic.rating.toFixed(1)}
                </span>
                <span style={{ fontSize: 10, color: 'var(--text-3)' }}>({clinic.review_count})</span>
              </div>
            ) : (
              <span style={{ fontSize: 11, color: 'var(--text-3)' }}>No reviews</span>
            )}
            {clinic.verified && (
              <span style={{
                fontSize: 9, fontFamily: 'var(--font-geist-mono)', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--green)',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1.5 4l1.75 1.75L6.5 2"/>
                </svg>
                Verified
              </span>
            )}
          </div>

          {clinic.price_min != null && (
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <p style={{
                fontFamily: 'var(--font-geist-mono)', fontWeight: 700, fontSize: 18,
                color: 'var(--text-1)', lineHeight: 1, letterSpacing: '-0.02em',
              }}>
                €{clinic.price_min.toLocaleString()}
              </p>
              <p style={{ fontSize: 9, color: 'var(--text-3)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.1em' }}>from</p>
            </div>
          )}
        </div>

      </article>
    </Link>
  )
}
