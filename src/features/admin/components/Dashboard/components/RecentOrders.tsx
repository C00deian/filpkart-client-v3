import { ShoppingBag } from 'lucide-react'
import type { Order } from '@/features/orders/types/order.types'
import { formatPrice } from '@/utils/formatPrice'
import Badge from '@/components/ui/Badge'

const STATUS_MAP: Record<string, { variant: 'success' | 'warning' | 'error' | 'info' | 'default', label: string }> = {
  DELIVERED: { variant: 'success', label: 'Delivered' },
  SHIPPED:   { variant: 'info',    label: 'Shipped'   },
  PLACED:    { variant: 'warning', label: 'Placed'    },
  CANCELLED: { variant: 'error',   label: 'Cancelled' },
}

interface Props { orders: Order[] }

const RecentOrders = ({ orders }: Props) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100">
    <div className="p-5 border-b border-slate-100 flex items-center justify-between">
      <h3 className="font-bold text-slate-800 flex items-center gap-2">
        <ShoppingBag className="w-4 h-4 text-slate-400" /> Recent Orders
      </h3>
      <span className="text-xs text-slate-400">{orders.length} total</span>
    </div>
    <div className="divide-y divide-slate-50">
      {orders.slice(0, 7).map(order => (
        <div key={order.id} className="px-5 py-3.5 flex items-center gap-4 hover:bg-slate-50 transition-colors">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">
              #{order.id.slice(-8).toUpperCase()}
            </p>
            <p className="text-xs text-slate-400">
              {new Date(order.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
          <span className="text-sm font-semibold text-slate-700">{formatPrice(order.totalPrice)}</span>
          <Badge
            label={STATUS_MAP[order.orderStatus]?.label ?? order.orderStatus}
            variant={STATUS_MAP[order.orderStatus]?.variant ?? 'default'}
            size="sm"
          />
        </div>
      ))}
    </div>
  </div>
)
export default RecentOrders
