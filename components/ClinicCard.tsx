import Link from 'next/link'
import { Clinic, Category } from '@/lib/types'
import { countryFlag, getCategoryLabel } from '@/lib/utils'

export default function ClinicCard({ clinic }: { clinic: Clinic }) {
  return (
    <Link href={`/clinics/${clinic.slug}`} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>
      <article className="clinic-card">

        {/* Top: location + verified */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
          <p style={{ fontSize: 11, color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 14 }}>{countryFlag(clinic.country)}</span>
            <span>{clinic.city}, {clinic.country}</span>
          </p>
          {clinic.verified && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontSize: 9, fontFamily: 'var(--font-geist-mono)',
              fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em',
              color: 'var(--green)',
            }}>
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1.5 4.5l2 2L7.5 2"/>
              </svg>
              Verified
            </span>
          )}
          {clinic.premium && !clinic.verified && (
            <span style={{
              fontSize: 9, fontFamily: 'var(--font-geist-mono)', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.12em',
              color: 'var(--gold)', padding: '2px 6px',
              border: '1px solid rgba(158,120,64,0.3)', borderRadius: 3,
            }}>
              Featured
            </span>
          )}
        </div>

        {/* Name + price */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 16,
            color: 'var(--text-1)', lineHeight: 1.25, letterSpacing: '-0.02em', flex: 1,
          }}>
            {clinic.name}
          </h3>
          {clinic.price_min != null && (
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <p style={{
                fontFamily: 'var(--font-geist-mono)', fontWeight: 700, fontSize: 15,
                color: 'var(--text-1)', lineHeight: 1,
              }}>
                €{clinic.price_min.toLocaleString()}
              </p>
              <p style={{ fontSize: 9, color: 'var(--text-3)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.1em' }}>from</p>
            </div>
          )}
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: '1rem' }}>
          {clinic.categories.map((cat) => (
            <span key={cat} style={{
              fontSize: 9, fontFamily: 'var(--font-geist-mono)', fontWeight: 500,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              color: 'var(--text-3)',
              padding: '2px 7px',
              border: '1px solid var(--border)',
              borderRadius: 3,
            }}>
              {getCategoryLabel(cat as Category)}
            </span>
          ))}
        </div>

        {/* Footer: rating + view */}
        <div style={{
          marginTop: 'auto',
          borderTop: '1px solid var(--border)',
          paddingTop: '0.75rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
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
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>
                {clinic.rating.toFixed(1)}
              </span>
              <span style={{ fontSize: 10, color: 'var(--text-3)' }}>({clinic.review_count})</span>
            </div>
          ) : (
            <span style={{ fontSize: 11, color: 'var(--text-3)' }}>No reviews yet</span>
          )}

          <span className="clinic-card-view">
            View clinic
            <svg width="12" height="12" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6h8M5.5 2.5L9 6l-3.5 3.5"/>
            </svg>
          </span>
        </div>

      </article>
    </Link>
  )
}
