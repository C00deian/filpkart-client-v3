import { useQuery } from '@tanstack/react-query'
import { QUERY_TIMES } from '@/config/constants'
import { productService } from '@/features/products/services/productService'

export const useProductDetail = (id: number) =>
  useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    staleTime: QUERY_TIMES.LONG,
    enabled: !!id,
  })
