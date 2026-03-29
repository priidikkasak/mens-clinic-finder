import { Clinic } from './types'

// 25 mock clinics — 5 per category — used when Supabase is not configured
export const MOCK_CLINICS: Clinic[] = [
  // ── PENILE ENHANCEMENT (5) ──────────────────────────────
  {
    id: 'm1', slug: 'androfill-london', name: 'Androfill London', city: 'London',
    country: 'United Kingdom', region: 'EU', categories: ['penis_filler'],
    price_min: 1800, price_max: 3500, currency: 'EUR', rating: 4.8, review_count: 214,
    verified: true, premium: true, languages: ['English'],
    description: 'London\'s leading penile enhancement clinic. Specialist injectors with 1,000+ procedures, discreet Harley Street location.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: '47 Harley Street, London W1G', phone: '+44 20 7946 0100', founded_year: 2016,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },
  {
    id: 'm2', slug: 'berlin-enhancement-clinic', name: 'Berlin Enhancement Clinic', city: 'Berlin',
    country: 'Germany', region: 'EU', categories: ['penis_filler', 'ed'],
    price_min: 1500, price_max: 2800, currency: 'EUR', rating: 4.6, review_count: 98,
    verified: true, premium: false, languages: ['German', 'English'],
    description: 'Premium aesthetic men\'s clinic in Berlin Mitte. HA filler enhancement and ED shockwave in one appointment.',
    website_url: 'https://example.com', contact_url: null,
    address: 'Unter den Linden 38, 10117 Berlin', phone: '+49 30 2094 7700', founded_year: 2018,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },
  {
    id: 'm3', slug: 'paris-clinique-homme', name: 'Clinique Homme Paris', city: 'Paris',
    country: 'France', region: 'EU', categories: ['penis_filler'],
    price_min: 2000, price_max: 4200, currency: 'EUR', rating: 4.5, review_count: 67,
    verified: true, premium: false, languages: ['French', 'English'],
    description: 'Boutique Parisian clinic for penile aesthetics. Board-certified surgeons, complete confidentiality.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: '12 Rue du Faubourg Saint-Honoré, 75008 Paris', phone: null, founded_year: 2019,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },
  {
    id: 'm4', slug: 'warsaw-aesthetic-men', name: 'Warsaw Aesthetic Men', city: 'Warsaw',
    country: 'Poland', region: 'EU', categories: ['penis_filler', 'trt'],
    price_min: 700, price_max: 1600, currency: 'EUR', rating: 4.4, review_count: 189,
    verified: true, premium: false, languages: ['Polish', 'English', 'Russian'],
    description: 'Warsaw\'s most popular men\'s enhancement clinic. EU-standard care at Central European prices.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: 'ul. Nowy Świat 64, 00-357 Warszawa', phone: '+48 22 828 4400', founded_year: 2017,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },
  {
    id: 'm5', slug: 'bangkok-mens-center', name: 'Bangkok Men\'s Center', city: 'Bangkok',
    country: 'Thailand', region: 'World', categories: ['penis_filler', 'ed'],
    price_min: 350, price_max: 900, currency: 'EUR', rating: 4.5, review_count: 467,
    verified: true, premium: true, languages: ['Thai', 'English'],
    description: 'Medical tourism leader for penile enhancement and ED treatment. International protocols, fraction of European prices.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: 'Sukhumvit Road Soi 3, Bangkok 10110', phone: '+66 2 651 7800', founded_year: 2014,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },

  // ── TESTOSTERONE THERAPY (5) ────────────────────────────
  {
    id: 'm6', slug: 'trt-clinic-manchester', name: 'TRT Clinic Manchester', city: 'Manchester',
    country: 'United Kingdom', region: 'EU', categories: ['trt'],
    price_min: 150, price_max: 400, currency: 'EUR', rating: 4.7, review_count: 312,
    verified: true, premium: true, languages: ['English'],
    description: 'UK\'s leading dedicated TRT clinic. Bloods-to-prescription in under a week. Remote monitoring included.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: 'Deansgate 18, Manchester M3 4LY', phone: '+44 161 834 5500', founded_year: 2015,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },
  {
    id: 'm7', slug: 'amsterdam-trt-center', name: 'Amsterdam TRT Center', city: 'Amsterdam',
    country: 'Netherlands', region: 'EU', categories: ['trt', 'ed'],
    price_min: 200, price_max: 480, currency: 'EUR', rating: 4.5, review_count: 124,
    verified: true, premium: false, languages: ['Dutch', 'English', 'German'],
    description: 'Progressive hormone optimization clinic in Amsterdam. TRT and sexual health under one roof.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: 'Keizersgracht 394, 1016 GB Amsterdam', phone: '+31 20 638 9200', founded_year: 2016,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },
  {
    id: 'm8', slug: 'vienna-hormone-health', name: 'Vienna Hormone Health', city: 'Vienna',
    country: 'Austria', region: 'EU', categories: ['trt', 'fertility'],
    price_min: 220, price_max: 550, currency: 'EUR', rating: 4.6, review_count: 77,
    verified: true, premium: false, languages: ['German', 'English'],
    description: 'Vienna\'s specialist in male hormone therapy and fertility. Board-certified endocrinologists.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: 'Kärntner Ring 5, 1010 Wien', phone: '+43 1 512 4400', founded_year: 2017,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },
  {
    id: 'm9', slug: 'madrid-testosteron-clinic', name: 'Madrid Testosteron Clinic', city: 'Madrid',
    country: 'Spain', region: 'EU', categories: ['trt'],
    price_min: 180, price_max: 420, currency: 'EUR', rating: 4.3, review_count: 55,
    verified: false, premium: false, languages: ['Spanish', 'English'],
    description: 'Madrid\'s dedicated testosterone replacement clinic. Personalised protocols, quarterly blood work.',
    website_url: 'https://example.com', contact_url: null,
    address: 'Paseo de la Castellana 110, 28046 Madrid', phone: '+34 91 520 4400', founded_year: 2019,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },
  {
    id: 'm10', slug: 'prague-trt-institute', name: 'Prague TRT Institute', city: 'Prague',
    country: 'Czech Republic', region: 'EU', categories: ['trt', 'pe'],
    price_min: 130, price_max: 310, currency: 'EUR', rating: 4.2, review_count: 88,
    verified: false, premium: false, languages: ['Czech', 'English', 'German'],
    description: 'Affordable TRT and PE treatment in central Prague. Popular with medical tourists from Germany and UK.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: 'Náměstí Republiky 3, 110 00 Praha', phone: '+420 221 614 800', founded_year: 2018,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },

  // ── ERECTILE DYSFUNCTION (5) ────────────────────────────
  {
    id: 'm11', slug: 'ed-solutions-london', name: 'ED Solutions London', city: 'London',
    country: 'United Kingdom', region: 'EU', categories: ['ed'],
    price_min: 400, price_max: 1800, currency: 'EUR', rating: 4.7, review_count: 256,
    verified: true, premium: true, languages: ['English'],
    description: 'Specialist erectile dysfunction clinic. Shockwave, PRP, and medication protocols. 92% success rate reported.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: '22 Wimpole St, London W1G', phone: '+44 20 7946 8800', founded_year: 2014,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },
  {
    id: 'm12', slug: 'shockwave-clinic-brussels', name: 'Shockwave Clinic Brussels', city: 'Brussels',
    country: 'Belgium', region: 'EU', categories: ['ed'],
    price_min: 350, price_max: 1400, currency: 'EUR', rating: 4.4, review_count: 91,
    verified: true, premium: false, languages: ['French', 'Dutch', 'English'],
    description: 'Brussels\' dedicated ED shockwave therapy clinic. Non-invasive, drug-free treatment. Bilingual staff.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: 'Rue de la Loi 58, 1040 Bruxelles', phone: '+32 2 230 4400', founded_year: 2018,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },
  {
    id: 'm13', slug: 'zurich-intimmed', name: 'Intimmed Zürich', city: 'Zürich',
    country: 'Switzerland', region: 'EU', categories: ['ed', 'fertility'],
    price_min: 500, price_max: 2500, currency: 'CHF', rating: 4.9, review_count: 63,
    verified: true, premium: true, languages: ['German', 'French', 'English'],
    description: 'Switzerland\'s premium sexual medicine and fertility clinic. Exceptional discretion, Swiss precision.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: 'Bahnhofstrasse 69, 8001 Zürich', phone: '+41 44 211 4500', founded_year: 2011,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },
  {
    id: 'm14', slug: 'stockholm-sexual-health', name: 'Stockholm Sexual Health', city: 'Stockholm',
    country: 'Sweden', region: 'EU', categories: ['ed', 'pe'],
    price_min: 600, price_max: 2200, currency: 'EUR', rating: 4.8, review_count: 97,
    verified: true, premium: false, languages: ['Swedish', 'English'],
    description: 'Stockholm\'s evidence-based sexual health clinic. ED and PE treated by senior urologists.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: 'Stureplan 4C, 114 35 Stockholm', phone: '+46 8 611 2300', founded_year: 2013,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },
  {
    id: 'm15', slug: 'dubai-mens-wellness', name: 'Dubai Men\'s Wellness', city: 'Dubai',
    country: 'UAE', region: 'World', categories: ['ed', 'trt'],
    price_min: 600, price_max: 2800, currency: 'EUR', rating: 4.7, review_count: 178,
    verified: true, premium: true, languages: ['English', 'Arabic'],
    description: 'Dubai\'s foremost men\'s health clinic. Premium TRT and ED care for the Gulf\'s professional community.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: 'Dubai Healthcare City, Building 27', phone: '+971 4 362 7700', founded_year: 2016,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },

  // ── PREMATURE EJACULATION (5) ───────────────────────────
  {
    id: 'm16', slug: 'pe-clinic-copenhagen', name: 'PE Clinic Copenhagen', city: 'Copenhagen',
    country: 'Denmark', region: 'EU', categories: ['pe'],
    price_min: 250, price_max: 900, currency: 'EUR', rating: 4.5, review_count: 72,
    verified: true, premium: false, languages: ['Danish', 'English'],
    description: 'Scandinavia\'s dedicated PE clinic. Combination therapy — medication, behavioural and nerve-targeted treatment.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: 'Bredgade 43, 1260 København K', phone: '+45 3333 7700', founded_year: 2019,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },
  {
    id: 'm17', slug: 'timing-clinic-lisbon', name: 'Timing Clinic Lisbon', city: 'Lisbon',
    country: 'Portugal', region: 'EU', categories: ['pe'],
    price_min: 180, price_max: 600, currency: 'EUR', rating: 4.2, review_count: 44,
    verified: false, premium: false, languages: ['Portuguese', 'English'],
    description: 'Lisbon\'s specialist for premature ejaculation. Affordable consultations, discreet private clinic.',
    website_url: 'https://example.com', contact_url: null,
    address: 'Avenida da Liberdade 110, 1269-046 Lisboa', phone: null, founded_year: 2020,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },
  {
    id: 'm18', slug: 'timing-health-helsinki', name: 'Timing Health Helsinki', city: 'Helsinki',
    country: 'Finland', region: 'EU', categories: ['pe', 'trt'],
    price_min: 200, price_max: 700, currency: 'EUR', rating: 4.4, review_count: 58,
    verified: true, premium: false, languages: ['Finnish', 'Swedish', 'English'],
    description: 'Helsinki clinic specialising in PE and hormone health. Practical, results-focused treatment plans.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: 'Pohjoisesplanadi 33, 00100 Helsinki', phone: '+358 9 6121 4400', founded_year: 2018,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },
  {
    id: 'm19', slug: 'singapore-mens-health', name: 'Singapore Men\'s Health', city: 'Singapore',
    country: 'Singapore', region: 'World', categories: ['pe', 'fertility'],
    price_min: 400, price_max: 1400, currency: 'EUR', rating: 4.6, review_count: 134,
    verified: true, premium: false, languages: ['English', 'Mandarin', 'Malay'],
    description: 'Singapore\'s trusted PE and male fertility specialist. English-first care, international standards.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: '290 Orchard Road #14-10, Singapore 238859', phone: '+65 6733 4400', founded_year: 2015,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },
  {
    id: 'm20', slug: 'budapest-mens-institute', name: 'Budapest Men\'s Institute', city: 'Budapest',
    country: 'Hungary', region: 'EU', categories: ['pe', 'ed'],
    price_min: 150, price_max: 500, currency: 'EUR', rating: 4.1, review_count: 93,
    verified: false, premium: false, languages: ['Hungarian', 'English'],
    description: 'Affordable PE and ED treatment in Budapest. Popular medical tourism destination from Western Europe.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: 'Andrássy út 22, 1061 Budapest', phone: '+36 1 374 4200', founded_year: 2019,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },

  // ── MALE FERTILITY (5) ──────────────────────────────────
  {
    id: 'm21', slug: 'male-fertility-london', name: 'Male Fertility London', city: 'London',
    country: 'United Kingdom', region: 'EU', categories: ['fertility'],
    price_min: 300, price_max: 2000, currency: 'EUR', rating: 4.8, review_count: 161,
    verified: true, premium: true, languages: ['English'],
    description: 'London\'s premier male fertility clinic. Full semen analysis, ICSI support and surgical sperm retrieval.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: '150 Harley Street, London W1G', phone: '+44 20 7935 8800', founded_year: 2013,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },
  {
    id: 'm22', slug: 'spermhealth-hamburg', name: 'SpermHealth Hamburg', city: 'Hamburg',
    country: 'Germany', region: 'EU', categories: ['fertility'],
    price_min: 280, price_max: 1600, currency: 'EUR', rating: 4.5, review_count: 84,
    verified: true, premium: false, languages: ['German', 'English'],
    description: 'Hamburg\'s dedicated male fertility laboratory and clinic. World Health Organisation analysis protocols.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: 'Neuer Wall 10, 20354 Hamburg', phone: '+49 40 4138 7700', founded_year: 2016,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },
  {
    id: 'm23', slug: 'andrology-center-prague', name: 'Andrology Center Prague', city: 'Prague',
    country: 'Czech Republic', region: 'EU', categories: ['fertility', 'trt'],
    price_min: 200, price_max: 1200, currency: 'EUR', rating: 4.3, review_count: 116,
    verified: true, premium: false, languages: ['Czech', 'English', 'Slovak'],
    description: 'Prague\'s full-service andrology centre. Male fertility and hormone therapy in one practice.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: 'Wenceslas Square 56, 110 00 Praha', phone: '+420 221 614 900', founded_year: 2015,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },
  {
    id: 'm24', slug: 'fertility-center-tallinn', name: 'Fertility Center Tallinn', city: 'Tallinn',
    country: 'Estonia', region: 'EU', categories: ['fertility'],
    price_min: 200, price_max: 900, currency: 'EUR', rating: 4.4, review_count: 52,
    verified: true, premium: false, languages: ['Estonian', 'English', 'Finnish'],
    description: 'Tallinn\'s leading male fertility centre. Competitive Baltic pricing, digital-first patient experience.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: 'Viru väljak 4, 10111 Tallinn', phone: '+372 6623 800', founded_year: 2018,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },
  {
    id: 'm25', slug: 'istanbul-andrology', name: 'Istanbul Andrology Clinic', city: 'Istanbul',
    country: 'Turkey', region: 'EU', categories: ['fertility', 'penis_filler'],
    price_min: 400, price_max: 1800, currency: 'EUR', rating: 4.6, review_count: 203,
    verified: true, premium: false, languages: ['Turkish', 'English', 'Arabic'],
    description: 'Istanbul\'s leading andrology and enhancement clinic. High-volume, internationally trained team.',
    website_url: 'https://example.com', contact_url: 'https://example.com/contact',
    address: 'Bağdat Caddesi 349, Kadıköy, Istanbul', phone: '+90 216 414 7500', founded_year: 2014,
    created_at: '2024-01-01', updated_at: '2024-01-01',
  },
]

/** Filter and sort mock clinics to match the Supabase query shape */
export function filterMockClinics(params: {
  categories?: string[]
  region?: string
  country?: string
  minRating?: number
  verifiedOnly?: boolean
  priceMax?: number
  sort?: string
  page?: number
  pageSize?: number
}) {
  const { categories = [], region, country, minRating, verifiedOnly, priceMax, sort = 'rating', page = 1, pageSize = 12 } = params

  let results = [...MOCK_CLINICS]

  if (categories.length) results = results.filter(c => categories.every(cat => c.categories.includes(cat as never)))
  if (region) results = results.filter(c => c.region === region)
  if (country) results = results.filter(c => c.country === country)
  if (minRating) results = results.filter(c => c.rating !== null && c.rating >= minRating)
  if (verifiedOnly) results = results.filter(c => c.verified)
  if (priceMax && priceMax < 10000) results = results.filter(c => c.price_max !== null && c.price_max <= priceMax)

  if (sort === 'price_asc') results.sort((a, b) => (a.price_min ?? 0) - (b.price_min ?? 0))
  else if (sort === 'price_desc') results.sort((a, b) => (b.price_min ?? 0) - (a.price_min ?? 0))
  else if (sort === 'newest') results.sort((a, b) => (b.founded_year ?? 0) - (a.founded_year ?? 0))
  else results.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))

  const total = results.length
  const from = (page - 1) * pageSize
  return { clinics: results.slice(from, from + pageSize), total, page }
}
