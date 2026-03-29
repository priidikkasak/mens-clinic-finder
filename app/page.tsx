import Link from 'next/link'
import { createServerClient } from '@/lib/supabase-server'
import { Clinic, Category } from '@/lib/types'
import { getAllCategories, getCategoryLabel, getCategoryDescription } from '@/lib/utils'
import ClinicCard from '@/components/ClinicCard'
import HomeFilters from '@/components/HomeFilters'

export const revalidate = 3600

async function getData() {
  try {
    const sb = createServerClient()
    const [{ data: featured }, { data: all }] = await Promise.all([
      sb.from('clinics').select('*').eq('premium', true).order('rating', { ascending: false }).limit(6),
      sb.from('clinics').select('id,categories,price_min,country'),
    ])
    const clinics = all ?? []
    return {
      featured: (featured ?? []) as Clinic[],
      all: clinics as { categories: string[]; price_min: number | null; country: string }[],
      total: clinics.length,
      countries: [...new Set(clinics.map((c: { country: string }) => c.country))].length,
    }
  } catch {
    return { featured: [] as Clinic[], all: [], total: 0, countries: 0 }
  }
}

function catStats(all: { categories: string[]; price_min: number | null }[], cat: Category) {
  const m = all.filter((c) => c.categories.includes(cat))
  const prices = m.map((c) => c.price_min).filter((p): p is number => p !== null)
  return {
    count: m.length,
    from: prices.length ? Math.min(...prices) : null,
  }
}

export default async function HomePage() {
  const { featured, all, total, countries } = await getData()

  return (
    <div>

      {/* ════════════════════════════════════════════════════════════
          HERO  —  full-height split with embedded search
      ════════════════════════════════════════════════════════════ */}
      <section className="border-b border-[var(--border)] min-h-[calc(100dvh-56px)] flex flex-col">
        <div className="flex-1 flex flex-col lg:flex-row">

          {/* LEFT — headline */}
          <div className="flex-1 flex flex-col justify-between px-6 sm:px-10 lg:px-16 pt-12 pb-10 lg:border-r border-[var(--border)]">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-auto">
              <div className="h-px flex-1 bg-[var(--border)] max-w-[60px]" />
              <span className="text-[10px] font-[family-name:var(--font-geist-mono)] uppercase tracking-[0.2em] text-[var(--text-3)]">
                Global directory · {total > 0 ? total : '25'} clinics
              </span>
            </div>

            {/* Main headline */}
            <div className="py-12 lg:py-0 lg:flex-1 lg:flex lg:flex-col lg:justify-center">
              <h1 className="font-[family-name:var(--font-syne)] font-extrabold leading-[0.88] tracking-[-0.04em] text-[var(--text-1)]"
                style={{ fontSize: 'clamp(3.8rem, 9vw, 9rem)' }}>
                <span className="block">FIND</span>
                <span className="block text-[var(--border-strong)]">THE</span>
                <span className="block">RIGHT</span>
                <span className="block">CLINIC.</span>
              </h1>

              <p className="mt-8 text-[15px] md:text-[17px] text-[var(--text-2)] max-w-md leading-relaxed">
                Verified men&apos;s health clinics across Europe and worldwide.
                Transparent pricing. Private, professional care.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/clinics"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--navy)] text-white text-[14px] font-bold hover:opacity-85 transition-opacity"
                >
                  Browse all clinics
                  <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7h8M7 3.5L10.5 7 7 10.5"/>
                  </svg>
                </Link>
                <span className="text-[13px] text-[var(--text-3)] hidden sm:block">
                  {countries > 0 ? countries : '18'} countries covered
                </span>
              </div>
            </div>

            {/* Bottom stats strip */}
            <div className="grid grid-cols-3 gap-0 border-t border-[var(--border)] pt-6 mt-6">
              {[
                { n: total > 0 ? String(total) : '25', l: 'Clinics' },
                { n: countries > 0 ? String(countries) : '18', l: 'Countries' },
                { n: '5', l: 'Specialisations' },
              ].map((s) => (
                <div key={s.l} className="pr-6">
                  <p className="font-[family-name:var(--font-syne)] font-extrabold text-[2.2rem] leading-none tracking-tight text-[var(--text-1)]">
                    {s.n}
                  </p>
                  <p className="text-[11px] text-[var(--text-3)] mt-1 uppercase tracking-wider">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — filter panel */}
          <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 bg-[var(--surface)] border-t lg:border-t-0 border-[var(--border)] flex flex-col">
            <div className="px-6 sm:px-8 pt-8 pb-3 border-b border-[var(--border)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-3)]">
                Search now
              </p>
              <p className="text-[20px] font-[family-name:var(--font-syne)] font-bold text-[var(--text-1)] mt-1 tracking-tight">
                Filter clinics
              </p>
            </div>
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">
              <HomeFilters />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          PROCEDURES
      ════════════════════════════════════════════════════════════ */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

          {/* Section header */}
          <div className="flex items-end justify-between py-10 border-b border-[var(--border)]">
            <div className="flex items-baseline gap-5">
              <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[var(--text-3)] uppercase tracking-widest">01</span>
              <h2 className="font-[family-name:var(--font-syne)] font-bold text-[24px] md:text-[30px] tracking-tight text-[var(--text-1)]">
                Browse by procedure
              </h2>
            </div>
            <Link href="/clinics" className="text-[12px] font-medium text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors hidden sm:block">
              View all →
            </Link>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {getAllCategories().map((cat, i) => {
              const { count, from } = catStats(all, cat)
              return (
                <Link
                  key={cat}
                  href={`/clinics?categories=${cat}`}
                  className="group flex flex-col gap-6 py-8 px-1 sm:px-4 border-b sm:border-b-0 lg:border-r border-[var(--border)] last:border-r-0 hover:bg-[var(--surface)] transition-colors"
                >
                  <span className="font-[family-name:var(--font-geist-mono)] text-[10px] text-[var(--text-3)] uppercase tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-2">
                    <p className="font-[family-name:var(--font-syne)] font-bold text-[17px] text-[var(--text-1)] leading-tight group-hover:text-[var(--navy)] transition-colors">
                      {getCategoryLabel(cat)}
                    </p>
                    <p className="text-[12px] text-[var(--text-3)] leading-relaxed">
                      {getCategoryDescription(cat)}
                    </p>
                  </div>
                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <p className="font-[family-name:var(--font-syne)] font-bold text-[28px] leading-none text-[var(--text-1)]">{count}</p>
                      <p className="text-[10px] text-[var(--text-3)] uppercase tracking-wider mt-0.5">clinics</p>
                    </div>
                    {from && (
                      <p className="text-[11px] font-mono text-[var(--text-3)] pb-0.5">from €{from.toLocaleString()}</p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          MANIFESTO STRIP
      ════════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--navy)] border-b border-[var(--navy)]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x divide-white/10">
            {[
              { n: '01', title: 'Honest pricing', body: '"Call for a quote" is a red flag. We require real price ranges from every clinic so you compare fairly.' },
              { n: '02', title: 'Verified credentials', body: 'Our verified badge means confirmed licensing, standards and patient feedback. Not self-reported claims.' },
              { n: '03', title: 'Complete privacy', body: 'No account required. We don\'t log searches or sell data. Your health journey is yours.' },
            ].map((p) => (
              <div key={p.n} className="md:px-10 first:pl-0 last:pr-0 flex flex-col gap-4">
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] text-white/30 uppercase tracking-widest">{p.n}</span>
                <div className="w-8 h-px bg-[var(--gold)]" />
                <h3 className="font-[family-name:var(--font-syne)] font-bold text-[18px] text-white tracking-tight">{p.title}</h3>
                <p className="text-[13px] text-white/50 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FEATURED CLINICS
      ════════════════════════════════════════════════════════════ */}
      {featured.length > 0 && (
        <section className="border-b border-[var(--border)]">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

            <div className="flex items-end justify-between py-10 border-b border-[var(--border)]">
              <div className="flex items-baseline gap-5">
                <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[var(--text-3)] uppercase tracking-widest">02</span>
                <h2 className="font-[family-name:var(--font-syne)] font-bold text-[24px] md:text-[30px] tracking-tight text-[var(--text-1)]">
                  Featured clinics
                </h2>
              </div>
              <Link href="/clinics" className="text-[12px] font-medium text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors hidden sm:block">
                View all →
              </Link>
            </div>

            <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((c) => <ClinicCard key={c.id} clinic={c} />)}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          FOR CLINICS
      ════════════════════════════════════════════════════════════ */}
      <section>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[var(--border)]">
            <div className="max-w-xl">
              <span className="font-[family-name:var(--font-geist-mono)] text-[10px] text-[var(--text-3)] uppercase tracking-widest">For clinic owners</span>
              <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-[-0.03em] text-[var(--text-1)] mt-3">
                REACH PATIENTS<br />WHO DECIDE.
              </h2>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link href="/for-clinics" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-[var(--navy)] text-white text-[14px] font-bold hover:opacity-85 transition-opacity">
                View listing plans
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7h8M7 3.5L10.5 7 7 10.5"/>
                </svg>
              </Link>
              <p className="text-[11px] text-[var(--text-3)] text-center">Free listing available</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 pt-4">
            {[
              { val: 'Free', label: 'Standard listing', desc: 'Get discovered at no cost.' },
              { val: '€49/mo', label: 'Verified badge', desc: 'Build trust, rank higher.' },
              { val: '€149/mo', label: 'Premium placement', desc: 'Homepage features, analytics.' },
            ].map((p) => (
              <div key={p.val} className="py-8 pr-8 border-b sm:border-b-0 sm:border-r border-[var(--border)] last:border-0">
                <p className="font-[family-name:var(--font-syne)] font-extrabold text-[2rem] text-[var(--text-1)] tracking-tight">{p.val}</p>
                <p className="text-[13px] font-semibold text-[var(--text-1)] mt-2">{p.label}</p>
                <p className="text-[12px] text-[var(--text-3)] mt-1">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
