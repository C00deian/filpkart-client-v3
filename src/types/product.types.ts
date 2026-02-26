export interface UploadedImageType {
  color: string
  colorCode: string
  imageUrl: string
}

export interface Review {
  id: number
  rating: number
  title?: string | null
  comment: string
  userId: string
  userName?: string
  isVerifiedPurchase?: boolean
  helpfulCount?: number
  createdDate: string
}

export interface Category {
  id: number
  name: string
  slug: string
  imageUrl: string
}

export interface Product {
  id: number
  name: string
  description: string
  brand: string
  price: number
  rating?: number
  inStock: boolean
  category: Category
  images: UploadedImageType[]
  reviews: Review[]
}

export interface ProductFilters {
  categorySlug?: string
  search?: string
  page?: number
  size?: number
  sort?: string
  minPrice?: number
  maxPrice?: number
  brand?: string
  discount?: number
  rating?: number
}

export type ImageType = {
  color: string
  colorCode: string
  imageUrl: File | null
}
