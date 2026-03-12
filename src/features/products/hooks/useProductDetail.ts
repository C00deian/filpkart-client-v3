import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'

export const useProductDetail = (id: number) =>
  useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
  })
