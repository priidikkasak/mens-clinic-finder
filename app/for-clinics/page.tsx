import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'List Your Clinic — MensClinicFinder',
  description: 'Reach high-intent patients searching for men\'s health care. List your clinic on MensClinicFinder.',
}

const plans = [
  {
    name: 'Standard',
    price: 'Free',
    period: 'forever',
    description: 'Get discovered at no cost.',
    features: ['Basic listing page', 'Searchable in directory', 'Contact link', 'Category tags'],
    cta: 'Get listed free',
    highlighted: false,
  },
  {
    name: 'Verified',
    price: '€49',
    period: 'per month',
    description: 'Build trust and rank higher.',
    features: ['Everything in Standard', 'Verified badge', 'Priority in search results', 'Credential review', 'Email support'],
    cta: 'Apply for verification',
    highlighted: true,
  },
  {
    name: 'Premium',
    price: '€149',
    period: 'per month',
    description: 'Maximum visibility.',
    features: ['Everything in Verified', 'Homepage featured placement', 'Gold card treatment', 'Analytics dashboard', 'Top of all category results'],
    cta: 'Go Premium',
    highlighted: false,
  },
]

export default function ForClinicsPage() {
  return (
    <div>

      {/* Hero */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="pg" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>For clinic owners</p>
          <h1 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text-1)', maxWidth: 560, marginBottom: '1.25rem' }}>
            Reach patients who are ready to act.
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 480, marginBottom: '2rem' }}>
            MensClinicFinder connects men actively comparing clinics with verified providers like yours.
            Our visitors have high intent — they&apos;re not browsing, they&apos;re deciding.
          </p>
          <a href="#pricing" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '0.75rem 1.5rem', borderRadius: 8,
            background: 'var(--navy)', color: 'white',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
          }}>
            View listing plans
            <svg width="13" height="13" fill="none" viewBox="0 0 13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 6.5h8M6.5 3l3.5 3.5L6.5 10"/>
            </svg>
          </a>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="pg">
          <div className="grid grid-cols-3" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
            {[
              { n: '25+', l: 'Clinics listed' },
              { n: '18', l: 'Countries' },
              { n: '5', l: 'Specialisations' },
            ].map((s) => (
              <div key={s.l}>
                <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '2rem', color: 'white', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.n}</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it works */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="pg" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.875rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>01</span>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 20, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Why it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '2rem' }}>
            {[
              { n: '01', title: 'High-intent traffic', body: 'Visitors come specifically to compare clinics and book. Not casual browsers — people actively planning a procedure.' },
              { n: '02', title: 'Price-transparent market', body: 'Patients choose us because we publish real prices. Clinics that share pricing convert better.' },
              { n: '03', title: 'International reach', body: 'We serve patients from 40+ countries. Medical travel is a growing market and we connect them to you.' },
            ].map((p) => (
              <div key={p.n} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <div style={{ width: 24, height: 1, background: 'var(--gold)' }} />
                <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 16, color: 'var(--text-1)', letterSpacing: '-0.01em' }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="pg" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.875rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>02</span>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 20, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Listing plans</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '1rem' }}>
            {plans.map((plan) => (
              <div key={plan.name} style={{
                background: plan.highlighted ? 'var(--navy)' : 'white',
                border: `1px solid ${plan.highlighted ? 'var(--navy)' : 'var(--border)'}`,
                borderRadius: 10, padding: '1.75rem',
                display: 'flex', flexDirection: 'column', gap: '1.25rem',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 15, color: plan.highlighted ? 'white' : 'var(--text-1)' }}>{plan.name}</p>
                    {plan.highlighted && (
                      <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', padding: '2px 6px', background: 'rgba(255,255,255,0.12)', color: 'white', borderRadius: 3 }}>Popular</span>
                    )}
                  </div>
                  <p style={{ fontSize: 12, color: plan.highlighted ? 'rgba(255,255,255,0.4)' : 'var(--text-3)' }}>{plan.description}</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
                  <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '2rem', lineHeight: 1, color: plan.highlighted ? 'white' : 'var(--text-1)', letterSpacing: '-0.02em' }}>{plan.price}</span>
                  <span style={{ fontSize: 12, color: plan.highlighted ? 'rgba(255,255,255,0.35)' : 'var(--text-3)', paddingBottom: 3 }}>/{plan.period}</span>
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: plan.highlighted ? 'rgba(255,255,255,0.6)' : 'var(--text-2)' }}>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0, marginTop: 1 }} stroke={plan.highlighted ? 'var(--gold)' : 'var(--green)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 6.5l3 3 6-5.5"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <a href={`mailto:clinics@mensclincfinder.com?subject=${encodeURIComponent(plan.name + ' listing — ' + plan.price)}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '0.625rem', borderRadius: 8, fontSize: 13, fontWeight: 700,
                    textDecoration: 'none',
                    background: plan.highlighted ? 'white' : 'var(--navy)',
                    color: plan.highlighted ? 'var(--navy)' : 'white',
                  }}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="pg" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.875rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>03</span>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 20, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>How to get listed</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '1.5rem' }}>
            {[
              { n: '01', title: 'Contact us', body: 'Send an email with your clinic details and which plan interests you.' },
              { n: '02', title: 'We review', body: 'Our team checks credentials, pricing transparency within 48h.' },
              { n: '03', title: 'Go live', body: 'Your clinic page is created and indexed. Standard listings live in 24h.' },
              { n: '04', title: 'Get enquiries', body: 'Patients find you and contact you directly.' },
            ].map((s) => (
              <div key={s.n} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--border-strong)', lineHeight: 1 }}>{s.n}</span>
                <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-1)' }}>{s.title}</p>
                <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="pg" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '2rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.4rem,2.5vw,1.75rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text-1)', marginBottom: '0.5rem' }}>
                Ready to grow your patient base?
              </h2>
              <p style={{ fontSize: 13, color: 'var(--text-3)' }}>Free listing available — no credit card required.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
              <a href="mailto:clinics@mensclincfinder.com" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '0.75rem 1.5rem', borderRadius: 8,
                background: 'var(--navy)', color: 'white',
                fontSize: 14, fontWeight: 700, textDecoration: 'none',
              }}>
                Get listed today
                <svg width="13" height="13" fill="none" viewBox="0 0 13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 6.5h8M6.5 3l3.5 3.5L6.5 10"/>
                </svg>
              </a>
              <p style={{ fontSize: 11, color: 'var(--text-3)' }}>clinics@mensclincfinder.com</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
