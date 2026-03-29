import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Our mission: price transparency and helping men find vetted clinics without embarrassment.',
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--text-3)] mb-4">About</p>
          <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-[family-name:var(--font-display)] text-[var(--text-1)] leading-[1.07] tracking-[-0.02em] mb-6">
            Men deserve better healthcare information.
          </h1>
          <p className="text-[17px] text-[var(--text-2)] leading-relaxed">
            MensClinicFinder exists to make finding a men&apos;s health clinic as straightforward as booking a flight — transparent pricing, verifiable credentials, and zero embarrassment.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-3xl mx-auto px-5 sm:px-8 py-16">
        <div className="flex flex-col gap-8 text-[15px] text-[var(--text-2)] leading-relaxed">

          <div className="flex flex-col gap-4">
            <h2 className="text-[22px] font-semibold text-[var(--text-1)]">The problem we&apos;re solving</h2>
            <p>
              Men&apos;s health is under-served and over-stigmatised. Finding a clinic for testosterone replacement, erectile dysfunction or penile enhancement currently means trawling forums, decoding vague pricing pages, and wondering whether a provider is actually qualified.
            </p>
            <p>
              This is a solvable problem. We built a directory that treats men as informed adults and demands the same standard of transparency from every clinic we feature.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-4">
            {[
              {
                title: 'Honest pricing',
                body: '"Call for a quote" is a red flag. We require published price ranges so you can compare before you ever make contact.',
              },
              {
                title: 'Verified credentials',
                body: 'Our verified badge requires us to confirm medical licensing, facility standards and patient feedback — not self-reported claims.',
              },
              {
                title: 'Your privacy',
                body: 'No account needed. We don\'t sell data or retarget ads. What you search is your business, not ours.',
              },
              {
                title: 'Global options',
                body: 'Quality care exists at every price point worldwide. We list clinics globally so geography doesn\'t limit your choices.',
              },
            ].map((p) => (
              <div key={p.title} className="flex flex-col gap-2.5 p-5 bg-[var(--surface)] rounded-xl border border-[var(--border)]">
                <div className="w-6 h-px bg-[var(--gold)]" />
                <p className="font-semibold text-[15px] text-[var(--text-1)]">{p.title}</p>
                <p className="text-[13px] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-[22px] font-semibold text-[var(--text-1)]">Disclaimer</h2>
            <p className="text-[13px] leading-relaxed bg-[var(--surface-2)] rounded-xl p-5 border border-[var(--border)]">
              MensClinicFinder is an informational directory. We do not provide medical advice and do not endorse any specific clinic or treatment. Always consult a qualified medical professional before undertaking any procedure. Clinic information is provided in good faith but may change — verify directly with any clinic before booking.
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-12">
          <Link href="/clinics" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--ink)] text-[var(--ink-fg)] text-[14px] font-semibold hover:opacity-85 transition-opacity">
            Browse clinics
          </Link>
          <Link href="/for-clinics" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--text-1)] text-[14px] font-medium hover:border-[var(--border-hover)] transition-colors">
            List your clinic
          </Link>
        </div>
      </section>
    </div>
  )
}
