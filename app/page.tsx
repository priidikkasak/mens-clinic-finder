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

          {/* Right — male vitality card */}
          <div className="hero-deco" aria-hidden="true">
            <div className="hdc-ecg-card">
              <div className="hdc-ecg-header">
                <div>
                  <div className="hdc-ecg-title">Vitality Profile</div>
                  <div className="hdc-ecg-subtitle">Men&apos;s Health Scan</div>
                </div>
                <div className="hdc-ecg-live">
                  <span className="hdc-ecg-dot" />
                  LIVE
                </div>
              </div>
              {/* Body scan area */}
              <div className="hdc-body-area">
                <div className="hdc-body-glow" />
                <svg className="hdc-body-fig" viewBox="0 0 100 200" fill="none">
                  <defs>
                    <radialGradient id="figFill" cx="50%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="rgba(201,160,87,0.18)"/>
                      <stop offset="100%" stopColor="rgba(201,160,87,0.04)"/>
                    </radialGradient>
                  </defs>
                  {/* Head */}
                  <ellipse cx="50" cy="15" rx="12" ry="13" stroke="#C9A057" strokeWidth="1.4" fill="url(#figFill)"/>
                  {/* Body — smooth natural male silhouette */}
                  <path
                    stroke="#C9A057" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                    fill="url(#figFill)"
                    d="M43 27
                       C36 28 20 34 12 48
                       C6 60 10 76 14 86
                       C17 93 19 100 20 108
                       C20 114 20 120 22 127
                       C22 136 20 148 16 182
                       L28 182
                       C30 164 34 146 36 130
                       C38 120 42 114 50 112
                       C58 114 62 120 64 130
                       C66 146 70 164 72 182
                       L84 182
                       C80 148 78 136 78 127
                       C80 120 80 114 80 108
                       C81 100 83 93 86 86
                       C90 76 94 60 88 48
                       C80 34 64 28 57 27
                       Z"
                  />
                  {/* Left arm */}
                  <path stroke="#C9A057" strokeWidth="1.4" strokeLinecap="round" fill="url(#figFill)"
                    d="M12 48 C6 62 4 80 6 96 C8 106 12 112 18 116 L20 108"/>
                  {/* Right arm */}
                  <path stroke="#C9A057" strokeWidth="1.4" strokeLinecap="round" fill="url(#figFill)"
                    d="M88 48 C94 62 96 80 94 96 C92 106 88 112 82 116 L80 108"/>
                  {/* Health pulse — heart area */}
                  <circle cx="50" cy="65" r="3.5" fill="#16a34a" className="hdc-health-dot"/>
                  <circle cx="50" cy="65" r="3.5" fill="none" stroke="#16a34a" strokeWidth="1.2" className="hdc-health-ring"/>
                </svg>
                {/* Metric bars */}
                <div className="hdc-body-bars">
                  {([
                    { l: 'Testosterone', p: 86 },
                    { l: 'Vitality', p: 74 },
                    { l: 'Fertility', p: 91 },
                  ] as const).map(m => (
                    <div key={m.l} className="hdc-body-bar">
                      <span className="hdc-body-bar-l">{m.l}</span>
                      <div className="hdc-body-bar-track">
                        <div className="hdc-body-bar-fill" style={{width: `${m.p}%`}} />
                      </div>
                      <span className="hdc-body-bar-v">{m.p}%</span>
                    </div>
                  ))}
                </div>
              </div>
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
