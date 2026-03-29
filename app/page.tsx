import Link from 'next/link'
import { createServerClient } from '@/lib/supabase-server'
import { Clinic, Category } from '@/lib/types'
import { getAllCategories, getCategoryLabel, getCategoryDescription } from '@/lib/utils'
import { MOCK_CLINICS } from '@/lib/mock-clinics'
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
    if (clinics.length === 0) throw new Error('empty')
    return {
      featured: (featured ?? []) as Clinic[],
      all: clinics as { categories: string[]; price_min: number | null; country: string }[],
      total: clinics.length,
      countries: [...new Set(clinics.map((c: { country: string }) => c.country))].length,
    }
  } catch {
    const featured = MOCK_CLINICS.filter(c => c.premium)
    return {
      featured,
      all: MOCK_CLINICS.map(c => ({ categories: c.categories as string[], price_min: c.price_min, country: c.country })),
      total: MOCK_CLINICS.length,
      countries: [...new Set(MOCK_CLINICS.map(c => c.country))].length,
    }
  }
}

function catStats(all: { categories: string[]; price_min: number | null }[], cat: Category) {
  const m = all.filter((c) => c.categories.includes(cat))
  const prices = m.map((c) => c.price_min).filter((p): p is number => p !== null)
  return { count: m.length, from: prices.length ? Math.min(...prices) : null }
}

export default async function HomePage() {
  const { featured, all, total, countries } = await getData()

  return (
    <div>

      {/* HERO */}
      <section className="border-b border-[var(--border)]" style={{ minHeight: 'calc(100dvh - 56px)', display: 'flex', flexDirection: 'column' }}>
        <div className="hero-wrap">

          <div className="hero-left">
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-3)' }}>
              Global directory · {total} clinics
            </p>

            <div>
              <h1 style={{
                fontFamily: 'var(--font-syne)', fontWeight: 800,
                lineHeight: 0.95, letterSpacing: '-0.02em', color: 'var(--text-1)',
                fontSize: 'clamp(3rem, 5vw, 5.5rem)', marginBottom: '1.5rem',
              }}>
                <span style={{ display: 'block' }}>FIND</span>
                <span style={{ display: 'block', color: 'var(--border-strong)' }}>THE</span>
                <span style={{ display: 'block' }}>RIGHT</span>
                <span style={{ display: 'block' }}>CLINIC.</span>
              </h1>

              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-2)', maxWidth: 380, marginBottom: '1.75rem' }}>
                Verified men&apos;s health clinics across Europe and worldwide.
                Transparent pricing. Private, professional care.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/clinics" className="btn-grad" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '0.75rem 1.5rem', borderRadius: 8,
                  background: 'var(--grad-primary)', color: 'white',
                  fontSize: 14, fontWeight: 700, textDecoration: 'none',
                  boxShadow: '0 2px 12px rgba(12,28,46,0.25)',
                }}>
                  Browse all clinics
                  <svg width="13" height="13" fill="none" viewBox="0 0 13 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 6.5h8M6.5 3l3.5 3.5L6.5 10"/>
                  </svg>
                </Link>
                <span style={{ fontSize: 13, color: 'var(--text-3)' }}>
                  {countries} countries covered
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
              {[
                { n: String(total), l: 'Clinics' },
                { n: String(countries), l: 'Countries' },
                { n: '5', l: 'Specialisations' },
              ].map((s) => (
                <div key={s.l}>
                  <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '1.75rem', lineHeight: 1, color: 'var(--text-1)' }}>{s.n}</p>
                  <p style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-right">
            <div style={{ padding: '1.5rem 1.75rem', borderBottom: '1px solid var(--border)' }}>
              <p style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-3)', marginBottom: 4 }}>Quick search</p>
              <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 18, color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
                Filter clinics
              </p>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.75rem' }}>
              <HomeFilters />
            </div>
          </div>
        </div>
      </section>

      {/* PROCEDURES */}
      <section className="border-b border-[var(--border)]">
        <div className="pg-w">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '2.5rem 0', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.875rem' }}>
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>01</span>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 22, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Browse by procedure</h2>
            </div>
            <Link href="/clinics" style={{ fontSize: 12, color: 'var(--text-3)', textDecoration: 'none' }}>View all →</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {getAllCategories().map((cat, i) => {
              const { count, from } = catStats(all, cat)
              return (
                <Link key={cat} href={`/clinics?categories=${cat}`} className="group"
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '2rem 1.5rem 2rem 0', borderBottom: '1px solid var(--border)', textDecoration: 'none', transition: 'background 0.15s' }}>
                  <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 15, color: 'var(--text-1)', lineHeight: 1.3, marginBottom: 6 }}>
                      {getCategoryLabel(cat)}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.6 }}>
                      {getCategoryDescription(cat)}
                    </p>
                  </div>
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '1.75rem', lineHeight: 1, color: 'var(--text-1)' }}>{count}</p>
                      <p style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>clinics</p>
                    </div>
                    {from && <p style={{ fontSize: 11, fontFamily: 'var(--font-geist-mono)', color: 'var(--text-3)' }}>from €{from.toLocaleString()}</p>}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section style={{ background: 'var(--navy)' }}>
        <div className="pg-w" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 0 }}>
            {[
              { n: '01', title: 'Honest pricing', body: '"Call for a quote" is a red flag. We require real price ranges from every clinic.' },
              { n: '02', title: 'Verified credentials', body: 'Our verified badge means confirmed licensing, standards and patient feedback.' },
              { n: '03', title: 'Complete privacy', body: 'No account required. We don\'t log searches or sell data. Your health journey is yours.' },
            ].map((p, i) => (
              <div key={p.n} style={{ padding: '0 2.5rem', paddingLeft: i === 0 ? 0 : undefined, paddingRight: i === 2 ? 0 : undefined, borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{p.n}</span>
                <div style={{ width: 28, height: 1, background: 'var(--gold)' }} />
                <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 17, color: 'white', letterSpacing: '-0.01em' }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="border-b border-[var(--border)]">
          <div className="pg-w">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '2.5rem 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.875rem' }}>
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>02</span>
                <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 22, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Featured clinics</h2>
              </div>
              <Link href="/clinics" style={{ fontSize: 12, color: 'var(--text-3)', textDecoration: 'none' }}>View all →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '1rem', padding: '2rem 0' }}>
              {featured.map((c) => <ClinicCard key={c.id} clinic={c} />)}
            </div>
          </div>
        </section>
      )}

      {/* FOR CLINICS CTA */}
      <section>
        <div className="pg-w" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '3rem', alignItems: 'center' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>For clinic owners</p>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.6rem,2.5vw,2.2rem)', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-1)', marginBottom: '0.75rem' }}>
                Reach patients who are ready to act.
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65 }}>
                High-intent visitors comparing clinics and pricing — already deciding.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
              <Link href="/for-clinics" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '0.75rem 1.5rem', borderRadius: 8,
                background: 'var(--grad-primary)', color: 'white',
                fontSize: 14, fontWeight: 700, textDecoration: 'none',
                boxShadow: '0 2px 12px rgba(12,28,46,0.25)',
              }}>
                List your clinic
                <svg width="13" height="13" fill="none" viewBox="0 0 13 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 6.5h8M6.5 3l3.5 3.5L6.5 10"/>
                </svg>
              </Link>
              <p style={{ fontSize: 11, color: 'var(--text-3)' }}>Contact us to get listed</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
