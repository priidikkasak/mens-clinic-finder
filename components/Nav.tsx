'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const LINKS = [
  { href: '/clinics', label: 'Browse clinics' },
  { href: '/about', label: 'About' },
  { href: '/for-clinics', label: 'For clinics' },
]

export default function Nav() {
  const path = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(255,255,255,0.96)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--border)',
      height: 56,
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 1.5rem',
        height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem',
      }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
          <span style={{
            fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 16,
            letterSpacing: '-0.03em', color: 'var(--text-1)',
          }}>MCF</span>
          <span style={{ width: 1, height: 16, background: 'var(--border)', display: 'block' }} />
          <span style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.04em', display: 'none' }}
            className="sm-show">Men&apos;s Health</span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}
          className="desktop-nav">
          {LINKS.slice(0, 2).map((l) => {
            const active = path.startsWith(l.href)
            return (
              <Link key={l.href} href={l.href} style={{
                fontSize: 13, fontWeight: 500,
                padding: '0.4rem 0.75rem', borderRadius: 6,
                textDecoration: 'none',
                color: active ? 'var(--text-1)' : 'var(--text-2)',
                background: active ? 'var(--surface)' : 'transparent',
                transition: 'color 0.12s, background 0.12s',
              }}
              onMouseEnter={(e) => { if (!active) { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-1)'; (e.currentTarget as HTMLAnchorElement).style.background = 'var(--surface)' } }}
              onMouseLeave={(e) => { if (!active) { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-2)'; (e.currentTarget as HTMLAnchorElement).style.background = 'transparent' } }}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          <Link href="/for-clinics" style={{
            fontSize: 12, color: 'var(--text-3)',
            textDecoration: 'none', fontWeight: 500,
            transition: 'color 0.12s',
          }}
          className="for-clinics-link"
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-2)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
          >
            For clinics
          </Link>

          <Link href="/clinics" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 700,
            padding: '0.5rem 1.125rem', borderRadius: 7,
            background: 'var(--grad-primary)', color: 'white',
            textDecoration: 'none',
            boxShadow: '0 1px 8px rgba(12,28,46,0.2)',
            transition: 'opacity 0.12s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          className="cta-btn"
          >
            Find a clinic
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 36, height: 36, borderRadius: 7,
              border: '1px solid var(--border)', background: 'white',
              cursor: 'pointer',
            }}
            className="hamburger"
          >
            {open
              ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
              : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><line x1="2" y1="5" x2="14" y2="5"/><line x1="2" y1="9" x2="14" y2="9"/><line x1="2" y1="13" x2="14" y2="13"/></svg>
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          borderTop: '1px solid var(--border)',
          background: 'white',
          padding: '0.75rem 1.5rem 1.25rem',
        }}
        className="mobile-menu">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
            {LINKS.map((l) => {
              const active = path.startsWith(l.href)
              return (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                  fontSize: 14, fontWeight: active ? 600 : 400,
                  color: active ? 'var(--text-1)' : 'var(--text-2)',
                  padding: '0.75rem 0',
                  borderBottom: '1px solid var(--border)',
                  textDecoration: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  {l.label}
                  {active && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--navy)' }} />}
                </Link>
              )
            })}
          </div>
          <Link href="/clinics" onClick={() => setOpen(false)} style={{
            marginTop: '1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '0.75rem', borderRadius: 8,
            background: 'var(--grad-primary)', color: 'white',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
          }}>
            Find a clinic
            <svg width="13" height="13" fill="none" viewBox="0 0 13 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 6.5h8M6.5 3l3.5 3.5L6.5 10"/>
            </svg>
          </Link>
        </div>
      )}

      <style>{`
        @media (min-width: 640px) { .sm-show { display: block !important; } }
        @media (min-width: 768px) { .desktop-nav { display: flex !important; } .hamburger { display: none !important; } .for-clinics-link { display: block !important; } }
        @media (max-width: 767px) { .desktop-nav { display: none !important; } .for-clinics-link { display: none !important; } .mobile-menu { display: block; } }
        @media (min-width: 640px) { .cta-btn { display: inline-flex !important; } }
        @media (max-width: 639px) { .cta-btn { display: none !important; } }
      `}</style>
    </header>
  )
}
