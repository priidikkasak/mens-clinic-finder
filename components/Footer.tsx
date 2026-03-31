import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="pg-w">

        <div className="footer-top">
          <div className="footer-brand-area">
            <span className="footer-logo-mark">MCF</span>
            <p className="footer-logo-tagline">Men&apos;s Clinic Finder</p>
            <p className="footer-disclaimer">
              Always consult a qualified medical professional
              before proceeding with any treatment.
            </p>
          </div>

          <div className="footer-col">
            <p className="footer-col-head">Directory</p>
            <Link href="/" className="footer-link">Browse clinics</Link>
            <Link href="/?region=EU" className="footer-link">Europe</Link>
            <Link href="/?region=World" className="footer-link">Worldwide</Link>
          </div>

          <div className="footer-col">
            <p className="footer-col-head">Company</p>
            <Link href="/about" className="footer-link">About</Link>
            <Link href="/for-clinics" className="footer-link">For clinics</Link>
          </div>

          <div className="footer-col">
            <p className="footer-col-head">Contact</p>
            <a href="mailto:clinics@mensclincfinder.com" className="footer-link">clinics@mensclincfinder.com</a>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} MensClinicFinder
        </div>

      </div>
    </footer>
  )
}
