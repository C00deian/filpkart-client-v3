import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_TIMES } from '@/config/constants'
import { getAllOrders, dispatchOrder, deliverOrder } from '../services/adminService'
import { toast } from 'react-toastify'

export const ADMIN_ORDERS_KEY = ['admin-orders']

export const useAdminOrders = () => {
  const qc = useQueryClient()

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ADMIN_ORDERS_KEY,
    queryFn: getAllOrders,
    staleTime: QUERY_TIMES.ADMIN,
  })

  const dispatch = useMutation({
    mutationFn: dispatchOrder,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ADMIN_ORDERS_KEY })
      toast.success('Order dispatched!')
    },
    onError: () => toast.error('Failed to dispatch order'),
  })

  const deliver = useMutation({
    mutationFn: deliverOrder,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ADMIN_ORDERS_KEY })
      toast.success('Order marked as delivered!')
    },
    onError: () => toast.error('Failed to update order'),
  })

  const stats = {
    total:     orders.length,
    placed:    orders.filter(o => o.orderStatus === 'PLACED').length,
    shipped:   orders.filter(o => o.orderStatus === 'SHIPPED').length,
    delivered: orders.filter(o => o.orderStatus === 'DELIVERED').length,
    cancelled: orders.filter(o => o.orderStatus === 'CANCELLED').length,
    revenue:   orders.filter(o => o.paymentStatus === 'SUCCESS').reduce((s, o) => s + o.totalPrice, 0),
  }

  return {
    orders,
    isLoading,
    stats,
    dispatchOrder: (id: string) => dispatch.mutate(id),
    deliverOrder:  (id: string) => deliver.mutate(id),
    isUpdating: dispatch.isPending || deliver.isPending,
  }
}
