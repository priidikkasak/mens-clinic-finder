import Link from 'next/link'
import { createServerClient } from '@/lib/supabase-server'
import { Clinic } from '@/lib/types'
import { MOCK_CLINICS } from '@/lib/mock-clinics'
import HomeDirectory from '@/components/HomeDirectory'

export const revalidate = 3600

async function getData() {
  try {
    const sb = createServerClient()
    const { data } = await sb
      .from('clinics')
      .select('*')
      .order('rating', { ascending: false })
    const clinics = (data ?? []) as Clinic[]
    if (clinics.length === 0) throw new Error('empty')
    return {
      clinics,
      total: clinics.length,
      countries: [...new Set(clinics.map(c => c.country))].length,
    }
  } catch {
    const clinics = [...MOCK_CLINICS].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    return {
      clinics,
      total: clinics.length,
      countries: [...new Set(clinics.map(c => c.country))].length,
    }
  }
}

export default async function HomePage() {
  const { clinics, total, countries } = await getData()

  return (
    <div>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="hero-v2">
        <div className="hero-glow" aria-hidden="true" />
        <div className="pg-w hero-inner">

          {/* Live badge */}
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Live directory · {total} clinics · {countries} countries
          </div>

          {/* Headline */}
          <h1 className="hero-title">
            Find the right<br />clinic.<br />
            <span className="hero-title-accent">Discreetly.</span>
          </h1>

          {/* Subline */}
          <p className="hero-body">
            Verified men&apos;s health clinics across Europe and worldwide.
            Transparent pricing. Private, professional care.
          </p>

          {/* CTAs */}
          <div className="hero-actions">
            <a href="#directory" className="btn-main">
              Browse {total} clinics
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7h8M7 3.5L10.5 7 7 10.5"/>
              </svg>
            </a>
            <Link href="/for-clinics" className="btn-outline">
              For clinics
              <svg width="12" height="12" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 9.5l7-7M9.5 2.5H4M9.5 2.5V8"/>
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-stats-bar">
            {[
              { n: String(total), l: 'Clinics' },
              { n: String(countries), l: 'Countries' },
              { n: '5', l: 'Specialisations' },
            ].map((s) => (
              <div key={s.l} className="hero-stat">
                <span className="hero-stat-num">{s.n}</span>
                <span className="hero-stat-label">{s.l}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── FULL DIRECTORY ──────────────────────────────────── */}
      <section id="directory">
        <HomeDirectory clinics={clinics} />
      </section>

      {/* ── TRUST MANIFESTO ─────────────────────────────────── */}
      <section className="manifesto-section">
        <div className="pg-w manifesto-inner">
          <p className="manifesto-eyebrow">Why we exist</p>
          <div className="manifesto-grid">
            {[
              {
                n: '01',
                title: 'Honest pricing',
                body: '"Call for a quote" is a red flag. We require real price ranges from every listed clinic.',
              },
              {
                n: '02',
                title: 'Verified credentials',
                body: 'Our verified badge means confirmed licensing, medical standards and real patient feedback.',
              },
              {
                n: '03',
                title: 'Complete privacy',
                body: "No account required. We don't log searches or sell data. Your health journey is yours.",
              },
            ].map((p, i) => (
              <div key={p.n} className={`manifesto-pillar${i > 0 ? ' has-border' : ''}`}>
                <span className="manifesto-n">{p.n}</span>
                <div className="manifesto-rule" />
                <h3 className="manifesto-title">{p.title}</h3>
                <p className="manifesto-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR CLINICS CTA ─────────────────────────────────── */}
      <section className="cta-section">
        <div className="pg-w cta-inner">
          <div className="cta-left">
            <p className="cta-eyebrow">For clinic owners</p>
            <h2 className="cta-title">Reach patients who are ready to act.</h2>
            <p className="cta-body">
              High-intent visitors already comparing clinics and pricing.
              Get listed among verified providers and be found discreetly.
            </p>
          </div>
          <div className="cta-right">
            <Link href="/for-clinics" className="btn-main">
              List your clinic
              <svg width="13" height="13" fill="none" viewBox="0 0 13 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 6.5h8M6.5 3l3.5 3.5L6.5 10"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
