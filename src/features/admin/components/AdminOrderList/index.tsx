import { useState } from 'react'
import { ShoppingBag, Search, Truck, CheckCircle } from 'lucide-react'
import { useAdminOrders } from '../../hooks/useAdminOrders'
import { OrderStatusBadge, PaymentStatusBadge } from './components/OrderStatusBadge'
import { formatPrice } from '@/utils/formatPrice'
import { Skeleton } from '@/components/ui/Skeleton'
import Button from '@/components/ui/Button'

const FILTERS = ['ALL', 'PLACED', 'SHIPPED', 'DELIVERED', 'CANCELLED'] as const
type Filter = typeof FILTERS[number]

const AdminOrderList = () => {
  const { orders, isLoading, dispatchOrder, deliverOrder, isUpdating } = useAdminOrders()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('ALL')

  const filtered = orders.filter(o => {
    const matchFilter  = filter === 'ALL' || o.orderStatus === filter
    const matchSearch  = !search || o.id.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-primary" /> Orders
        </h1>
        <p className="text-slate-400 text-sm mt-0.5">{orders.length} total orders</p>
      </div>

      {/* Filter Tabs + Search */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-wrap gap-3 items-center">
        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all
                ${filter === f ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by order ID..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-lg" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-slate-400 gap-3">
            <ShoppingBag className="w-12 h-12" />
            <p className="font-medium">No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['Order ID', 'Date', 'Amount', 'Order Status', 'Payment', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-mono font-medium text-slate-800">
                        #{order.id.slice(-10).toUpperCase()}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                      {new Date(order.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-800 whitespace-nowrap">
                      {formatPrice(order.totalPrice)}
                    </td>
                    <td className="px-4 py-3">
                      <OrderStatusBadge status={order.orderStatus} />
                    </td>
                    <td className="px-4 py-3">
                      <PaymentStatusBadge status={order.paymentStatus} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {order.orderStatus === 'PLACED' && (
                          <Button size="sm" variant="secondary"
                            isLoading={isUpdating}
                            onClick={() => dispatchOrder(order.id)}
                            className="whitespace-nowrap">
                            <Truck className="w-3.5 h-3.5" /> Dispatch
                          </Button>
                        )}
                        {order.orderStatus === 'SHIPPED' && (
                          <Button size="sm"
                            isLoading={isUpdating}
                            onClick={() => deliverOrder(order.id)}
                            className="whitespace-nowrap">
                            <CheckCircle className="w-3.5 h-3.5" /> Delivered
                          </Button>
                        )}
                        {(order.orderStatus === 'DELIVERED' || order.orderStatus === 'CANCELLED') && (
                          <span className="text-xs text-slate-400 italic">No action</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
export default AdminOrderList
