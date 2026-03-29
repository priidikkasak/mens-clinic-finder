import { Category } from '@/lib/types'
import { getCategoryLabel } from '@/lib/utils'

interface CategoryPillProps {
  category: Category
  small?: boolean
}

export default function CategoryPill({ category, small = false }: CategoryPillProps) {
  return (
    <span
      className={`inline-block font-medium rounded-md border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-2)] ${
        small ? 'text-[11px] px-2 py-0.5 tracking-wide' : 'text-[12px] px-2.5 py-1'
      }`}
    >
      {getCategoryLabel(category)}
    </span>
  )
}
