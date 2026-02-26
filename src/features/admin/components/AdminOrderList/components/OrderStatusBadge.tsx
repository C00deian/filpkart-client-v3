import Badge from '@/components/ui/Badge'

type OrderStatus = 'PLACED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
type PaymentStatus = 'SUCCESS' | 'PENDING' | 'FAILED'

const ORDER_MAP: Record<OrderStatus, { variant: 'success' | 'warning' | 'error' | 'info' | 'default', label: string }> = {
  DELIVERED: { variant: 'success', label: 'Delivered' },
  SHIPPED:   { variant: 'info',    label: 'Shipped'   },
  PLACED:    { variant: 'warning', label: 'Placed'    },
  CANCELLED: { variant: 'error',   label: 'Cancelled' },
}

const PAYMENT_MAP: Record<PaymentStatus, { variant: 'success' | 'warning' | 'error' | 'info' | 'default', label: string }> = {
  SUCCESS: { variant: 'success', label: 'Paid'    },
  PENDING: { variant: 'warning', label: 'Pending' },
  FAILED:  { variant: 'error',   label: 'Failed'  },
}

export const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const s = ORDER_MAP[status] ?? { variant: 'default' as const, label: status }
  return <Badge label={s.label} variant={s.variant} size="sm" />
}

export const PaymentStatusBadge = ({ status }: { status: PaymentStatus }) => {
  const s = PAYMENT_MAP[status] ?? { variant: 'default' as const, label: status }
  return <Badge label={s.label} variant={s.variant} size="sm" />
}
