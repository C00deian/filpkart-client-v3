import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: productService.getCategories,
    staleTime: 1000 * 60 * 30, // categories don't change often
  })
