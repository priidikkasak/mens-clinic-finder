import Link from 'next/link'
import { createServerClient } from '@/lib/supabase-server'
import { Clinic, Category } from '@/lib/types'
import { getAllCategories, getCategoryLabel, getCategoryDescription } from '@/lib/utils'
import ClinicCard from '@/components/ClinicCard'
import HomeFilters from '@/components/HomeFilters'

export const revalidate = 3600

async function getHomepageData() {
  try {
    const supabase = createServerClient()
    const [{ data: featuredClinics }, { data: allClinics }] = await Promise.all([
      supabase.from('clinics').select('*').eq('premium', true).order('rating', { ascending: false }).limit(6),
      supabase.from('clinics').select('id, categories, price_min, price_max, country'),
    ])
    const clinics = allClinics ?? []
    return {
      featuredClinics: (featuredClinics ?? []) as Clinic[],
      allClinics: clinics as { categories: string[]; price_min: number | null; price_max: number | null }[],
      totalClinics: clinics.length,
      totalCountries: [...new Set(clinics.map((c: { country: string }) => c.country))].length,
    }
  } catch {
    return { featuredClinics: [] as Clinic[], allClinics: [], totalClinics: 0, totalCountries: 0 }
  }
}

function getCategoryStats(
  all: { categories: string[]; price_min: number | null; price_max: number | null }[],
  category: Category,
) {
  const matching = all.filter((c) => c.categories.includes(category))
  const prices = matching.flatMap((c) => [c.price_min, c.price_max]).filter((p): p is number => p !== null)
  const avgMin = prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length / 2) : null
  return { count: matching.length, avgMin }
}

export default async function HomePage() {
  const { featuredClinics, allClinics, totalClinics, totalCountries } = await getHomepageData()

  return (
    <div>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative border-b border-[var(--border)]">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(184,146,106,0.07),transparent)]" aria-hidden />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-16 md:pt-28 md:pb-20">

          {/* Trust label */}
          <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[11px] font-medium text-[var(--text-2)] uppercase tracking-[0.14em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" aria-hidden />
            {totalClinics > 0 ? `${totalClinics} Clinics` : 'Verified Clinics'} · {totalCountries > 0 ? totalCountries : '18'} Countries
          </div>

          {/* Headline */}
          <h1
            className="text-[clamp(2.8rem,7vw,6.5rem)] leading-[1.02] tracking-[-0.03em] font-[family-name:var(--font-display)] text-[var(--text-1)] max-w-4xl"
          >
            Find world-class<br />
            men&apos;s health care,<br />
            <span className="text-[var(--gold)]">anywhere.</span>
          </h1>

          <p className="mt-6 text-[17px] md:text-[19px] text-[var(--text-2)] max-w-lg leading-relaxed">
            Compare verified clinics across Europe and worldwide.
            Transparent pricing. Private, discreet, professional.
          </p>

          {/* Filter card — primary action */}
          <div className="mt-10 max-w-2xl">
            <HomeFilters />
          </div>

          {/* Secondary links */}
          <p className="mt-5 text-[13px] text-[var(--text-3)]">
            Or{' '}
            <Link href="/clinics" className="text-[var(--text-2)] underline underline-offset-2 hover:text-[var(--text-1)] transition-colors">
              browse all {totalClinics > 0 ? totalClinics : ''} clinics
            </Link>{' '}
            without filters
          </p>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────── */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-[var(--border)]">
            {[
              { value: totalClinics > 0 ? String(totalClinics) : '25+', label: 'Verified clinics' },
              { value: totalCountries > 0 ? String(totalCountries) : '18', label: 'Countries covered' },
              { value: '5', label: 'Specialisations' },
              { value: '100%', label: 'Price transparency' },
            ].map((s) => (
              <div key={s.label} className="md:px-8 flex flex-col gap-1 first:pl-0 last:pr-0">
                <p className="font-[family-name:var(--font-display)] text-[2rem] text-[var(--text-1)] leading-none">{s.value}</p>
                <p className="text-[13px] text-[var(--text-3)]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--text-3)] mb-2">Specialisations</p>
            <h2 className="text-[28px] md:text-[34px] font-semibold text-[var(--text-1)] tracking-tight">Browse by procedure</h2>
          </div>
          <Link href="/clinics" className="hidden md:flex items-center gap-1.5 text-[13px] text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors">
            All clinics
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5"><path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {getAllCategories().map((cat) => {
            const { count, avgMin } = getCategoryStats(allClinics, cat)
            return (
              <Link
                key={cat}
                href={`/clinics?categories=${cat}`}
                className="group flex flex-col gap-4 p-5 bg-[var(--surface)] rounded-xl border border-[var(--border)] hover:border-[var(--border-hover)] hover:shadow-[0_4px_20px_rgba(23,20,13,0.06)] transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--ink)] group-hover:border-[var(--ink)] transition-colors">
                  <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-2)] group-hover:text-[var(--ink-fg)] transition-colors">
                    <circle cx="7" cy="7" r="5" /><path d="M7 4v3l2 2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[14px] text-[var(--text-1)] leading-snug group-hover:text-[var(--gold)] transition-colors">
                    {getCategoryLabel(cat)}
                  </p>
                  <p className="text-[12px] text-[var(--text-3)] mt-1 leading-relaxed">
                    {getCategoryDescription(cat)}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-[12px] text-[var(--text-2)]">{count} clinics</span>
                  {avgMin && <span className="text-[11px] font-mono text-[var(--text-3)]">from €{avgMin.toLocaleString()}</span>}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── TRUST PILLARS ─────────────────────────────────────────────── */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                number: '01',
                title: 'Honest pricing.',
                body: 'We publish real price ranges from every clinic. No "call for a quote." Compare on equal terms before you ever pick up the phone.',
              },
              {
                number: '02',
                title: 'Verified credentials.',
                body: 'Our verified badge means we\'ve confirmed medical licensing, facility standards and patient feedback — not just self-reported claims.',
              },
              {
                number: '03',
                title: 'Complete privacy.',
                body: 'No account required. We don\'t log what you search. Your health journey belongs to you, not to an ad network.',
              },
            ].map((p) => (
              <div key={p.number} className="flex flex-col gap-4">
                <span className="text-[11px] font-mono text-[var(--text-3)]">{p.number}</span>
                <div className="w-10 h-px bg-[var(--gold)]" />
                <h3 className="text-[20px] font-semibold text-[var(--text-1)] tracking-tight">{p.title}</h3>
                <p className="text-[14px] text-[var(--text-2)] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED CLINICS ──────────────────────────────────────────── */}
      {featuredClinics.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--text-3)] mb-2">Hand-picked</p>
              <h2 className="text-[28px] md:text-[34px] font-semibold text-[var(--text-1)] tracking-tight">Featured clinics</h2>
            </div>
            <Link href="/clinics?premium=true" className="hidden md:flex items-center gap-1.5 text-[13px] text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors">
              View all
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5"><path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredClinics.map((clinic) => (
              <ClinicCard key={clinic.id} clinic={clinic} />
            ))}
          </div>
        </section>
      )}

      {/* ── FOR CLINICS CTA ───────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <div className="bg-[var(--ink)] rounded-2xl px-8 py-12 md:px-14 md:py-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex flex-col gap-3 max-w-lg">
              <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--gold)]">For clinic owners</p>
              <h2 className="text-[28px] md:text-[34px] font-semibold text-[var(--ink-fg)] tracking-tight leading-snug">
                Reach patients who are ready to act.
              </h2>
              <p className="text-[14px] text-[#A09880] leading-relaxed">
                List your clinic and connect with high-intent patients actively comparing providers across Europe and worldwide.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/for-clinics"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[var(--ink-fg)] text-[var(--ink)] text-[14px] font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                View listing plans
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
