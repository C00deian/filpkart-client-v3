import { useQuery } from '@tanstack/react-query'
import { QUERY_TIMES } from '@/config/constants'
import { productService } from '@/features/products/services/productService'

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: productService.getCategories,
    staleTime: QUERY_TIMES.EXTENDED,
  })
