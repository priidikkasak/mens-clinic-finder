import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[var(--navy)] mt-0">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

        {/* Main row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 py-14 border-b border-white/10">
          <div>
            <p className="font-[family-name:var(--font-syne)] font-extrabold text-[2rem] text-white tracking-tight leading-none">
              MCF
            </p>
            <p className="text-[12px] text-white/40 mt-2 max-w-xs leading-relaxed">
              The men&apos;s health clinic directory. Transparent pricing, verified providers, global coverage.
            </p>
          </div>

          <div className="flex gap-16">
            <div className="flex flex-col gap-4">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">Directory</p>
              <ul className="flex flex-col gap-2.5">
                {[
                  ['/clinics', 'All clinics'],
                  ['/clinics?region=EU', 'Europe'],
                  ['/clinics?region=World', 'Worldwide'],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="text-[13px] text-white/50 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">Company</p>
              <ul className="flex flex-col gap-2.5">
                {[
                  ['/about', 'About'],
                  ['/for-clinics', 'For clinics'],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="text-[13px] text-white/50 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-6">
          <p className="text-[11px] text-white/25">
            © {new Date().getFullYear()} MensClinicFinder. Informational purposes only.
          </p>
          <p className="text-[11px] text-white/25">
            Always consult a qualified medical professional.
          </p>
        </div>
      </div>
    </footer>
  )
}
