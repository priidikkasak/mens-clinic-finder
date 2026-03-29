import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'List Your Clinic',
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
    features: ['Everything in Standard', 'Verified badge', 'Priority in search results', 'Credential review process', 'Email support'],
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
      <section className="border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--text-3)] mb-4">For clinic owners</p>
          <h1 className="text-[clamp(2.4rem,5vw,4.5rem)] font-[family-name:var(--font-display)] text-[var(--text-1)] leading-[1.05] tracking-[-0.02em] mb-6 max-w-2xl">
            Reach patients who are ready to act.
          </h1>
          <p className="text-[17px] text-[var(--text-2)] max-w-xl leading-relaxed mb-8">
            MensClinicFinder connects men actively comparing clinics with verified providers like yours. Our visitors have high intent — they&apos;re not browsing, they&apos;re deciding.
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[var(--ink)] text-[var(--ink-fg)] text-[14px] font-semibold hover:opacity-85 transition-opacity"
          >
            View listing plans
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5"><path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </section>

      {/* Why list */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-20">
        <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--text-3)] mb-10">Why it works</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { n: '01', title: 'High-intent traffic', body: 'Visitors come to us specifically to compare clinics and book. Not casual health browsers — people actively planning a procedure.' },
            { n: '02', title: 'Price-transparent market', body: 'Patients choose us because we publish real prices. Clinics that share pricing consistently convert better than those that don\'t.' },
            { n: '03', title: 'International reach', body: 'We serve patients from 40+ countries. Medical travel is a growing market and we help them find you regardless of borders.' },
          ].map((p) => (
            <div key={p.n} className="flex flex-col gap-4 p-6 bg-[var(--surface)] rounded-xl border border-[var(--border)]">
              <span className="text-[11px] font-mono text-[var(--text-3)]">{p.n}</span>
              <div className="w-8 h-px bg-[var(--gold)]" />
              <h3 className="font-semibold text-[16px] text-[var(--text-1)]">{p.title}</h3>
              <p className="text-[13px] text-[var(--text-2)] leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--text-3)] mb-3">Pricing</p>
          <h2 className="text-[30px] font-semibold text-[var(--text-1)] tracking-tight mb-12">Simple, transparent plans.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col rounded-2xl border p-7 ${
                  plan.highlighted
                    ? 'bg-[var(--ink)] border-[var(--ink)] text-[var(--ink-fg)]'
                    : 'bg-[var(--bg)] border-[var(--border)]'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-1">
                  <p className={`font-semibold text-[16px] ${plan.highlighted ? 'text-[var(--ink-fg)]' : 'text-[var(--text-1)]'}`}>
                    {plan.name}
                  </p>
                  {plan.highlighted && (
                    <span className="text-[10px] font-semibold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full bg-[var(--gold)] text-[var(--ink)]">
                      Popular
                    </span>
                  )}
                </div>
                <p className={`text-[12px] mb-5 ${plan.highlighted ? 'text-[#A09880]' : 'text-[var(--text-3)]'}`}>
                  {plan.description}
                </p>
                <div className="flex items-end gap-1 mb-6">
                  <span className={`font-[family-name:var(--font-display)] text-[2.8rem] leading-none ${plan.highlighted ? 'text-[var(--ink-fg)]' : 'text-[var(--text-1)]'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-[12px] pb-1.5 ${plan.highlighted ? 'text-[#A09880]' : 'text-[var(--text-3)]'}`}>
                    /{plan.period}
                  </span>
                </div>
                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px]">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`shrink-0 mt-0.5 ${plan.highlighted ? 'text-[var(--gold)]' : 'text-[var(--green)]'}`} stroke="currentColor" strokeWidth="1.5">
                        <path d="M2.5 7l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className={plan.highlighted ? 'text-[#C8C0B0]' : 'text-[var(--text-2)]'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:clinics@mensclincfinder.com?subject=${encodeURIComponent(plan.name + ' listing — ' + plan.price)}`}
                  className={`flex items-center justify-center w-full py-3 rounded-lg text-[14px] font-semibold transition-opacity hover:opacity-85 ${
                    plan.highlighted
                      ? 'bg-[var(--ink-fg)] text-[var(--ink)]'
                      : 'bg-[var(--ink)] text-[var(--ink-fg)]'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--text-3)] mb-4">Get in touch</p>
            <h2 className="text-[26px] font-semibold text-[var(--text-1)] tracking-tight mb-4">Any questions?</h2>
            <p className="text-[15px] text-[var(--text-2)] leading-relaxed mb-6">
              We respond within one business day. Tell us about your clinic and we&apos;ll help find the right plan.
            </p>
            <div className="flex flex-col gap-3 text-[13px] text-[var(--text-2)]">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-3)]"><rect x="1" y="3" width="12" height="9" rx="1" /><path d="M1 4l6 5 6-5" strokeLinecap="round" /></svg>
                clinics@mensclincfinder.com
              </div>
            </div>
          </div>

          <form
            action="mailto:clinics@mensclincfinder.com"
            method="get"
            encType="text/plain"
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-[0.12em] font-medium text-[var(--text-3)]">Your name</label>
                <input name="name" type="text" required placeholder="Dr. Jane Smith" className="px-4 py-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[14px] text-[var(--text-1)] placeholder-[var(--text-3)] focus:outline-none focus:border-[var(--border-hover)] transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-[0.12em] font-medium text-[var(--text-3)]">Clinic name</label>
                <input name="clinic" type="text" required placeholder="Your clinic" className="px-4 py-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[14px] text-[var(--text-1)] placeholder-[var(--text-3)] focus:outline-none focus:border-[var(--border-hover)] transition-colors" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-[0.12em] font-medium text-[var(--text-3)]">Website</label>
              <input name="website" type="url" placeholder="https://yourclinic.com" className="px-4 py-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[14px] text-[var(--text-1)] placeholder-[var(--text-3)] focus:outline-none focus:border-[var(--border-hover)] transition-colors" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-[0.12em] font-medium text-[var(--text-3)]">Message</label>
              <textarea name="body" rows={4} required placeholder="Tell us about your clinic and which plan interests you..." className="px-4 py-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[14px] text-[var(--text-1)] placeholder-[var(--text-3)] focus:outline-none focus:border-[var(--border-hover)] transition-colors resize-none" />
            </div>
            <button type="submit" className="flex items-center justify-center gap-2 py-3 rounded-lg bg-[var(--ink)] text-[var(--ink-fg)] text-[14px] font-semibold hover:opacity-85 transition-opacity">
              Send message
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
