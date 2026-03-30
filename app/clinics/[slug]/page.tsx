import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase-server'
import { Clinic, Category } from '@/lib/types'
import { MOCK_CLINICS } from '@/lib/mock-clinics'
import { getCategoryLabel, getCategoryDescription, formatPriceRange, countryFlag } from '@/lib/utils'
import VerifiedBadge from '@/components/VerifiedBadge'
import ClinicCard from '@/components/ClinicCard'
import ScrollToTop from '@/components/ScrollToTop'

export const revalidate = 86400

interface PageProps { params: Promise<{ slug: string }> }

async function getClinic(slug: string): Promise<Clinic | null> {
  try {
    const { data } = await createServerClient().from('clinics').select('*').eq('slug', slug).single()
    if (data) return data as Clinic
    throw new Error('not found')
  } catch {
    return MOCK_CLINICS.find(c => c.slug === slug) ?? null
  }
}

async function getSimilar(clinic: Clinic): Promise<Clinic[]> {
  try {
    const { data } = await createServerClient()
      .from('clinics').select('*').neq('slug', clinic.slug)
      .or(`country.eq.${clinic.country},categories.cs.{${clinic.categories[0]}}`).limit(4)
    if (data && data.length > 0) return data as Clinic[]
    throw new Error('empty')
  } catch {
    return MOCK_CLINICS
      .filter(c => c.slug !== clinic.slug && (
        c.country === clinic.country || c.categories.some(cat => clinic.categories.includes(cat))
      ))
      .slice(0, 4)
  }
}

export async function generateStaticParams() {
  try {
    const { data } = await createServerClient().from('clinics').select('slug')
    return (data ?? []).map((c: { slug: string }) => ({ slug: c.slug }))
  } catch {
    return MOCK_CLINICS.map(c => ({ slug: c.slug }))
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const c = await getClinic(slug)
  if (!c) return {}
  const desc = `${c.name} in ${c.city} — ${c.categories.map(getCategoryLabel).join(', ')}. ${c.price_min ? `From €${c.price_min.toLocaleString()}. ` : ''}${c.rating ? `Rated ${c.rating}/5.` : ''}`
  return {
    title: `${c.name} — Men's Health in ${c.city}`,
    description: desc,
    openGraph: { title: `${c.name} — ${c.city}`, description: desc },
  }
}

export default async function ClinicPage({ params }: PageProps) {
  const { slug } = await params
  const clinic = await getClinic(slug)
  if (!clinic) notFound()

  const similar = await getSimilar(clinic)

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'MedicalClinic',
    name: clinic.name,
    address: { '@type': 'PostalAddress', streetAddress: clinic.address ?? undefined, addressLocality: clinic.city, addressCountry: clinic.country },
    priceRange: clinic.price_min ? formatPriceRange(clinic.price_min, clinic.price_max, clinic.currency) : undefined,
    telephone: clinic.phone ?? undefined, url: clinic.website_url ?? undefined,
    aggregateRating: clinic.rating ? { '@type': 'AggregateRating', ratingValue: clinic.rating, reviewCount: clinic.review_count } : undefined,
  }

  return (
    <>
      <ScrollToTop />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="pg">

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '1.25rem 0', borderBottom: '1px solid var(--border)', fontSize: 11, fontFamily: 'var(--font-geist-mono)', color: 'var(--text-3)' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-3)' }}>All clinics</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-2)' }}>{clinic.name}</span>
        </div>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]" style={{ gap: 0, borderBottom: '1px solid var(--border)' }}>

          {/* Left */}
          <div className="clinic-hdr-left" style={{ padding: '2.5rem 0', paddingRight: '2.5rem', borderRight: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1.25rem' }}>
              {clinic.verified && <VerifiedBadge />}
              {clinic.premium && (
                <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', padding: '3px 8px', border: '1px solid var(--gold)', color: 'var(--gold)', background: 'var(--gold-bg)', borderRadius: 4 }}>
                  Premium
                </span>
              )}
            </div>

            <h1 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--text-1)', marginBottom: '0.875rem' }}>
              {clinic.name}
            </h1>

            <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: '1.25rem' }}>
              {countryFlag(clinic.country)} {clinic.city}, {clinic.country}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {clinic.categories.map((cat) => (
                <span key={cat} style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 10px', border: '1px solid var(--border)', borderRadius: 4, color: 'var(--text-2)', background: 'var(--surface)' }}>
                  {getCategoryLabel(cat as Category)}
                </span>
              ))}
            </div>
          </div>

          {/* Right — price + CTA */}
          <div className="clinic-hdr-right" style={{ padding: '2.5rem 0', paddingLeft: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {clinic.price_min && (
              <div>
                <p style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-3)', marginBottom: 6 }}>Price range</p>
                <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '2.25rem', lineHeight: 1, color: 'var(--text-1)' }}>
                  €{clinic.price_min.toLocaleString()}
                  {clinic.price_max && (
                    <span style={{ fontSize: '1.4rem', color: 'var(--text-3)' }}> – €{clinic.price_max.toLocaleString()}</span>
                  )}
                </p>
              </div>
            )}

            {clinic.rating && (
              <div>
                <p style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-3)', marginBottom: 6 }}>Rating</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '1.75rem', lineHeight: 1, color: 'var(--text-1)' }}>{clinic.rating.toFixed(1)}</p>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[1,2,3,4,5].map((s) => (
                      <svg key={s} width="12" height="12" viewBox="0 0 12 12" fill={s <= Math.round(clinic.rating!) ? 'var(--gold)' : 'var(--border)'}>
                        <path d="M6 1l1.2 2.4 2.7.4-1.95 1.9.46 2.7L6 7.2 3.59 8.4l.46-2.7L2.1 3.8l2.7-.4z"/>
                      </svg>
                    ))}
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-3)' }}>({clinic.review_count})</span>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {clinic.website_url && (
                <a href={clinic.website_url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0.75rem', borderRadius: 8, background: 'var(--navy)', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                  Visit website
                  <svg width="11" height="11" fill="none" viewBox="0 0 11 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 9L9 2M9 2H5M9 2v4"/>
                  </svg>
                </a>
              )}
              {clinic.contact_url && (
                <a href={clinic.contact_url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.625rem', borderRadius: 8, border: '1px solid var(--border)', color: 'var(--text-1)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                  Send enquiry
                </a>
              )}
              {clinic.phone && (
                <a href={`tel:${clinic.phone}`} style={{ fontSize: 12, color: 'var(--text-3)', textAlign: 'center', textDecoration: 'none', paddingTop: 4 }}>
                  {clinic.phone}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderBottom: '1px solid var(--border)' }}>
          {[
            { label: 'Languages', value: clinic.languages?.join(', ') ?? '—' },
            { label: 'Founded', value: clinic.founded_year ? String(clinic.founded_year) : '—' },
            { label: 'Region', value: clinic.region === 'EU' ? 'Europe' : 'Worldwide' },
            { label: 'Currency', value: clinic.currency },
          ].map((s, i) => (
            <div key={s.label} style={{ padding: '1.25rem 0', paddingRight: '1.5rem', borderRight: i < 3 ? '1px solid var(--border)' : 'none', paddingLeft: i > 0 ? '1.5rem' : 0 }}>
              <p style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-3)', marginBottom: 4 }}>{s.label}</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px]" style={{ gap: 0, paddingTop: '3rem', paddingBottom: '3rem' }}>
          <div className="clinic-body-main" style={{ paddingRight: '3rem', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

            {clinic.description && (
              <section>
                <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 18, color: 'var(--text-1)', marginBottom: '0.875rem', letterSpacing: '-0.01em' }}>About this clinic</h2>
                <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7 }}>{clinic.description}</p>
              </section>
            )}

            <section>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 18, color: 'var(--text-1)', marginBottom: '1rem', letterSpacing: '-0.01em' }}>Services offered</h2>
              <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border)' }}>
                {clinic.categories.map((cat) => (
                  <div key={cat} style={{ display: 'flex', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <svg width="11" height="11" fill="none" viewBox="0 0 11 11" stroke="var(--navy)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1.5 5.5l2.5 2.5 5.5-5.5"/>
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-1)', marginBottom: 3 }}>{getCategoryLabel(cat as Category)}</p>
                      <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>{getCategoryDescription(cat as Category)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {clinic.address && (
              <section>
                <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 18, color: 'var(--text-1)', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>Location</h2>
                <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: '0.75rem' }}>{clinic.address}</p>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(clinic.address)}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: 'var(--navy)', textDecoration: 'none' }}>
                  Open in Google Maps
                  <svg width="10" height="10" fill="none" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1.5 8.5L8.5 1.5M8.5 1.5H4.5M8.5 1.5v4"/>
                  </svg>
                </a>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="clinic-body-sidebar" style={{ paddingLeft: '2.5rem' }}>
            <div style={{ position: 'sticky', top: 80, padding: '1.25rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }}>
              <p style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-3)', marginBottom: '0.75rem' }}>Important note</p>
              <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.65, marginBottom: '1rem' }}>
                This directory is for informational purposes only. We do not provide medical advice. Verify credentials directly with the clinic before any procedure.
              </p>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                <Link href="/#directory" style={{ fontSize: 12, fontWeight: 600, color: 'var(--navy)', textDecoration: 'none' }}>
                  ← Back to all clinics
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <section style={{ borderTop: '1px solid var(--border)', paddingTop: '2.5rem', paddingBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 18, color: 'var(--text-1)', letterSpacing: '-0.01em' }}>Similar clinics</h2>
              <Link href="/" style={{ fontSize: 12, color: 'var(--text-3)', textDecoration: 'none' }}>View all →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '1rem' }}>
              {similar.map((c) => <ClinicCard key={c.id} clinic={c} />)}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
