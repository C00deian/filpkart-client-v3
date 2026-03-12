import { Link, useSearchParams } from 'react-router-dom'
import { formatPrice } from '@/utils/formatPrice'
import { ROUTES } from '@/routes/routePaths'
import { Package, Download, ChevronRight, RefreshCw } from 'lucide-react'
import { useOrder } from '@/features/orders/hooks/useOrders'

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId') ?? ''

  const { data: order, isLoading, isError, refetch } = useOrder(orderId)

  if (!orderId) {
    return (
      <div className="bg-white rounded-sm border border-slate-200 p-8 text-center">
        <p className="text-slate-700 font-semibold">Missing order id in URL.</p>
        <Link to={ROUTES.ORDERS} className="text-primary text-sm font-semibold hover:underline mt-3 inline-block">
          Go to My Orders
        </Link>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (isError || !order) {
    return (
      <div className="bg-white rounded-sm border border-slate-200 p-8 text-center">
        <p className="text-slate-700 font-semibold mb-3">Could not load your order details.</p>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary border border-primary/20 rounded hover:bg-primary/5">
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Success Banner */}
      <div className="bg-white rounded-sm shadow-card overflow-hidden">
        <div className="bg-green-600 p-8 flex flex-col items-center text-center text-white">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce">
            <span className="text-green-600 text-3xl font-bold">✓</span>
          </div>
          <h1 className="text-2xl font-bold mb-1">Order Placed Successfully!</h1>
          <p className="text-white/90 text-sm">A confirmation has been sent to your registered contact.</p>
        </div>

        <div className="p-5 bg-slate-50 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-slate-400 text-xs uppercase font-semibold tracking-wide mb-0.5">Order ID</p>
            <p className="font-bold text-slate-900">#{order.id.slice(-10).toUpperCase()}</p>
          </div>
          <div className="sm:ml-auto flex gap-3">
            <Link to={ROUTES.HOME}
              className="px-5 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded text-sm hover:bg-slate-50 transition-colors">
              Continue Shopping
            </Link>
            <Link to={ROUTES.ORDER_DETAIL.replace(':id', order.id)}
              className="px-5 py-2 bg-primary text-white font-semibold rounded text-sm hover:bg-primary-dark transition-colors flex items-center gap-1.5">
              <Package className="w-4 h-4" /> View Order
            </Link>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white rounded-sm shadow-card">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-800">Order Summary</h2>
            <span className="text-slate-400 text-sm">{order.items.length} items</span>
          </div>
          <div className="divide-y divide-slate-100">
            {order.items.map(item => (
              <div key={item.productId} className="p-4 flex gap-4">
                <div className="w-16 h-16 flex-shrink-0 bg-slate-50 rounded border border-slate-200 flex items-center justify-center">
                  {item.productImage
                    ? <img src={item.productImage} alt={item.productName} className="w-full h-full object-contain p-1" />
                    : <span className="text-2xl">📦</span>
                  }
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-slate-900 line-clamp-2">{item.productName}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-bold text-slate-900">{formatPrice(item.totalPrice)}</span>
                    <span className="text-xs text-slate-400">Qty: {item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-50 border-t text-right">
            <span className="font-bold text-slate-900">Total: {formatPrice(order.totalPrice)}</span>
          </div>
        </div>

        {/* Help Section */}
        <div className="space-y-4">
          <div className="bg-white rounded-sm shadow-card">
            <div className="p-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800">Need Help?</h2>
            </div>
            {[
              { icon: '📦', label: 'Order issues' },
              { icon: '↩️', label: 'Returns & Refunds' },
              { icon: '💬', label: 'Chat with us' },
            ].map(item => (
              <button key={item.label}
                className="flex items-center justify-between p-4 hover:bg-slate-50 w-full transition-colors border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <span>{item.icon}</span>
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>
            ))}
          </div>
          <button className="w-full bg-white border border-slate-300 hover:bg-slate-50 text-primary font-medium py-3 rounded shadow-sm flex items-center justify-center gap-2 transition-colors text-sm">
            <Download className="w-4 h-4" /> Download Invoice
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation
