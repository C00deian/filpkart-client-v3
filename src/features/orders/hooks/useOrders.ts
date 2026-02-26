import { useQuery } from '@tanstack/react-query'
import { orderService } from '@/services/orderService'

export const useOrders = () =>
  useQuery({
    queryKey: ['orders'],
    queryFn: orderService.getOrders,
    staleTime: 1000 * 60 * 2,
  })
