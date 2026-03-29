import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)' }}>
      <div className="pg-w" style={{ paddingTop: '3.5rem', paddingBottom: '2rem' }}>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto]" style={{ gap: '3rem', paddingBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>

          <div>
            <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '1.4rem', color: 'white', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>MCF</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, maxWidth: 260 }}>
              The men&apos;s health clinic directory. Transparent pricing, verified providers, global coverage.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.25)', marginBottom: '0.25rem' }}>Directory</p>
            {[
              ['/clinics', 'All clinics'],
              ['/clinics?region=EU', 'Europe'],
              ['/clinics?region=World', 'Worldwide'],
            ].map(([href, label]) => (
              <Link key={href} href={href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.25)', marginBottom: '0.25rem' }}>Company</p>
            {[
              ['/about', 'About'],
              ['/for-clinics', 'For clinics'],
            ].map(([href, label]) => (
              <Link key={href} href={href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ paddingTop: '1.5rem', gap: '0.5rem' }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} MensClinicFinder. Informational purposes only.
          </p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }} className="sm:text-right">
            Always consult a qualified medical professional.
          </p>
        </div>
      </div>
    </footer>
  )
}
