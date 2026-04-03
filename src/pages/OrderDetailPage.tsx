import HomeLayout from '@/app/layouts/HomeLayout'
import { Skeleton } from '@/components/ui/Skeleton'
import { useOrder } from '@/features/orders/hooks/useOrders'
import { ROUTES } from '@/routes/routePaths'
import { formatPrice } from '@/utils/formatPrice'
import { ChevronLeft, Package, RefreshCw } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

const statusBadgeClass = (status: string) => {
  if (status === 'DELIVERED') return 'bg-green-100 text-green-700'
  if (status === 'CANCELLED') return 'bg-red-100 text-red-700'
  if (status === 'PENDING') return 'bg-gray-100 text-gray-700'
  return 'bg-blue-100 text-blue-700'
}

const OrderDetailPage = () => {
  const { id = '' } = useParams<{ id: string }>()
  const { data: order, isLoading, isError, refetch } = useOrder(id)

  return (
    <HomeLayout>
      <div className="space-y-4">
        <Link
          to={ROUTES.ORDERS}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
          <ChevronLeft className="w-4 h-4" /> Back to orders
        </Link>

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-52 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : isError || !order ? (
          <div className="bg-white border border-slate-200 rounded-sm p-8 text-center">
            <p className="text-sm text-slate-600 mb-3">We could not load this order right now.</p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary border border-primary/20 rounded hover:bg-primary/5">
              <RefreshCw className="w-4 h-4" /> Retry
            </button>
          </div>
        ) : (
          <>
            <section className="bg-white border border-slate-200 rounded-sm p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Order ID</p>
                <p className="text-lg font-bold text-slate-900 mt-1">#{order.id.slice(-10).toUpperCase()}</p>
                <p className="text-xs text-slate-500 mt-1">
                  Placed on {new Date(order.orderDate).toLocaleString('en-IN')}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClass(order.orderStatus)}`}>
                  {order.orderStatus}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClass(order.paymentStatus)}`}>
                  Payment: {order.paymentStatus}
                </span>
              </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-sm overflow-hidden">
              <div className="px-4 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-bold text-slate-900">Items in this order</h2>
                <span className="text-sm text-slate-500">{order.items.length} item(s)</span>
              </div>

              <div className="divide-y divide-slate-100">
                {order.items.map(item => (
                  <div key={item.productId} className="p-4 sm:p-6 flex gap-4">
                    <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded flex items-center justify-center flex-shrink-0">
                      {item.productImage
                        ? <img src={item.productImage} alt={item.productName} className="w-full h-full object-contain p-1" />
                        : <Package className="w-6 h-6 text-slate-300" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 line-clamp-2">{item.productName}</p>
                      <div className="mt-2 text-xs text-slate-500">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-900">{formatPrice(item.totalPrice)}</p>
                      <p className="text-xs text-slate-500 mt-1">{formatPrice(item.unitPrice)} each</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 sm:px-6 py-4 bg-slate-50 border-t border-slate-100 text-right">
                <p className="text-xs text-slate-500">Order Total</p>
                <p className="text-lg font-bold text-slate-900">{formatPrice(order.totalPrice)}</p>
              </div>
            </section>
          </>
        )}
      </div>
    </HomeLayout>
  )
}

export default OrderDetailPage
