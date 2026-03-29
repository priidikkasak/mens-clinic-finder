import Link from 'next/link'
import { createServerClient } from '@/lib/supabase-server'
import { Clinic, Category } from '@/lib/types'
import { getAllCategories, getCategoryLabel, getCategoryDescription } from '@/lib/utils'
import ClinicCard from '@/components/ClinicCard'
import SearchBar from '@/components/SearchBar'

export const revalidate = 3600

async function getHomepageData() {
  try {
    const supabase = createServerClient()

    const [{ data: featuredClinics }, { data: allClinics }] = await Promise.all([
      supabase.from('clinics').select('*').eq('premium', true).order('rating', { ascending: false }).limit(6),
      supabase.from('clinics').select('id, categories, price_min, price_max, country'),
    ])

    const clinics = allClinics ?? []
    const countries = [...new Set(clinics.map((c: { country: string }) => c.country))]

    return {
      featuredClinics: (featuredClinics ?? []) as Clinic[],
      allClinics: clinics as { categories: string[]; price_min: number | null; price_max: number | null }[],
      totalClinics: clinics.length,
      totalCountries: countries.length,
    }
  } catch {
    return { featuredClinics: [] as Clinic[], allClinics: [], totalClinics: 0, totalCountries: 0 }
  }
}

function getCategoryStats(
  allClinics: { categories: string[]; price_min: number | null; price_max: number | null }[],
  category: Category,
) {
  const matching = allClinics.filter((c) => c.categories.includes(category))
  const prices = matching.flatMap((c) => [c.price_min, c.price_max]).filter((p): p is number => p !== null)
  const avgMin = prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length / 2) : null
  return { count: matching.length, avgMin }
}

export default async function HomePage() {
  const { featuredClinics, allClinics, totalClinics, totalCountries } = await getHomepageData()

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--color-text-primary)] leading-tight tracking-tight">
              Find the right men&apos;s health clinic.{' '}
              <span className="text-[var(--color-accent)]">
                Compare prices, read reviews, book with confidence.
              </span>
            </h1>
            <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-xl">
              {totalClinics} clinics across {totalCountries} countries. Honest pricing. Verified providers.
            </p>
            <div className="mt-8">
              <SearchBar />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {getAllCategories().map((cat) => (
                <Link
                  key={cat}
                  href={`/clinics?categories=${cat}`}
                  className="text-sm px-4 py-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  {getCategoryLabel(cat)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-8">Browse by category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {getAllCategories().map((cat) => {
            const { count, avgMin } = getCategoryStats(allClinics, cat)
            return (
              <Link
                key={cat}
                href={`/clinics?categories=${cat}`}
                className="group flex flex-col gap-3 p-6 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors"
              >
                <p className="font-semibold text-[var(--color-text-primary)] text-sm group-hover:text-[var(--color-accent)] transition-colors">
                  {getCategoryLabel(cat)}
                </p>
                <p className="text-xs text-[var(--color-text-tertiary)] leading-relaxed">
                  {getCategoryDescription(cat)}
                </p>
                <div className="mt-auto flex flex-col gap-0.5">
                  <p className="text-xs text-[var(--color-text-secondary)]">{count} clinics</p>
                  {avgMin && (
                    <p className="text-xs font-mono text-[var(--color-text-tertiary)]">
                      From ~€{avgMin.toLocaleString()}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Trust section */}
      <section className="border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-12 text-center">
            Why use MensClinicFinder?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Price transparency',
                body: "We publish real price ranges — no hidden costs, no \"call for a quote\". Compare clinics on equal terms before you commit.",
              },
              {
                title: 'Verified clinics',
                body: "Verified badges are awarded only after we confirm credentials, licensing and patient feedback. Never wonder if a clinic is legitimate.",
              },
              {
                title: 'Privacy-first',
                body: "No account needed to browse. We don't track what you search. Your health journey stays yours.",
              },
            ].map((point) => (
              <div key={point.title} className="flex flex-col gap-3">
                <div className="w-8 h-0.5 bg-[var(--color-accent)]" />
                <h3 className="font-semibold text-[var(--color-text-primary)]">{point.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured clinics */}
      {featuredClinics.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Featured clinics</h2>
            <Link
              href="/clinics"
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Browse all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredClinics.map((clinic) => (
              <ClinicCard key={clinic.id} clinic={clinic} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
            Ready to find your clinic?
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-8 max-w-md mx-auto">
            Browse all {totalClinics} clinics, filter by category, country and budget.
          </p>
          <Link
            href="/clinics"
            className="inline-block px-8 py-3 rounded-lg bg-[var(--color-accent)] text-[#0a0a0a] font-semibold hover:opacity-90 transition-opacity"
          >
            Browse all clinics
          </Link>
        </div>
      </section>
    </div>
  )
}
