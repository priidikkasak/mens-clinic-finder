import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase-server'
import { Clinic, Category } from '@/lib/types'
import { getCategoryLabel, getCategoryDescription, formatPriceRange, countryFlag } from '@/lib/utils'
import CategoryPill from '@/components/CategoryPill'
import RatingStars from '@/components/RatingStars'
import VerifiedBadge from '@/components/VerifiedBadge'
import ClinicCard from '@/components/ClinicCard'

export const revalidate = 86400

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getClinic(slug: string) {
  try {
    const supabase = createServerClient()
    const { data } = await supabase.from('clinics').select('*').eq('slug', slug).single()
    return data as Clinic | null
  } catch {
    return null
  }
}

async function getSimilarClinics(clinic: Clinic) {
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('clinics').select('*').neq('slug', clinic.slug)
      .or(`country.eq.${clinic.country},categories.cs.{${clinic.categories[0]}}`).limit(4)
    return (data ?? []) as Clinic[]
  } catch {
    return []
  }
}

export async function generateStaticParams() {
  try {
    const supabase = createServerClient()
    const { data } = await supabase.from('clinics').select('slug')
    return (data ?? []).map((c: { slug: string }) => ({ slug: c.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const clinic = await getClinic(slug)
  if (!clinic) return {}
  const description = `${clinic.name} in ${clinic.city} — ${clinic.categories.map(getCategoryLabel).join(', ')}. ${clinic.price_min ? `Prices from €${clinic.price_min.toLocaleString()}. ` : ''}${clinic.rating ? `Rated ${clinic.rating}/5. ` : ''}Compare and contact directly.`
  return {
    title: `${clinic.name} — Men's Health Clinic in ${clinic.city}`,
    description,
    openGraph: { title: `${clinic.name} — ${clinic.city}`, description, type: 'website' },
  }
}

export default async function ClinicPage({ params }: PageProps) {
  const { slug } = await params
  const clinic = await getClinic(slug)
  if (!clinic) notFound()

  const similarClinics = await getSimilarClinics(clinic)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: clinic.name,
    address: { '@type': 'PostalAddress', streetAddress: clinic.address ?? undefined, addressLocality: clinic.city, addressCountry: clinic.country },
    priceRange: clinic.price_min ? formatPriceRange(clinic.price_min, clinic.price_max, clinic.currency) : undefined,
    telephone: clinic.phone ?? undefined,
    url: clinic.website_url ?? undefined,
    aggregateRating: clinic.rating ? { '@type': 'AggregateRating', ratingValue: clinic.rating, reviewCount: clinic.review_count } : undefined,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] text-[var(--text-3)] mb-8">
          <Link href="/clinics" className="hover:text-[var(--text-2)] transition-colors">Clinics</Link>
          <span>/</span>
          <span className="text-[var(--text-2)]">{clinic.name}</span>
        </nav>

        {/* Header */}
        <header className="pb-8 mb-8 border-b border-[var(--border)]">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {clinic.verified && <VerifiedBadge />}
            {clinic.premium && (
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full border border-[var(--gold-border)] text-[var(--gold)] bg-[var(--gold-light)]">
                Premium
              </span>
            )}
          </div>

          <h1 className="text-[32px] md:text-[42px] font-semibold text-[var(--text-1)] tracking-tight leading-tight mb-3">
            {clinic.name}
          </h1>
          <p className="text-[17px] text-[var(--text-2)] mb-5">
            {countryFlag(clinic.country)} {clinic.city}, {clinic.country}
          </p>
          <div className="flex flex-wrap gap-2">
            {clinic.categories.map((cat) => (
              <CategoryPill key={cat} category={cat as Category} />
            ))}
          </div>
        </header>

        {/* Key stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {[
            {
              label: 'Price range',
              value: formatPriceRange(clinic.price_min, clinic.price_max, clinic.currency),
              mono: true,
            },
            {
              label: 'Rating',
              value: clinic.rating ? `${clinic.rating}/5` : 'No reviews',
              sub: clinic.review_count ? `${clinic.review_count} reviews` : undefined,
              mono: true,
            },
            {
              label: 'Languages',
              value: clinic.languages?.slice(0, 2).join(', ') ?? 'On request',
              sub: (clinic.languages?.length ?? 0) > 2 ? `+${(clinic.languages?.length ?? 0) - 2} more` : undefined,
            },
            {
              label: 'Founded',
              value: clinic.founded_year ? String(clinic.founded_year) : '—',
              mono: true,
            },
          ].map((s) => (
            <div key={s.label} className="p-4 bg-[var(--surface)] rounded-xl border border-[var(--border)] flex flex-col gap-1">
              <p className="text-[10px] uppercase tracking-[0.14em] font-medium text-[var(--text-3)]">{s.label}</p>
              <p className={`text-[15px] font-semibold text-[var(--text-1)] ${s.mono ? 'font-mono' : ''}`}>{s.value}</p>
              {s.sub && <p className="text-[11px] text-[var(--text-3)]">{s.sub}</p>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          <div className="flex flex-col gap-12">

            {/* Description */}
            {clinic.description && (
              <section>
                <h2 className="text-[20px] font-semibold text-[var(--text-1)] mb-4">About this clinic</h2>
                <p className="text-[15px] text-[var(--text-2)] leading-relaxed">{clinic.description}</p>
              </section>
            )}

            {/* Services */}
            <section>
              <h2 className="text-[20px] font-semibold text-[var(--text-1)] mb-4">Services offered</h2>
              <div className="flex flex-col gap-3">
                {clinic.categories.map((cat) => (
                  <div key={cat} className="flex gap-4 p-5 bg-[var(--surface)] rounded-xl border border-[var(--border)]">
                    <div className="w-8 h-8 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center shrink-0">
                      <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-2)]">
                        <path d="M2 7l4 4 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[14px] text-[var(--text-1)]">{getCategoryLabel(cat as Category)}</p>
                      <p className="text-[13px] text-[var(--text-2)] mt-0.5">{getCategoryDescription(cat as Category)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Location */}
            {clinic.address && (
              <section>
                <h2 className="text-[20px] font-semibold text-[var(--text-1)] mb-4">Location</h2>
                <p className="text-[15px] text-[var(--text-2)] mb-3">{clinic.address}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(clinic.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors"
                >
                  Open in Google Maps
                  <svg width="12" height="12" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5"><path d="M2.5 9.5l7-7M9.5 3H3.5M9.5 3v6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              </section>
            )}
          </div>

          {/* Contact card */}
          <div>
            <div className="sticky top-20 p-6 bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-[0_4px_30px_rgba(23,20,13,0.06)] flex flex-col gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--text-3)] mb-2">Contact clinic</p>
                <RatingStars rating={clinic.rating} reviewCount={clinic.review_count} />
              </div>

              <div className="pt-2 border-t border-[var(--border)] flex flex-col gap-2.5">
                {clinic.website_url && (
                  <a
                    href={clinic.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-[var(--ink)] text-[var(--ink-fg)] text-[14px] font-semibold hover:opacity-85 transition-opacity"
                  >
                    Visit website
                    <svg width="13" height="13" fill="none" viewBox="0 0 13 13" stroke="currentColor" strokeWidth="1.5"><path d="M2 11L11 2M11 2H5M11 2v6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                )}
                {clinic.contact_url && (
                  <a
                    href={clinic.contact_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-3 rounded-lg border border-[var(--border)] text-[var(--text-1)] text-[14px] font-medium hover:border-[var(--border-hover)] transition-colors"
                  >
                    Send enquiry
                  </a>
                )}
                {clinic.phone && (
                  <a
                    href={`tel:${clinic.phone}`}
                    className="text-[13px] text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors text-center pt-1"
                  >
                    {clinic.phone}
                  </a>
                )}
              </div>

              <div className="pt-3 border-t border-[var(--border)]">
                <p className="text-[11px] text-[var(--text-3)] leading-relaxed">
                  For informational purposes only. Verify credentials directly with the clinic before booking.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar clinics */}
        {similarClinics.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[var(--border)]">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--text-3)] mb-1">You might also like</p>
                <h2 className="text-[22px] font-semibold text-[var(--text-1)]">Similar clinics</h2>
              </div>
              <Link href="/clinics" className="text-[13px] text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarClinics.map((c) => (
                <ClinicCard key={c.id} clinic={c} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
