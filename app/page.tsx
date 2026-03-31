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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
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
        <div className="pg-w hero-inner">

          {/* Left — title */}
          <div>
            <h1 className="hero-title fade-up fade-up--1">
              <span className="hero-title-row">Find the right</span>
              <span className="hero-title-row">clinic. <span className="hero-title-accent">Discreetly.</span></span>
            </h1>
          </div>

          {/* Right — body + CTAs + stats */}
          <div className="hero-content-right fade-up fade-up--2">
            <p className="hero-body">
              TRT, male fertility, ED treatment and discreet enhancement —
              from verified specialists across Europe and worldwide.
              Real prices, no hidden fees.
            </p>

            <div className="hero-actions">
              <a href="#directory" className="btn-main">
                Browse {total} clinics
              </a>
              <Link href="/for-clinics" className="btn-outline">
                For clinics
              </Link>
            </div>

            <div className="hero-stats-bar">
              {[
                { n: String(total), l: 'Clinics' },
                { n: String(countries), l: 'Countries' },
                { n: '5', l: 'Specialties' },
              ].map((s) => (
                <div key={s.l} className="hero-stat">
                  <span className="hero-stat-num">{s.n}</span>
                  <span className="hero-stat-label">{s.l}</span>
                </div>
              ))}
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
              <div key={s.cat} className="spec-card" data-cat={s.cat}>
                <div className="spec-icon">{s.icon}</div>
                <h3 className="spec-name">{s.label}</h3>
                <p className="spec-desc">{s.desc}</p>
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
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
