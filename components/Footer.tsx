import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="flex flex-col gap-3">
            <p className="font-semibold text-[15px] text-[var(--text-1)]">MensClinicFinder</p>
            <p className="text-[13px] text-[var(--text-3)] max-w-xs leading-relaxed">
              The world&apos;s most trusted men&apos;s health clinic directory. Transparent pricing, verified providers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-10">
            <div className="flex flex-col gap-3">
              <p className="text-[11px] uppercase tracking-[0.12em] font-medium text-[var(--text-3)]">Directory</p>
              <ul className="flex flex-col gap-2.5">
                {[
                  { href: '/clinics', label: 'All clinics' },
                  { href: '/clinics?region=EU', label: 'Europe' },
                  { href: '/clinics?region=World', label: 'Worldwide' },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[13px] text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[11px] uppercase tracking-[0.12em] font-medium text-[var(--text-3)]">Company</p>
              <ul className="flex flex-col gap-2.5">
                {[
                  { href: '/about', label: 'About' },
                  { href: '/for-clinics', label: 'For clinics' },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[13px] text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-[12px] text-[var(--text-3)]">
            © {new Date().getFullYear()} MensClinicFinder. Informational purposes only.
          </p>
          <p className="text-[12px] text-[var(--text-3)]">
            Always consult a qualified medical professional before any procedure.
          </p>
        </div>
      </div>
    </footer>
  )
}
