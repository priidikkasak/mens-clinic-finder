export default function VerifiedBadge({ size = 'md' }: { size?: 'sm' | 'md' }) {
  return (
    <span className={`inline-flex items-center gap-1 font-semibold uppercase tracking-[0.08em] text-[var(--green)] bg-[var(--green-bg)] rounded ${
      size === 'sm' ? 'text-[9px] px-1.5 py-0.5' : 'text-[10px] px-2 py-1'
    }`}>
      <svg width="7" height="7" viewBox="0 0 7 7" aria-hidden>
        <path d="M1 3.5L2.8 5.5L6 1.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Verified
    </span>
  )
}
