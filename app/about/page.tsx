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
      <section className="border-b border-[var(--border)] min-h-[50vh] flex items-end">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-16 w-full">
          <div className="flex items-baseline gap-5 mb-6">
            <span className="font-mono text-[10px] text-[var(--text-3)] uppercase tracking-widest">About</span>
          </div>
          <h1 className="font-[family-name:var(--font-syne)] font-extrabold leading-[0.9] tracking-[-0.04em] text-[var(--text-1)] mb-8"
            style={{ fontSize: 'clamp(3rem,7vw,7rem)' }}>
            MEN DESERVE<br />
            <span className="text-[var(--border-strong)]">BETTER INFO.</span>
          </h1>
          <p className="text-[17px] text-[var(--text-2)] max-w-2xl leading-relaxed">
            MensClinicFinder exists to make finding a men&apos;s health clinic as straightforward as booking a flight —
            transparent pricing, verifiable credentials, and zero embarrassment.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          <div className="flex items-end justify-between py-10 border-b border-[var(--border)]">
            <div className="flex items-baseline gap-5">
              <span className="font-mono text-[11px] text-[var(--text-3)] uppercase tracking-widest">01</span>
              <h2 className="font-[family-name:var(--font-syne)] font-bold text-[24px] md:text-[30px] tracking-tight text-[var(--text-1)]">
                The problem we&apos;re solving
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] py-12 gap-12 lg:gap-0">
            <div className="flex flex-col gap-6 text-[15px] text-[var(--text-2)] leading-relaxed lg:pr-12 lg:border-r border-[var(--border)]">
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
                and real credentials you can verify.
              </p>
            </div>
            <div className="lg:pl-12 flex flex-col gap-4">
              {[
                { n: '25+', l: 'Verified clinics' },
                { n: '18', l: 'Countries covered' },
                { n: '5', l: 'Specialisations' },
              ].map((s) => (
                <div key={s.l} className="border-b border-[var(--border)] pb-4 last:border-0 last:pb-0">
                  <p className="font-[family-name:var(--font-syne)] font-extrabold text-[2.5rem] leading-none text-[var(--text-1)] tracking-tight">{s.n}</p>
                  <p className="text-[11px] text-[var(--text-3)] uppercase tracking-wider mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          <div className="flex items-end justify-between py-10 border-b border-[var(--border)]">
            <div className="flex items-baseline gap-5">
              <span className="font-mono text-[11px] text-[var(--text-3)] uppercase tracking-widest">02</span>
              <h2 className="font-[family-name:var(--font-syne)] font-bold text-[24px] md:text-[30px] tracking-tight text-[var(--text-1)]">
                What we stand for
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
            {[
              {
                n: '01',
                title: 'Honest pricing',
                body: '"Call for a quote" is a red flag. We require published price ranges so you can compare before ever making contact.',
              },
              {
                n: '02',
                title: 'Verified credentials',
                body: 'Our verified badge requires confirmed medical licensing, facility standards and patient feedback — not self-reported claims.',
              },
              {
                n: '03',
                title: 'Complete privacy',
                body: 'No account needed. We don\'t sell data or retarget ads. What you search is your business, not ours.',
              },
              {
                n: '04',
                title: 'Global options',
                body: 'Quality care exists at every price point worldwide. We list clinics globally so geography doesn\'t limit your choices.',
              },
            ].map((p) => (
              <div key={p.n} className="py-10 px-0 sm:px-8 first:pl-0 last:pr-0 flex flex-col gap-5">
                <span className="font-mono text-[10px] text-[var(--text-3)] uppercase tracking-widest">{p.n}</span>
                <div className="w-8 h-px bg-[var(--gold)]" />
                <h3 className="font-[family-name:var(--font-syne)] font-bold text-[17px] text-[var(--text-1)] tracking-tight">{p.title}</h3>
                <p className="text-[13px] text-[var(--text-2)] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          <div className="flex items-end justify-between py-10 border-b border-[var(--border)]">
            <div className="flex items-baseline gap-5">
              <span className="font-mono text-[11px] text-[var(--text-3)] uppercase tracking-widest">03</span>
              <h2 className="font-[family-name:var(--font-syne)] font-bold text-[24px] md:text-[30px] tracking-tight text-[var(--text-1)]">
                Medical disclaimer
              </h2>
            </div>
          </div>
          <div className="py-10 max-w-3xl">
            <p className="text-[14px] text-[var(--text-2)] leading-relaxed">
              MensClinicFinder is an informational directory. We do not provide medical advice and do not endorse any specific clinic or treatment.
              Always consult a qualified medical professional before undertaking any procedure. Clinic information is provided in good faith but may
              change — verify directly with any clinic before booking.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <p className="font-[family-name:var(--font-syne)] font-extrabold text-[clamp(2rem,4vw,3rem)] leading-[0.95] tracking-[-0.03em] text-[var(--text-1)]">
              Ready to find<br />the right clinic?
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <Link href="/clinics"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[var(--navy)] text-white text-[14px] font-bold hover:opacity-85 transition-opacity">
                Browse clinics
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7h8M7 3.5L10.5 7 7 10.5"/>
                </svg>
              </Link>
              <Link href="/for-clinics"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-[var(--border)] text-[var(--text-1)] text-[14px] font-semibold hover:border-[var(--border-strong)] transition-colors">
                List your clinic
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
