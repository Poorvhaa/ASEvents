export type PackageCategory = 'wedding' | 'corporate' | 'social' | 'festival'

export type PackageCategoryFilter = 'All' | 'Wedding' | 'Corporate' | 'Social' | 'Festival'

export interface EventPackage {
  id: string
  slug: string
  title: string
  category: PackageCategory
  includes: string[]
  price: string
  popular?: boolean
  description?: string
}
