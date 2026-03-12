import api from './api'
import type { Product, ProductFilters, Category } from '@/types/product.types'
import type { ApiResponse } from '@/types/api.types'

export const productService = {
  getProducts: async (filters: ProductFilters = {}): Promise<Product[]> => {
    const res = await api.get<ApiResponse<Product[]>>('/products', { params: filters })
    return res.data.data
  },
  getProductById: async (id: number): Promise<Product> => {
    const res = await api.get<ApiResponse<Product>>(`/products/${id}`)
    return res.data.data
  },
  getCategories: async (): Promise<Category[]> => {
    const res = await api.get<Category[]>('/products/categories')
    return res.data
  },
  searchProducts: async (query: string): Promise<Product[]> => {
    const res = await api.get<ApiResponse<Product[]>>('/products', { params: { search: query } })
    return res.data.data
  },
  getProductsByCategory: async (categorySlug: string): Promise<Product[]> => {
    const res = await api.get<ApiResponse<Product[]>>('/products', { params: { categorySlug } })
    return res.data.data
  },
}
