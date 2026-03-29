import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — MensClinicFinder',
  description: 'Our mission: price transparency and helping men find vetted clinics without embarrassment.',
}

export default function AboutPage() {
  return (
    <div>

      {/* Hero */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="pg" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>About</p>
          <h1 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text-1)', maxWidth: 560, marginBottom: '1.25rem' }}>
            Men deserve better healthcare information.
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 480 }}>
            MensClinicFinder makes finding a men&apos;s health clinic as straightforward as booking a flight —
            transparent pricing, verifiable credentials, and zero embarrassment.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="pg" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.875rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>01</span>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 20, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>The problem we&apos;re solving</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px]" style={{ gap: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75 }}>
              <p>
                Men&apos;s health is under-served and over-stigmatised. Finding a clinic for testosterone replacement,
                erectile dysfunction or penile enhancement currently means trawling forums, decoding vague pricing pages,
                and wondering whether a provider is actually qualified.
              </p>
              <p>
                This is a solvable problem. We built a directory that treats men as informed adults and demands the same
                standard of transparency from every clinic we feature.
              </p>
              <p>
                No account required. No ad targeting. No "call for a quote" opacity. Just real clinics, real prices,
                and credentials you can verify.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { n: '25+', l: 'Verified clinics' },
                { n: '18', l: 'Countries' },
                { n: '5', l: 'Specialisations' },
              ].map((s) => (
                <div key={s.l} style={{ paddingBottom: '1.25rem', borderBottom: '1px solid var(--border)' }}>
                  <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '2rem', lineHeight: 1, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>{s.n}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="pg" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.875rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>02</span>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 20, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>What we stand for</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '1.5rem' }}>
            {[
              { title: 'Honest pricing', body: '"Call for a quote" is a red flag. We require published price ranges so you can compare before ever making contact.' },
              { title: 'Verified credentials', body: 'Our verified badge requires confirmed medical licensing, facility standards and patient feedback — not self-reported claims.' },
              { title: 'Complete privacy', body: 'No account needed. We don\'t sell data or retarget ads. What you search is your business, not ours.' },
              { title: 'Global options', body: 'Quality care exists at every price point worldwide. We list clinics globally so geography doesn\'t limit your choices.' },
            ].map((p) => (
              <div key={p.title} style={{ padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <div style={{ width: 24, height: 1, background: 'var(--gold)', marginBottom: '0.875rem' }} />
                <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 15, color: 'var(--text-1)', marginBottom: '0.5rem' }}>{p.title}</p>
                <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="pg" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.875rem', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>03</span>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 20, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Medical disclaimer</h2>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75, maxWidth: 640 }}>
            MensClinicFinder is an informational directory. We do not provide medical advice and do not endorse any
            specific clinic or treatment. Always consult a qualified medical professional before undertaking any
            procedure. Clinic information is provided in good faith but may change — verify directly with any clinic
            before booking.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="pg" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '2rem', alignItems: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.4rem,2.5vw,1.75rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text-1)' }}>
              Ready to find the right clinic?
            </h2>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/clinics" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '0.75rem 1.5rem', borderRadius: 8,
                background: 'var(--navy)', color: 'white',
                fontSize: 14, fontWeight: 700, textDecoration: 'none',
              }}>
                Browse clinics
                <svg width="13" height="13" fill="none" viewBox="0 0 13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 6.5h8M6.5 3l3.5 3.5L6.5 10"/>
                </svg>
              </Link>
              <Link href="/for-clinics" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '0.75rem 1.25rem', borderRadius: 8,
                border: '1px solid var(--border)', color: 'var(--text-1)',
                fontSize: 14, fontWeight: 600, textDecoration: 'none',
              }}>
                List your clinic
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
