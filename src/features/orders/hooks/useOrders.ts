import { useQuery } from '@tanstack/react-query'
import { QUERY_TIMES } from '@/config/constants'
import { orderService } from '@/features/orders/services/orderService'

export const ORDER_QUERY_KEY = ['orders']

export const useOrders = () =>
  useQuery({
    queryKey: ORDER_QUERY_KEY,
    queryFn: orderService.getOrders,
    staleTime: QUERY_TIMES.SHORT,
  })

export const useOrder = (orderId: string) =>
  useQuery({
    queryKey: [...ORDER_QUERY_KEY, orderId],
    queryFn: () => orderService.getOrderById(orderId),
    enabled: !!orderId,
    retry: 1,
  })
