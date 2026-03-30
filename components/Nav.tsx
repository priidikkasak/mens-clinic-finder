'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const LINKS = [
  { href: '/', label: 'Browse clinics' },
  { href: '/about', label: 'About' },
  { href: '/for-clinics', label: 'For clinics' },
]

export default function Nav() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [path])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className="nav-inner">

        {/* Logo */}
        <Link href="/" className="nav-logo" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <span className="nav-logo-mark">MCF</span>
          <span className="nav-logo-sep" />
          <span className="nav-logo-tagline">Men&apos;s Clinic Finder</span>
        </Link>

        {/* Desktop nav */}
        <nav className="desktop-nav nav-links">
          {LINKS.slice(1).map((l) => {
            const active = path.startsWith(l.href)
            return (
              <Link key={l.href} href={l.href} className={`nav-link${active ? ' nav-link--active' : ''}`}>
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="hamburger nav-hamburger"
        >
          {open
            ? <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="4" x2="16" y2="16"/><line x1="16" y1="4" x2="4" y2="16"/></svg>
            : <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="2" y1="5.5" x2="18" y2="5.5"/><line x1="2" y1="10.5" x2="18" y2="10.5"/><line x1="2" y1="15.5" x2="18" y2="15.5"/></svg>
          }
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="nav-mobile">
          {LINKS.map((l) => {
            const active = l.href === '/' ? path === '/' : path.startsWith(l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`nav-mobile-link${active ? ' nav-mobile-link--active' : ''}`}
              >
                <span>{l.label}</span>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 16 16">
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
