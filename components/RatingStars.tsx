interface RatingStarsProps {
  rating: number | null
  reviewCount?: number
  size?: 'sm' | 'md'
}

export default function RatingStars({ rating, reviewCount, size = 'md' }: RatingStarsProps) {
  if (!rating) return <span className="text-[12px] text-[var(--text-3)]">No reviews yet</span>

  const full = Math.floor(rating)
  const hasHalf = rating - full >= 0.5
  const empty = 5 - full - (hasHalf ? 1 : 0)

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`flex gap-0.5 text-[var(--gold)] ${size === 'sm' ? 'text-[12px]' : 'text-[14px]'}`} aria-hidden>
        {'★'.repeat(full)}
        {hasHalf ? <span className="opacity-50">★</span> : null}
        <span className="opacity-25">{'★'.repeat(empty)}</span>
      </span>
      <span className={`font-mono font-medium text-[var(--text-1)] ${size === 'sm' ? 'text-[12px]' : 'text-[13px]'}`}>
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className={`text-[var(--text-3)] ${size === 'sm' ? 'text-[11px]' : 'text-[12px]'}`}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </span>
  )
}
