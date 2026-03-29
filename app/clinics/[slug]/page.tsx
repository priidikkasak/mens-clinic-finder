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
  const supabase = createServerClient()
  const { data } = await supabase.from('clinics').select('*').eq('slug', slug).single()
  return data as Clinic | null
}

async function getSimilarClinics(clinic: Clinic) {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('clinics')
    .select('*')
    .neq('slug', clinic.slug)
    .or(`country.eq.${clinic.country},categories.cs.{${clinic.categories[0]}}`)
    .limit(4)
  return (data ?? []) as Clinic[]
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

  const description = `${clinic.name} in ${clinic.city} — ${clinic.categories.map(getCategoryLabel).join(', ')}. ${
    clinic.price_min ? `Prices from €${clinic.price_min.toLocaleString()}. ` : ''
  }${clinic.rating ? `Rated ${clinic.rating}/5. ` : ''}Find contact details and book a consultation.`

  return {
    title: `${clinic.name} — Men's Health Clinic in ${clinic.city}`,
    description,
    openGraph: {
      title: `${clinic.name} — Men's Health Clinic in ${clinic.city}`,
      description,
      type: 'website',
    },
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
    address: {
      '@type': 'PostalAddress',
      streetAddress: clinic.address ?? undefined,
      addressLocality: clinic.city,
      addressCountry: clinic.country,
    },
    priceRange: clinic.price_min
      ? formatPriceRange(clinic.price_min, clinic.price_max, clinic.currency)
      : undefined,
    telephone: clinic.phone ?? undefined,
    url: clinic.website_url ?? undefined,
    aggregateRating: clinic.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: clinic.rating,
          reviewCount: clinic.review_count,
        }
      : undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back */}
        <Link
          href="/clinics"
          className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors mb-8 inline-block"
        >
          ← Back to clinics
        </Link>

        {/* Header */}
        <header className="border-b border-[var(--color-border)] pb-8 mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {clinic.verified && <VerifiedBadge />}
              {clinic.premium && (
                <span className="text-xs font-semibold px-2 py-1 rounded border border-[var(--color-premium-border)] text-[var(--color-accent)] bg-[var(--color-accent-dim)]">
                  Premium
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-[var(--color-text-primary)] tracking-tight">
              {clinic.name}
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              {countryFlag(clinic.country)} {clinic.city}, {clinic.country}
            </p>
            <div className="flex flex-wrap gap-2">
              {clinic.categories.map((cat) => (
                <CategoryPill key={cat} category={cat as Category} />
              ))}
            </div>
          </div>
        </header>

        {/* Key stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard
            label="Price range"
            value={formatPriceRange(clinic.price_min, clinic.price_max, clinic.currency)}
            mono
          />
          <StatCard
            label="Rating"
            value={clinic.rating ? `${clinic.rating}/5 (${clinic.review_count} reviews)` : 'Not rated'}
            mono
          />
          <StatCard
            label="Languages"
            value={clinic.languages?.join(', ') ?? 'Not specified'}
          />
          <StatCard
            label="Founded"
            value={clinic.founded_year ? String(clinic.founded_year) : 'Not specified'}
            mono
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 flex flex-col gap-12">
            {/* Description */}
            {clinic.description && (
              <section>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">About this clinic</h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">{clinic.description}</p>
              </section>
            )}

            {/* Services */}
            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">Services offered</h2>
              <div className="flex flex-col gap-4">
                {clinic.categories.map((cat) => (
                  <div key={cat} className="flex flex-col gap-1 p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                    <p className="font-medium text-[var(--color-text-primary)] text-sm">{getCategoryLabel(cat as Category)}</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">{getCategoryDescription(cat as Category)}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Location */}
            {clinic.address && (
              <section>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">Location</h2>
                <p className="text-[var(--color-text-secondary)] mb-3">{clinic.address}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(clinic.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-accent)] hover:opacity-80 transition-opacity"
                >
                  Open in Google Maps →
                </a>
              </section>
            )}
          </div>

          {/* Contact sidebar */}
          <div className="flex flex-col gap-4">
            <div className="p-6 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col gap-4 sticky top-24">
              <h2 className="font-semibold text-[var(--color-text-primary)]">Contact this clinic</h2>
              {clinic.website_url && (
                <a
                  href={clinic.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center text-sm font-medium rounded-lg px-4 py-2.5 bg-[var(--color-accent)] text-[#0a0a0a] hover:opacity-90 transition-opacity"
                >
                  Visit website
                </a>
              )}
              {clinic.contact_url && (
                <a
                  href={clinic.contact_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center text-sm font-medium rounded-lg px-4 py-2.5 border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-colors"
                >
                  Send enquiry
                </a>
              )}
              {clinic.phone && (
                <a
                  href={`tel:${clinic.phone}`}
                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-center"
                >
                  {clinic.phone}
                </a>
              )}
              <div className="pt-4 border-t border-[var(--color-border)]">
                <RatingStars rating={clinic.rating} reviewCount={clinic.review_count} />
              </div>
            </div>
          </div>
        </div>

        {/* Similar clinics */}
        {similarClinics.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[var(--color-border)]">
            <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-8">Similar clinics</h2>
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

function StatCard({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col gap-1">
      <p className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider">{label}</p>
      <p className={`text-sm text-[var(--color-text-primary)] ${mono ? 'font-mono' : ''}`}>{value}</p>
    </div>
  )
}
