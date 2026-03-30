import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="pg-w footer-inner">

        <div className="footer-brand-col">
          <span className="footer-brand-mark">MCF</span>
          <span className="footer-brand-sep">·</span>
          <span className="footer-brand-tagline">Men&apos;s Clinic Finder</span>
        </div>

        <nav className="footer-nav-links">
          {[
            ['/clinics', 'All clinics'],
            ['/about', 'About'],
            ['/for-clinics', 'For clinics'],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="footer-link">{label}</Link>
          ))}
        </nav>

        <p className="footer-copy">
          © {new Date().getFullYear()} MensClinicFinder
        </p>

      </div>
    </footer>
  )
}
