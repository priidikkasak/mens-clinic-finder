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
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
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
            fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 15,
            letterSpacing: '-0.04em', color: 'var(--text-1)',
          }}>MCF</span>
          <span style={{ width: 1, height: 14, background: 'var(--border)', display: 'block' }} />
          <span style={{
            fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.05em',
            fontFamily: 'var(--font-geist-mono)',
          }}
            className="sm-show">Men&apos;s Health</span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}
          className="desktop-nav">
          {LINKS.slice(0, 2).map((l) => {
            const active = path.startsWith(l.href)
            return (
              <Link key={l.href} href={l.href} style={{
                fontSize: 13, fontWeight: active ? 600 : 500,
                padding: '0.4rem 0.75rem', borderRadius: 7,
                textDecoration: 'none',
                color: active ? 'var(--text-1)' : 'var(--text-2)',
                background: active ? 'var(--surface)' : 'transparent',
                transition: 'color 0.12s, background 0.12s',
              }}
              onMouseEnter={(e) => { if (!active) { const el = e.currentTarget as HTMLAnchorElement; el.style.color = 'var(--text-1)'; el.style.background = 'var(--surface)' } }}
              onMouseLeave={(e) => { if (!active) { const el = e.currentTarget as HTMLAnchorElement; el.style.color = 'var(--text-2)'; el.style.background = 'transparent' } }}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
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

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 36, height: 36, borderRadius: 8,
              border: '1.5px solid var(--border)', background: 'white',
              cursor: 'pointer', transition: 'border-color 0.12s',
            }}
            className="hamburger"
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
        <div style={{
          borderTop: '1px solid var(--border)',
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(12px)',
          padding: '0.625rem 1.5rem 1.25rem',
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
        </div>
      )}

      <style>{`
        @media (min-width: 640px) { .sm-show { display: block !important; } }
        @media (min-width: 768px) { .desktop-nav { display: flex !important; } .hamburger { display: none !important; } .for-clinics-link { display: block !important; } }
        @media (max-width: 767px) { .desktop-nav { display: none !important; } .for-clinics-link { display: none !important; } }
      `}</style>
    </header>
  )
}
