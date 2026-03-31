'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const LINKS = [
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const path = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [path])

  return (
    <header className="site-header">
      <div className="nav-inner">

        {/* Logo */}
        <Link href="/" className="nav-logo" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <span className="nav-logo-mark">MCF</span>
          <span className="nav-logo-sep" />
          <span className="nav-logo-tagline">Men&apos;s Clinic Finder</span>
        </Link>

        {/* Desktop nav */}
        <nav className="desktop-nav nav-links">
          {LINKS.map((l) => {
            const active = path.startsWith(l.href)
            return (
              <Link key={l.href} href={l.href} className={`nav-link${active ? ' nav-link--active' : ''}`}>
                {l.label}
              </Link>
            )
          })}
          <Link
            href="/for-clinics"
            className={`nav-cta${path.startsWith('/for-clinics') ? ' nav-link--active' : ''}`}
          >
            For clinics
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="hamburger nav-hamburger"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <line x1="2" y1="5.5" x2="18" y2="5.5"/>
            <line x1="2" y1="10.5" x2="18" y2="10.5"/>
            <line x1="2" y1="15.5" x2="18" y2="15.5"/>
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="nav-mobile">
          {[{ href: '/', label: 'Browse clinics' }, { href: '/about', label: 'About' }, { href: '/for-clinics', label: 'For clinics' }].map((l) => {
            const active = l.href === '/' ? path === '/' : path.startsWith(l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`nav-mobile-link${active ? ' nav-mobile-link--active' : ''}`}
              >
                <span>{l.label}</span>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 16 16">
                  <path d="M6 12l4-4-4-4"/>
                </svg>
              </Link>
            )
          })}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .hamburger { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </header>
  )
}
