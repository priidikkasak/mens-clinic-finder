export type Category = 'penis_filler' | 'trt' | 'ed' | 'pe' | 'fertility'
export type Region = 'EU' | 'World'

export interface Clinic {
  id: string
  slug: string
  name: string
  city: string
  country: string
  region: Region
  categories: Category[]
  price_min: number | null
  price_max: number | null
  currency: string
  rating: number | null
  review_count: number
  verified: boolean
  premium: boolean
  languages: string[] | null
  description: string | null
  website_url: string | null
  contact_url: string | null
  address: string | null
  phone: string | null
  founded_year: number | null
  created_at: string
  updated_at: string
}

export interface ClinicFilters {
  category?: Category
  region?: Region
  country?: string
  priceMin?: number
  priceMax?: number
  minRating?: number
  verifiedOnly?: boolean
  sort?: 'price_asc' | 'price_desc' | 'rating' | 'newest'
  page?: number
}
