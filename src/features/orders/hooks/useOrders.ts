import { useQuery } from '@tanstack/react-query'
import { orderService } from '@/services/orderService'

export const ORDER_QUERY_KEY = ['orders']

export const useOrders = () =>
  useQuery({
    queryKey: ORDER_QUERY_KEY,
    queryFn: orderService.getOrders,
    staleTime: 1000 * 60 * 2,
  })

export const useOrder = (orderId: string) =>
  useQuery({
    queryKey: [...ORDER_QUERY_KEY, orderId],
    queryFn: () => orderService.getOrderById(orderId),
    enabled: !!orderId,
    retry: 1,
  })
