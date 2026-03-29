'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/clinics', label: 'Browse clinics' },
    { href: '/about', label: 'About' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)]/95 backdrop-blur-sm border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[60px] flex items-center justify-between">
        <Link href="/" className="font-semibold text-[15px] tracking-tight text-[var(--text-1)] hover:opacity-70 transition-opacity">
          MensClinicFinder
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[14px] transition-colors ${
                pathname.startsWith(l.href)
                  ? 'text-[var(--text-1)] font-medium'
                  : 'text-[var(--text-2)] hover:text-[var(--text-1)]'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/for-clinics"
            className="text-[13px] font-medium px-4 py-2 rounded-lg bg-[var(--ink)] text-[var(--ink-fg)] hover:opacity-80 transition-opacity"
          >
            List your clinic
          </Link>
        </nav>

        <button
          className="md:hidden p-2 -mr-2 text-[var(--text-2)]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {open ? (
              <><line x1="4" y1="4" x2="14" y2="14" /><line x1="14" y1="4" x2="4" y2="14" /></>
            ) : (
              <><line x1="3" y1="5" x2="15" y2="5" /><line x1="3" y1="9" x2="15" y2="9" /><line x1="3" y1="13" x2="15" y2="13" /></>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)] px-5 py-5 flex flex-col gap-5">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-[15px] text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/for-clinics" onClick={() => setOpen(false)} className="text-[14px] font-medium px-4 py-2.5 rounded-lg bg-[var(--ink)] text-[var(--ink-fg)] text-center">
            List your clinic
          </Link>
        </div>
      )}
    </header>
  )
}
