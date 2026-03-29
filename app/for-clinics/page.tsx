import type { Metadata } from 'next'
import Link from 'next/link'

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
      <section className="border-b border-[var(--border)] min-h-[50vh] flex items-end">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-16 w-full">
          <div className="flex items-baseline gap-5 mb-6">
            <span className="font-mono text-[10px] text-[var(--text-3)] uppercase tracking-widest">For clinic owners</span>
          </div>
          <h1 className="font-[family-name:var(--font-syne)] font-extrabold leading-[0.9] tracking-[-0.04em] text-[var(--text-1)] mb-8"
            style={{ fontSize: 'clamp(3rem,7vw,7rem)' }}>
            REACH PATIENTS<br />
            <span className="text-[var(--border-strong)]">WHO DECIDE.</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <p className="text-[17px] text-[var(--text-2)] leading-relaxed">
              MensClinicFinder connects men actively comparing clinics with verified providers like yours.
              Our visitors have high intent — they&apos;re not browsing, they&apos;re deciding.
            </p>
            <div className="flex items-end">
              <a href="#pricing"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[var(--navy)] text-white text-[14px] font-bold hover:opacity-85 transition-opacity">
                View listing plans
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7h8M7 3.5L10.5 7 7 10.5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-[var(--border)] bg-[var(--navy)]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {[
              { n: '25+', l: 'Clinics listed' },
              { n: '18', l: 'Countries covered' },
              { n: '5', l: 'Specialisations' },
            ].map((s) => (
              <div key={s.l} className="py-10 px-8 first:pl-0">
                <p className="font-[family-name:var(--font-syne)] font-extrabold text-[3rem] leading-none text-white tracking-tight">{s.n}</p>
                <p className="text-[11px] text-white/40 uppercase tracking-wider mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it works */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          <div className="flex items-end justify-between py-10 border-b border-[var(--border)]">
            <div className="flex items-baseline gap-5">
              <span className="font-mono text-[11px] text-[var(--text-3)] uppercase tracking-widest">01</span>
              <h2 className="font-[family-name:var(--font-syne)] font-bold text-[24px] md:text-[30px] tracking-tight text-[var(--text-1)]">
                Why it works
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
            {[
              { n: '01', title: 'High-intent traffic', body: 'Visitors come specifically to compare clinics and book. Not casual health browsers — people actively planning a procedure.' },
              { n: '02', title: 'Price-transparent market', body: 'Patients choose us because we publish real prices. Clinics that share pricing consistently convert better than those that don\'t.' },
              { n: '03', title: 'International reach', body: 'We serve patients from 40+ countries. Medical travel is a growing market and we help them find you regardless of borders.' },
            ].map((p) => (
              <div key={p.n} className="py-10 px-0 md:px-10 first:pl-0 last:pr-0 flex flex-col gap-5">
                <span className="font-mono text-[10px] text-[var(--text-3)] uppercase tracking-widest">{p.n}</span>
                <div className="w-8 h-px bg-[var(--gold)]" />
                <h3 className="font-[family-name:var(--font-syne)] font-bold text-[18px] text-[var(--text-1)] tracking-tight">{p.title}</h3>
                <p className="text-[13px] text-[var(--text-2)] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          <div className="flex items-end justify-between py-10 border-b border-[var(--border)]">
            <div className="flex items-baseline gap-5">
              <span className="font-mono text-[11px] text-[var(--text-3)] uppercase tracking-widest">02</span>
              <h2 className="font-[family-name:var(--font-syne)] font-bold text-[24px] md:text-[30px] tracking-tight text-[var(--text-1)]">
                Listing plans
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border)] py-0">
            {plans.map((plan) => (
              <div key={plan.name} className={`py-10 px-0 md:px-10 first:pl-0 last:pr-0 flex flex-col gap-6 ${plan.highlighted ? 'relative' : ''}`}>
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 md:left-10 right-0 h-0.5 bg-[var(--navy)]" />
                )}
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-[family-name:var(--font-syne)] font-bold text-[16px] text-[var(--text-1)]">{plan.name}</p>
                    {plan.highlighted && (
                      <span className="text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 bg-[var(--navy)] text-white rounded">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-[var(--text-3)]">{plan.description}</p>
                </div>

                <div className="flex items-end gap-1">
                  <span className="font-[family-name:var(--font-syne)] font-extrabold text-[3rem] leading-none text-[var(--text-1)] tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-[12px] text-[var(--text-3)] pb-1.5">/{plan.period}</span>
                </div>

                <ul className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px] text-[var(--text-2)]">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="shrink-0 mt-0.5 text-[var(--green)]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 6.5l3 3 6-5.5"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <a href={`mailto:clinics@mensclincfinder.com?subject=${encodeURIComponent(plan.name + ' listing — ' + plan.price)}`}
                  className={`flex items-center justify-center w-full py-3 rounded-lg text-[13px] font-bold transition-opacity hover:opacity-85 ${
                    plan.highlighted
                      ? 'bg-[var(--navy)] text-white'
                      : 'border border-[var(--border)] text-[var(--text-1)] hover:border-[var(--border-strong)]'
                  }`}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          <div className="flex items-end justify-between py-10 border-b border-[var(--border)]">
            <div className="flex items-baseline gap-5">
              <span className="font-mono text-[11px] text-[var(--text-3)] uppercase tracking-widest">03</span>
              <h2 className="font-[family-name:var(--font-syne)] font-bold text-[24px] md:text-[30px] tracking-tight text-[var(--text-1)]">
                How to get listed
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
            {[
              { n: '01', title: 'Contact us', body: 'Send an email with your clinic details, website and which plan interests you.' },
              { n: '02', title: 'We review', body: 'Our team checks your credentials, pricing transparency and patient feedback within 48h.' },
              { n: '03', title: 'Go live', body: 'Your clinic page is created and indexed. Standard listings go live within 24h.' },
              { n: '04', title: 'Get enquiries', body: 'Patients find you, click through to your site or contact you directly.' },
            ].map((s) => (
              <div key={s.n} className="py-10 px-0 md:px-8 first:pl-0 last:pr-0 flex flex-col gap-4">
                <span className="font-[family-name:var(--font-syne)] font-extrabold text-[2.5rem] leading-none text-[var(--border-strong)] tracking-tight">{s.n}</span>
                <p className="font-semibold text-[14px] text-[var(--text-1)]">{s.title}</p>
                <p className="text-[13px] text-[var(--text-2)] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <p className="font-[family-name:var(--font-syne)] font-extrabold text-[clamp(2rem,4vw,3rem)] leading-[0.95] tracking-[-0.03em] text-[var(--text-1)]">
                Ready to grow<br />your patient base?
              </p>
              <p className="text-[14px] text-[var(--text-3)] mt-3">Free listing available — no credit card required.</p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <a href="mailto:clinics@mensclincfinder.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--navy)] text-white text-[14px] font-bold hover:opacity-85 transition-opacity">
                Get listed today
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7h8M7 3.5L10.5 7 7 10.5"/>
                </svg>
              </a>
              <p className="text-[11px] text-[var(--text-3)] text-center">clinics@mensclincfinder.com</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
