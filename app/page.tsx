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

const SPECS = [
  {
    cat: 'trt',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 16V8M9.5 10.5l2.5-2.5 2.5 2.5"/>
      </svg>
    ),
    label: 'Testosterone Therapy',
    desc: 'Low T, fatigue and hormonal decline. TRT clinics offering blood panels, optimised protocols and ongoing monitoring.',
    tags: ['TRT', 'Hormone panels', 'Peptides', 'DHEA'],
  },
  {
    cat: 'fertility',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="5" r="2.5"/>
        <circle cx="6.5" cy="17" r="2.5"/>
        <circle cx="17.5" cy="17" r="2.5"/>
        <line x1="12" y1="7.5" x2="8" y2="14.5"/>
        <line x1="12" y1="7.5" x2="16" y2="14.5"/>
      </svg>
    ),
    label: 'Male Fertility',
    desc: 'From sperm analysis to varicocele repair. Evidence-based clinics specialising in male factor infertility and fertility optimisation.',
    tags: ['Sperm analysis', 'Varicocele', 'IVF prep', 'DNA frag'],
  },
  {
    cat: 'ed',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 3L6 14h6l-1 7 9-11h-6l1-7z"/>
      </svg>
    ),
    label: 'Erectile Dysfunction',
    desc: 'Shockwave therapy, P-shot and medical protocols with lasting results. No awkward consultations — just clinical, effective care.',
    tags: ['Shockwave', 'P-shot', 'Vacuum', 'PDE5'],
  },
  {
    cat: 'pe',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9"/>
        <circle cx="12" cy="12" r="5"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor" strokeWidth="0"/>
      </svg>
    ),
    label: 'Premature Ejaculation',
    desc: 'Clinical, lasting solutions. Nerve block procedures and tailored medical therapy — verified specialists, real results.',
    tags: ['Nerve block', 'Topical', 'SSRI protocol'],
  },
  {
    cat: 'penis_filler',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 8v8M8 12h8"/>
      </svg>
    ),
    label: 'Penile Enhancement',
    desc: 'HA fillers, fat transfer and girth procedures from licensed specialists. Transparent pricing, verified qualifications.',
    tags: ['HA filler', 'Fat transfer', 'Girth', 'Length'],
  },
]

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
              TRT, male fertility, ED treatment and discreet enhancement —
              from verified specialists across Europe and worldwide.
              Real prices, no hidden fees.
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
                { n: '5', l: 'Treatment areas' },
              ].map((s) => (
                <div key={s.l} className="hero-stat">
                  <span className="hero-stat-num">{s.n}</span>
                  <span className="hero-stat-label">{s.l}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right — animated man figure */}
          <div className="hero-deco" aria-hidden="true">
            <div className="man-fig-wrap">
              <div className="man-fig-bg" />

              <div className="man-fig-inner">
                <svg className="man-fig-svg" viewBox="0 0 60 120" fill="none">
                  <defs>
                    <clipPath id="mBodyClip">
                      <circle cx="30" cy="9" r="9"/>
                      <path d="M 33 18 C 43 18 55 22 57 29 C 58 36 56 46 53 57 C 51 63 49 67 47 70 L 44 72 C 45 67 47 61 48 54 C 49 46 47 39 43 36 C 44 42 44 50 43 58 C 42 62 41 66 42 70 C 43 76 44 84 43 92 C 43 98 43 103 42 108 L 46 118 L 37 118 C 37 111 36 104 37 96 C 37 86 36 78 35 70 C 34 67 32 66 30 66 C 28 66 26 67 25 70 C 24 78 23 86 23 96 C 24 104 23 111 23 118 L 14 118 L 17 108 C 17 103 17 98 17 92 C 16 84 16 76 18 70 C 18 66 18 62 17 58 C 16 50 16 42 17 36 C 13 39 11 46 12 54 C 13 61 15 67 15 72 L 16 70 C 13 67 10 63 9 57 C 6 46 2 36 3 29 C 5 22 17 18 27 18 Z"/>
                    </clipPath>
                    <linearGradient id="mScanGrad" x1="0" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="rgba(255,255,255,0)"/>
                      <stop offset="50%" stopColor="rgba(255,255,255,0.92)"/>
                      <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
                    </linearGradient>
                  </defs>

                  {/* Body silhouette */}
                  <circle cx="30" cy="9" r="9" fill="rgba(201,160,87,0.92)"/>
                  <path
                    fill="rgba(201,160,87,0.92)"
                    d="M 33 18 C 43 18 55 22 57 29 C 58 36 56 46 53 57 C 51 63 49 67 47 70 L 44 72 C 45 67 47 61 48 54 C 49 46 47 39 43 36 C 44 42 44 50 43 58 C 42 62 41 66 42 70 C 43 76 44 84 43 92 C 43 98 43 103 42 108 L 46 118 L 37 118 C 37 111 36 104 37 96 C 37 86 36 78 35 70 C 34 67 32 66 30 66 C 28 66 26 67 25 70 C 24 78 23 86 23 96 C 24 104 23 111 23 118 L 14 118 L 17 108 C 17 103 17 98 17 92 C 16 84 16 76 18 70 C 18 66 18 62 17 58 C 16 50 16 42 17 36 C 13 39 11 46 12 54 C 13 61 15 67 15 72 L 16 70 C 13 67 10 63 9 57 C 6 46 2 36 3 29 C 5 22 17 18 27 18 Z"
                  />

                  {/* Scan line clipped to body shape */}
                  <g clipPath="url(#mBodyClip)">
                    <rect className="man-scan-rect" x="0" y="-5" width="60" height="5" fill="url(#mScanGrad)"/>
                  </g>

                  {/* Heart pulse */}
                  <circle cx="30" cy="45" r="2.5" fill="#16a34a" className="man-pulse-dot"/>
                  <circle cx="30" cy="45" r="2.5" fill="none" stroke="#16a34a" strokeWidth="0.7" className="man-pulse-r1"/>
                  <circle cx="30" cy="45" r="2.5" fill="none" stroke="#16a34a" strokeWidth="0.5" className="man-pulse-r2"/>
                </svg>
              </div>

              {/* Floating stat chips */}
              <div className="man-chip man-chip-1">
                <span className="man-chip-dot man-chip-dot--green"/>
                T-level optimal
              </div>
              <div className="man-chip man-chip-2">
                <span className="man-chip-dot man-chip-dot--gold"/>
                4.9★ avg rating
              </div>
              <div className="man-chip man-chip-3">
                <span className="man-chip-dot man-chip-dot--green"/>
                100% private
              </div>
            </div>

            <div className="hdc-float-chip">
              <span className="hdc-float-dot" />
              {countries} countries covered
            </div>
          </div>

        </div>
      </section>

      {/* ── SPECIALISATIONS ──────────────────────────────────── */}
      <section className="spec-section">
        <div className="pg-w">
          <div className="spec-header">
            <p className="spec-eyebrow">What we cover</p>
            <h2 className="spec-title-h2">Five specialist areas.<br className="spec-br" />One trusted directory.</h2>
          </div>
          <div className="spec-grid">
            {SPECS.map((s) => (
              <div key={s.cat} className="spec-card">
                <div className="spec-icon">{s.icon}</div>
                <h3 className="spec-name">{s.label}</h3>
                <p className="spec-desc">{s.desc}</p>
                <div className="spec-tags">
                  {s.tags.map(t => <span key={t} className="spec-tag">{t}</span>)}
                </div>
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
                title: 'Real prices, upfront',
                body: 'TRT and fertility clinics notoriously hide costs. Every listing on MCF must publish actual price ranges — no "call for a quote" gatekeeping.',
              },
              {
                n: '02',
                title: 'Verified specialists',
                body: 'Our verified badge means confirmed medical licensing for the procedures listed — not self-reported claims. Testosterone and fertility care require qualified hands.',
              },
              {
                n: '03',
                title: 'Zero-trace privacy',
                body: "Sensitive treatments deserve absolute discretion. No account, no tracking, no ad targeting. What you search stays private — always.",
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
              High-intent visitors researching TRT, fertility and specialist care.
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
