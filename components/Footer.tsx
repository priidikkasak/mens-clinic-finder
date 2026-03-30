import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer">

      {/* Main footer body */}
      <div className="pg-w footer-body">

        {/* Slogan strip */}
        <div className="footer-slogan-strip">
          <p className="footer-slogan">Find the right clinic.<span className="footer-slogan-accent"> Discreetly.</span></p>
          <p className="footer-slogan-sub">The men&apos;s health clinic directory — verified providers, transparent pricing, global coverage.</p>
        </div>

        {/* Links grid */}
        <div className="footer-links">

          <div className="footer-brand">
            <p className="footer-brand-mark">MCF</p>
            <p className="footer-brand-copy">© {new Date().getFullYear()} MensClinicFinder</p>
            <p className="footer-disclaimer">Always consult a qualified medical professional before proceeding with any treatment.</p>
          </div>

          <div className="footer-col">
            <p className="footer-col-head">Directory</p>
            {[
              ['/clinics', 'All clinics'],
              ['/clinics?region=EU', 'Europe'],
              ['/clinics?region=World', 'Worldwide'],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="footer-link">{label}</Link>
            ))}
          </div>

          <div className="footer-col">
            <p className="footer-col-head">Company</p>
            {[
              ['/about', 'About'],
              ['/for-clinics', 'For clinics'],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="footer-link">{label}</Link>
            ))}
          </div>

        </div>

      </div>

    </footer>
  )
}
