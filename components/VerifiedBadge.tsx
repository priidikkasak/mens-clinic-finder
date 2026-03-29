interface VerifiedBadgeProps {
  size?: 'sm' | 'md'
}

export default function VerifiedBadge({ size = 'md' }: VerifiedBadgeProps) {
  return (
    <span
      title="Verified clinic"
      className={`inline-flex items-center gap-1.5 font-medium text-[var(--green)] bg-[var(--green-light)] border border-green-200 rounded-full ${
        size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-[11px] px-2.5 py-1'
      }`}
    >
      <svg width="7" height="7" viewBox="0 0 7 7" fill="currentColor" aria-hidden>
        <circle cx="3.5" cy="3.5" r="3.5" />
      </svg>
      Verified
    </span>
  )
}
