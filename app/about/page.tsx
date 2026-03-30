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
      <section className="about-hero">
        <div className="pg-w">
          <p className="page-eyebrow">About</p>
          <h1 className="page-title">Men deserve better<br />healthcare information.</h1>
          <p className="page-lead">
            MensClinicFinder makes finding a men&apos;s health clinic as straightforward as booking a flight —
            transparent pricing, verifiable credentials, and zero embarrassment.
          </p>
        </div>
      </section>

      {/* Mission + Stats */}
      <section className="about-section">
        <div className="pg-w about-grid">
          <div className="about-text">
            <p>
              Men&apos;s health is under-served and over-stigmatised. Finding a clinic for testosterone
              replacement, erectile dysfunction or penile enhancement means trawling forums, decoding
              vague pricing pages, and wondering whether a provider is actually qualified.
            </p>
            <p>
              This is a solvable problem. We built a directory that treats men as informed adults and
              demands the same standard of transparency from every clinic we feature.
            </p>
            <p>
              No account required. No ad targeting. No &ldquo;call for a quote&rdquo; opacity.
              Just real clinics, real prices, and credentials you can verify.
            </p>
          </div>
          <div className="about-stats">
            {[
              { n: '25+', l: 'Verified clinics' },
              { n: '18', l: 'Countries' },
              { n: '5', l: 'Specialisations' },
            ].map((s) => (
              <div key={s.l} className="about-stat">
                <span className="about-stat-n">{s.n}</span>
                <span className="about-stat-l">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-section about-section--alt">
        <div className="pg-w">
          <p className="page-eyebrow">What we stand for</p>
          <div className="values-grid">
            {[
              {
                title: 'Honest pricing',
                body: '"Call for a quote" is a red flag. We require published price ranges so you can compare before ever making contact.',
              },
              {
                title: 'Verified credentials',
                body: 'Our verified badge requires confirmed medical licensing, facility standards and patient feedback — not self-reported claims.',
              },
              {
                title: 'Complete privacy',
                body: "No account needed. We don't sell data or retarget ads. What you search is your business, not ours.",
              },
              {
                title: 'Global options',
                body: 'Quality care exists at every price point worldwide. We list clinics globally so geography doesn\'t limit your choices.',
              },
            ].map((p) => (
              <div key={p.title} className="value-card">
                <div className="value-rule" />
                <h3 className="value-title">{p.title}</h3>
                <p className="value-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="about-section">
        <div className="pg-w">
          <p className="page-eyebrow">Medical disclaimer</p>
          <p className="disclaimer-text">
            MensClinicFinder is an informational directory. We do not provide medical advice and do not
            endorse any specific clinic or treatment. Always consult a qualified medical professional
            before undertaking any procedure. Clinic information is provided in good faith but may
            change — verify directly with any clinic before booking.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="pg-w about-cta-inner">
          <h2 className="about-cta-title">Ready to find the right clinic?</h2>
          <div className="about-cta-btns">
            <Link href="/" className="btn-main">
              Browse clinics
              <svg width="13" height="13" fill="none" viewBox="0 0 13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 6.5h8M6.5 3l3.5 3.5L6.5 10"/>
              </svg>
            </Link>
            <Link href="/for-clinics" className="btn-outline">List your clinic</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
