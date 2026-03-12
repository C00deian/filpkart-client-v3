export type AdminOrderStatus = 'PLACED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
export type AdminPaymentStatus = 'SUCCESS' | 'PENDING' | 'FAILED'

export interface AdminOrder {
  id: string
  customerId: string
  totalPrice: number
  paymentStatus: AdminPaymentStatus
  orderStatus: AdminOrderStatus
  orderDate: string
}

export interface DashboardStats {
  totalOrders: number
  totalProducts: number
  totalRevenue: number
  pendingOrders: number
  deliveredOrders: number
  cancelledOrders: number
}
