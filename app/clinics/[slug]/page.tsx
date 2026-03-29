import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase-server'
import { Clinic, Category } from '@/lib/types'
import { getCategoryLabel, getCategoryDescription, formatPriceRange, countryFlag } from '@/lib/utils'
import VerifiedBadge from '@/components/VerifiedBadge'
import ClinicCard from '@/components/ClinicCard'

export const revalidate = 86400

interface PageProps { params: Promise<{ slug: string }> }

async function getClinic(slug: string) {
  try {
    const { data } = await createServerClient().from('clinics').select('*').eq('slug', slug).single()
    return data as Clinic | null
  } catch { return null }
}

async function getSimilar(clinic: Clinic) {
  try {
    const { data } = await createServerClient()
      .from('clinics').select('*').neq('slug', clinic.slug)
      .or(`country.eq.${clinic.country},categories.cs.{${clinic.categories[0]}}`).limit(4)
    return (data ?? []) as Clinic[]
  } catch { return [] }
}

export async function generateStaticParams() {
  try {
    const { data } = await createServerClient().from('clinics').select('slug')
    return (data ?? []).map((c: { slug: string }) => ({ slug: c.slug }))
  } catch { return [] }
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 py-5 text-[11px] font-mono text-[var(--text-3)] border-b border-[var(--border)]">
          <Link href="/clinics" className="hover:text-[var(--text-1)] transition-colors">Clinics</Link>
          <span>/</span>
          <span className="text-[var(--text-2)]">{clinic.name}</span>
        </div>

        {/* Hero header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-0 border-b border-[var(--border)]">

          {/* Left: name + details */}
          <div className="py-12 lg:pr-12 lg:border-r border-[var(--border)]">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {clinic.verified && <VerifiedBadge />}
              {clinic.premium && (
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-1 border border-[var(--gold)] text-[var(--gold)] bg-[var(--gold-bg)] rounded">
                  Premium
                </span>
              )}
            </div>

            <h1 className="font-[family-name:var(--font-syne)] font-extrabold text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.03em] text-[var(--text-1)] mb-4">
              {clinic.name}
            </h1>

            <p className="text-[16px] text-[var(--text-2)] mb-6">
              {countryFlag(clinic.country)} {clinic.city}, {clinic.country}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {clinic.categories.map((cat) => (
                <span key={cat} className="text-[10px] font-semibold uppercase tracking-[0.12em] px-3 py-1.5 border border-[var(--border)] rounded-md text-[var(--text-2)] bg-[var(--surface)]">
                  {getCategoryLabel(cat as Category)}
                </span>
              ))}
            </div>
          </div>

          {/* Right: key stats + CTA */}
          <div className="py-12 lg:pl-12 flex flex-col gap-6">

            {/* Price — big display */}
            {clinic.price_min && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-3)] mb-1">Price range</p>
                <p className="font-[family-name:var(--font-syne)] font-extrabold text-[2.8rem] leading-none tracking-tight text-[var(--text-1)]">
                  €{clinic.price_min.toLocaleString()}
                  {clinic.price_max && (
                    <span className="text-[1.6rem] text-[var(--text-3)]"> – €{clinic.price_max.toLocaleString()}</span>
                  )}
                </p>
              </div>
            )}

            {/* Rating */}
            {clinic.rating && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-3)] mb-1">Rating</p>
                <div className="flex items-baseline gap-2">
                  <p className="font-[family-name:var(--font-syne)] font-extrabold text-[2rem] leading-none text-[var(--text-1)]">{clinic.rating.toFixed(1)}</p>
                  <div className="flex gap-0.5 mb-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <svg key={s} width="13" height="13" viewBox="0 0 13 13" fill={s <= Math.round(clinic.rating!) ? 'var(--gold)' : 'var(--border)'}>
                        <path d="M6.5 1.2l1.3 2.6 2.9.42-2.1 2.04.5 2.87L6.5 7.8l-2.6 1.37.5-2.87L2.3 4.22l2.9-.42z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-[12px] text-[var(--text-3)]">({clinic.review_count})</span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 pt-2">
              {clinic.website_url && (
                <a href={clinic.website_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg bg-[var(--navy)] text-white text-[13px] font-bold hover:opacity-85 transition-opacity">
                  Visit website
                  <svg width="12" height="12" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 10L10 2M10 2H5M10 2v5"/>
                  </svg>
                </a>
              )}
              {clinic.contact_url && (
                <a href={clinic.contact_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-3 rounded-lg border border-[var(--border)] text-[var(--text-1)] text-[13px] font-semibold hover:border-[var(--border-strong)] transition-colors">
                  Send enquiry
                </a>
              )}
              {clinic.phone && (
                <a href={`tel:${clinic.phone}`} className="text-[12px] text-[var(--text-3)] hover:text-[var(--text-1)] text-center pt-1 transition-colors">
                  {clinic.phone}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[var(--border)]">
          {[
            { label: 'Languages', value: clinic.languages?.join(', ') ?? '—' },
            { label: 'Founded', value: clinic.founded_year ? String(clinic.founded_year) : '—' },
            { label: 'Region', value: clinic.region === 'EU' ? 'Europe' : 'Worldwide' },
            { label: 'Currency', value: clinic.currency },
          ].map((s) => (
            <div key={s.label} className="py-6 pr-6 border-r border-[var(--border)] last:border-r-0 odd:last:border-r-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--text-3)] mb-1">{s.label}</p>
              <p className="text-[14px] font-semibold text-[var(--text-1)]">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Body content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-0 py-12">
          <div className="flex flex-col gap-12 lg:pr-12 lg:border-r border-[var(--border)]">

            {clinic.description && (
              <section>
                <h2 className="font-[family-name:var(--font-syne)] font-bold text-[20px] tracking-tight text-[var(--text-1)] mb-4">
                  About this clinic
                </h2>
                <p className="text-[15px] text-[var(--text-2)] leading-relaxed">{clinic.description}</p>
              </section>
            )}

            <section>
              <h2 className="font-[family-name:var(--font-syne)] font-bold text-[20px] tracking-tight text-[var(--text-1)] mb-5">
                Services offered
              </h2>
              <div className="flex flex-col divide-y divide-[var(--border)]">
                {clinic.categories.map((cat) => (
                  <div key={cat} className="flex gap-4 py-5 first:pt-0">
                    <div className="w-7 h-7 rounded-md border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="12" height="12" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--navy)]">
                        <path d="M2 6l3 3 5-5"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[14px] text-[var(--text-1)]">{getCategoryLabel(cat as Category)}</p>
                      <p className="text-[13px] text-[var(--text-2)] mt-0.5 leading-relaxed">{getCategoryDescription(cat as Category)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {clinic.address && (
              <section>
                <h2 className="font-[family-name:var(--font-syne)] font-bold text-[20px] tracking-tight text-[var(--text-1)] mb-4">
                  Location
                </h2>
                <p className="text-[14px] text-[var(--text-2)] mb-3">{clinic.address}</p>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(clinic.address)}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--navy)] hover:opacity-70 transition-opacity">
                  Open in Google Maps
                  <svg width="11" height="11" fill="none" viewBox="0 0 11 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 9L9 2M9 2H5M9 2v4"/>
                  </svg>
                </a>
              </section>
            )}
          </div>

          {/* Sidebar — sticky disclaimer */}
          <div className="lg:pl-12 pt-12 lg:pt-0">
            <div className="sticky top-20 flex flex-col gap-4 p-5 bg-[var(--surface)] border border-[var(--border)] rounded-xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-3)]">Important note</p>
              <p className="text-[12px] text-[var(--text-2)] leading-relaxed">
                This directory is for informational purposes only. We do not provide medical advice. Verify credentials directly with the clinic and consult a qualified professional before any procedure.
              </p>
              <div className="border-t border-[var(--border)] pt-4">
                <Link href="/clinics" className="text-[12px] font-semibold text-[var(--navy)] hover:opacity-70 transition-opacity flex items-center gap-1.5">
                  ← Back to all clinics
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Similar clinics */}
        {similar.length > 0 && (
          <section className="border-t border-[var(--border)] py-12">
            <div className="flex items-end justify-between mb-8">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[10px] text-[var(--text-3)] uppercase tracking-widest">Related</span>
                <h2 className="font-[family-name:var(--font-syne)] font-bold text-[22px] tracking-tight text-[var(--text-1)]">Similar clinics</h2>
              </div>
              <Link href="/clinics" className="text-[12px] text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors">View all →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {similar.map((c) => <ClinicCard key={c.id} clinic={c} />)}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
