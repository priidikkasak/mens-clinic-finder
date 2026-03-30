'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const LINKS = [
  { href: '/about', label: 'About' },
  { href: '/for-clinics', label: 'For clinics' },
]

export default function Nav() {
  const path = usePathname()
  const [open, setOpen] = useState(false)

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
        </nav>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
          <Link href="/" className="nav-for-clinics for-clinics-link">
            Browse clinics
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="hamburger nav-hamburger"
          >
            {open
              ? <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><line x1="3" y1="3" x2="12" y2="12"/><line x1="12" y1="3" x2="3" y2="12"/></svg>
              : <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><line x1="2" y1="4.5" x2="13" y2="4.5"/><line x1="2" y1="8.5" x2="13" y2="8.5"/><line x1="2" y1="12.5" x2="13" y2="12.5"/></svg>
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="mobile-menu nav-mobile">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link href="/" onClick={() => setOpen(false)} style={{
              fontSize: 15, fontWeight: path === '/' ? 600 : 400,
              color: path === '/' ? 'var(--text-1)' : 'var(--text-2)',
              padding: '0.875rem 0',
              borderBottom: '1px solid var(--border)',
              textDecoration: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              Browse clinics
              {path === '/' && <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }} />}
            </Link>
            {LINKS.map((l) => {
              const active = path.startsWith(l.href)
              return (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                  fontSize: 15, fontWeight: active ? 600 : 400,
                  color: active ? 'var(--text-1)' : 'var(--text-2)',
                  padding: '0.875rem 0',
                  borderBottom: '1px solid var(--border)',
                  textDecoration: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  {l.label}
                  {active && <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }} />}
                </Link>
              )
            })}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 640px) { .sm-show { display: block !important; } }
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .hamburger { display: none !important; }
          .for-clinics-link { display: flex !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .for-clinics-link { display: none !important; }
        }
      `}</style>
    </header>
  )
}
