import { Category } from './types'

export function formatPrice(amount: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPriceRange(min: number | null, max: number | null, currency = 'EUR'): string {
  if (!min && !max) return 'Price on request'
  if (min && !max) return `From ${formatPrice(min, currency)}`
  if (!min && max) return `Up to ${formatPrice(max, currency)}`
  return `${formatPrice(min!, currency)} – ${formatPrice(max!, currency)}`
}

export function formatRating(rating: number | null): string {
  if (!rating) return 'N/A'
  return rating.toFixed(1)
}

const CATEGORY_LABELS: Record<Category, string> = {
  penis_filler: 'Penile enhancement',
  trt: 'Testosterone therapy',
  ed: 'Erectile dysfunction',
  pe: 'Premature ejaculation',
  fertility: 'Male fertility',
}

const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  penis_filler: 'Dermal fillers, fat transfer, HA injections',
  trt: 'TRT, hormone panels, men\'s health programs',
  ed: 'Shockwave therapy, P-shot, medical ED treatment',
  pe: 'Nerve blocks, topical treatments, behavioural therapy',
  fertility: 'Sperm analysis, varicocele treatment, IVF prep',
}

export function getCategoryLabel(category: Category): string {
  return CATEGORY_LABELS[category]
}

export function getCategoryDescription(category: Category): string {
  return CATEGORY_DESCRIPTIONS[category]
}

export function getAllCategories(): Category[] {
  return ['penis_filler', 'trt', 'ed', 'pe', 'fertility']
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function countryFlag(country: string): string {
  const flags: Record<string, string> = {
    'United Kingdom': '🇬🇧',
    'Germany': '🇩🇪',
    'France': '🇫🇷',
    'Poland': '🇵🇱',
    'Czech Republic': '🇨🇿',
    'Hungary': '🇭🇺',
    'Turkey': '🇹🇷',
    'Thailand': '🇹🇭',
    'UAE': '🇦🇪',
    'Netherlands': '🇳🇱',
    'Spain': '🇪🇸',
    'Portugal': '🇵🇹',
    'Estonia': '🇪🇪',
    'Sweden': '🇸🇪',
    'Finland': '🇫🇮',
    'Latvia': '🇱🇻',
    'Switzerland': '🇨🇭',
    'Singapore': '🇸🇬',
  }
  return flags[country] ?? '🌍'
}
