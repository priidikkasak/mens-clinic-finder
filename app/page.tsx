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

          {/* Left — text content */}
          <div className="hero-content">

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

          {/* Right — ECG / health monitoring decoration */}
          <div className="hero-deco" aria-hidden="true">
            <div className="hdc-ecg-card">
              {/* Header */}
              <div className="hdc-ecg-header">
                <div>
                  <div className="hdc-ecg-title">Health Monitoring</div>
                  <div className="hdc-ecg-subtitle">Men&apos;s Clinic Directory</div>
                </div>
                <div className="hdc-ecg-live">
                  <span className="hdc-ecg-dot" />
                  LIVE
                </div>
              </div>
              {/* ECG wave track */}
              <div className="hdc-ecg-track">
                <svg className="hdc-ecg-svg" viewBox="0 0 600 80" preserveAspectRatio="none">
                  <path className="hdc-ecg-path" d="M 0,52 L 15,52 Q 22,52 25,44 Q 30,36 35,44 Q 40,52 45,52 L 49,52 L 51,62 L 56,7 L 61,62 L 65,52 L 82,52 Q 92,52 98,37 Q 110,20 117,37 Q 124,52 142,52 L 200,52 L 215,52 Q 222,52 225,44 Q 230,36 235,44 Q 240,52 245,52 L 249,52 L 251,62 L 256,7 L 261,62 L 265,52 L 282,52 Q 292,52 298,37 Q 310,20 317,37 Q 324,52 342,52 L 400,52 L 415,52 Q 422,52 425,44 Q 430,36 435,44 Q 440,52 445,52 L 449,52 L 451,62 L 456,7 L 461,62 L 465,52 L 482,52 Q 492,52 498,37 Q 510,20 517,37 Q 524,52 542,52 L 600,52" />
                </svg>
              </div>
              {/* Metrics */}
              <div className="hdc-ecg-metrics">
                <div className="hdc-ecg-metric">
                  <span className="hdc-ecg-n">4.9★</span>
                  <span className="hdc-ecg-l">Avg Rating</span>
                </div>
                <div className="hdc-ecg-divider" />
                <div className="hdc-ecg-metric">
                  <span className="hdc-ecg-n">{total}</span>
                  <span className="hdc-ecg-l">Clinics</span>
                </div>
                <div className="hdc-ecg-divider" />
                <div className="hdc-ecg-metric">
                  <span className="hdc-ecg-n">100%</span>
                  <span className="hdc-ecg-l">Private</span>
                </div>
              </div>
            </div>
            <div className="hdc-float-chip">
              <span className="hdc-float-dot" />
              {countries} countries covered
            </div>
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
