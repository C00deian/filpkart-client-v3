import { Link } from 'react-router-dom'
import type { OrderDto } from '@/types/order.types'
import { formatPrice } from '@/utils/formatPrice'
import Badge from '@/components/ui/Badge'
import { ChevronRight, Package } from 'lucide-react'

interface Props { order: OrderDto }

const STATUS_MAP: Record<string, { variant: 'success' | 'warning' | 'error' | 'info' | 'default', label: string }> = {
  DELIVERED:   { variant: 'success', label: 'Delivered' },
  SHIPPED:     { variant: 'info',    label: 'Shipped' },
  PROCESSING:  { variant: 'warning', label: 'Processing' },
  CONFIRMED:   { variant: 'info',    label: 'Confirmed' },
  PENDING:     { variant: 'default', label: 'Pending' },
  CANCELLED:   { variant: 'error',   label: 'Cancelled' },
  RETURNED:    { variant: 'default', label: 'Returned' },
}

const OrderCard = ({ order }: Props) => {
  const status = STATUS_MAP[order.orderStatus] ?? { variant: 'default' as const, label: order.orderStatus }

  return (
    <div className="bg-white rounded-sm shadow-card hover:shadow-card-hover transition-shadow">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package className="w-4 h-4 text-slate-400" />
          <div>
            <p className="text-xs text-slate-400">Order #{order.id.slice(-8).toUpperCase()}</p>
            <p className="text-xs text-slate-400">{new Date(order.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge label={status.label} variant={status.variant} size="sm" />
          <Link to={`/orders/${order.id}`} className="text-primary hover:underline">
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="p-4 space-y-2">
        {order.items.slice(0, 2).map(item => (
          <div key={item.productId} className="flex items-center gap-3">
            <div className="w-12 h-12 flex-shrink-0 bg-slate-50 rounded border border-slate-100 flex items-center justify-center">
              {item.productImage
                ? <img src={item.productImage} alt={item.productName} className="w-full h-full object-contain p-1" />
                : <span>📦</span>
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-700 truncate">{item.productName}</p>
              <p className="text-xs text-slate-400">Qty: {item.quantity} × {formatPrice(item.unitPrice)}</p>
            </div>
          </div>
        ))}
        {order.items.length > 2 && (
          <p className="text-xs text-slate-400">+{order.items.length - 2} more items</p>
        )}
      </div>

      <div className="px-4 py-3 bg-slate-50 rounded-b-sm border-t border-slate-100 flex justify-between items-center">
        <span className="text-sm text-slate-500">Order Total</span>
        <span className="font-bold text-slate-900">{formatPrice(order.totalPrice)}</span>
      </div>
    </div>
  )
}
export default OrderCard
