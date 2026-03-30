import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'List Your Clinic — MensClinicFinder',
  description: "Reach high-intent patients searching for men's health care. List your clinic on MensClinicFinder.",
}

export default function ForClinicsPage() {
  return (
    <div>

      {/* Hero */}
      <section className="about-hero">
        <div className="pg-w">
          <p className="page-eyebrow">For clinic owners</p>
          <h1 className="page-title">Reach patients who<br />are ready to act.</h1>
          <p className="page-lead" style={{ maxWidth: 480 }}>
            MensClinicFinder connects men actively comparing clinics with verified providers like yours.
            Our visitors have high intent — they&apos;re not browsing, they&apos;re deciding.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <a href="mailto:clinics@mensclincfinder.com" className="btn-main">
              Contact us to get listed
              <svg width="13" height="13" fill="none" viewBox="0 0 13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 6.5h8M6.5 3l3.5 3.5L6.5 10"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Why it works */}
      <section className="about-section about-section--alt">
        <div className="pg-w">
          <p className="page-eyebrow">Why it works</p>
          <div className="fc-why-grid">
            {[
              {
                title: 'High-intent traffic',
                body: 'Visitors come specifically to compare clinics and book. Not casual browsers — people actively planning a procedure.',
              },
              {
                title: 'Price-transparent market',
                body: 'Patients choose us because we publish real prices. Clinics that share pricing convert significantly better.',
              },
              {
                title: 'International reach',
                body: 'We serve patients from 40+ countries. Medical travel is a growing market and we connect them to you.',
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

      {/* How to get listed */}
      <section className="about-section">
        <div className="pg-w">
          <p className="page-eyebrow">How to get listed</p>
          <div className="fc-steps-grid">
            {[
              { n: '01', title: 'Contact us', body: 'Send an email with your clinic name, location, and the procedures you offer.' },
              { n: '02', title: 'We review', body: 'Our team checks credentials and pricing transparency within 48 hours.' },
              { n: '03', title: 'Go live', body: 'Your clinic page is created and indexed. Listings go live within 24 hours.' },
              { n: '04', title: 'Get enquiries', body: 'Patients find you through our directory and contact you directly.' },
            ].map((s) => (
              <div key={s.n} className="fc-step">
                <span className="fc-step-n">{s.n}</span>
                <p className="fc-step-title">{s.title}</p>
                <p className="value-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="pg-w about-cta-inner">
          <h2 className="about-cta-title">Ready to grow your patient base?</h2>
          <div className="about-cta-btns">
            <a href="mailto:clinics@mensclincfinder.com" className="btn-main">
              Contact us
              <svg width="13" height="13" fill="none" viewBox="0 0 13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 6.5h8M6.5 3l3.5 3.5L6.5 10"/>
              </svg>
            </a>
            <span style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'var(--font-geist-mono)' }}>
              clinics@mensclincfinder.com
            </span>
          </div>
        </div>
      </section>

    </div>
  )
}
