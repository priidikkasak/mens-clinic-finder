import { Category } from '@/lib/types'
import { getCategoryLabel } from '@/lib/utils'

export default function CategoryPill({ category, small = false }: { category: Category; small?: boolean }) {
  return (
    <span className={`inline-block font-medium uppercase tracking-wide border border-[var(--border)] rounded text-[var(--text-2)] bg-[var(--surface)] ${
      small ? 'text-[9px] px-2 py-0.5' : 'text-[10px] px-2.5 py-1'
    }`}>
      {getCategoryLabel(category)}
    </span>
  )
}
