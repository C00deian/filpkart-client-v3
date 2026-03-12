import type { Product } from './product.types'

export interface CartItem {
  id: number
  product: Product
  quantity: number
  selectedColor?: string
}

export interface Cart {
  id: number
  userId: number
  items: CartItem[]
  total: number
}