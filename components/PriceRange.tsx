import { formatPriceRange } from '@/lib/utils'

interface PriceRangeProps {
  min: number | null
  max: number | null
  currency?: string
  className?: string
}

export default function PriceRange({ min, max, currency = 'EUR', className = '' }: PriceRangeProps) {
  return (
    <span className={`font-mono font-semibold text-[var(--text-1)] ${className}`}>
      {formatPriceRange(min, max, currency)}
    </span>
  )
}
