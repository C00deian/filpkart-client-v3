import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { QUERY_TIMES } from '@/config/constants'
import { productService } from '@/features/products/services/productService'
import type { ProductFilters } from '@/features/products/types/product.types'

export const PRODUCTS_KEY = 'products'

export const useProducts = (extraFilters?: ProductFilters) => {
  const [searchParams] = useSearchParams()

  const filters: ProductFilters = {
    search:       searchParams.get('search') ?? undefined,
    categorySlug: searchParams.get('category') ?? undefined,
    minPrice:     searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice:     searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    sort:         searchParams.get('sort') ?? undefined,
    brand:        searchParams.get('brand') ?? undefined,
    ...extraFilters,
  }

  return useQuery({
    queryKey: [PRODUCTS_KEY, filters],
    queryFn: () => productService.getProducts(filters),
    staleTime: QUERY_TIMES.DEFAULT,
    placeholderData: prev => prev,
  })
}
