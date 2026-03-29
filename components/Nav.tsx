'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Nav() {
  const path = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[var(--border)]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 h-14 flex items-center justify-between gap-8">

        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="font-[family-name:var(--font-syne)] font-bold text-[15px] tracking-tight text-[var(--text-1)]">
            MCF
          </span>
          <span className="hidden sm:block w-px h-4 bg-[var(--border)]" />
          <span className="hidden sm:block text-[12px] text-[var(--text-3)] tracking-wide">
            Men&apos;s Health Directory
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { href: '/clinics', label: 'Browse clinics' },
            { href: '/about', label: 'About' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[13px] px-3.5 py-2 rounded-md transition-colors ${
                path.startsWith(l.href)
                  ? 'text-[var(--text-1)] bg-[var(--surface)]'
                  : 'text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--surface)]'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/clinics"
            className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-semibold px-4 py-2 rounded-md bg-[var(--navy)] text-white hover:opacity-85 transition-opacity"
          >
            Find a clinic
          </Link>
          <Link
            href="/for-clinics"
            className="hidden md:inline-flex text-[13px] text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors"
          >
            For clinics
          </Link>

          <button
            className="md:hidden p-1.5 rounded-md hover:bg-[var(--surface)] transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {open
                ? <><line x1="4" y1="4" x2="14" y2="14" /><line x1="14" y1="4" x2="4" y2="14" /></>
                : <><line x1="3" y1="5" x2="15" y2="5" /><line x1="3" y1="9" x2="15" y2="9" /><line x1="3" y1="13" x2="15" y2="13" /></>}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-white px-6 py-4 flex flex-col gap-1">
          {[
            { href: '/clinics', label: 'Browse clinics' },
            { href: '/for-clinics', label: 'For clinics' },
            { href: '/about', label: 'About' },
          ].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-[14px] text-[var(--text-2)] py-2.5 border-b border-[var(--border)] last:border-0">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
