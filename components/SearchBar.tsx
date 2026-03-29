'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchBar() {
  const router = useRouter()
  const [value, setValue] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = value.trim()
    router.push(q ? `/clinics?country=${encodeURIComponent(q)}` : '/clinics')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-lg">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by country or city..."
        className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[14px] text-[var(--text-1)] placeholder-[var(--text-3)] focus:outline-none focus:border-[var(--border-hover)] transition-colors"
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-lg bg-[var(--ink)] text-[var(--ink-fg)] text-[14px] font-semibold hover:opacity-85 transition-opacity"
      >
        Search
      </button>
    </form>
  )
}
