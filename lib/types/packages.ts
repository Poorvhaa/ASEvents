export type PackageCategory =
  | 'wedding'
  | 'corporate'
  | 'social'
  | 'exhibition'
  | 'entertainment'

export type PackageCategoryFilter =
  | 'All'
  | 'Weddings'
  | 'Corporate'
  | 'Social Events'

export interface EventPackage {
  id: string
  slug: string
  title: string
  category: PackageCategory
  includes: string[]
  includedServices: string[]
  highlights: string[]
  suitableGuests: string
  duration: string
  popular?: boolean
  description?: string
}
