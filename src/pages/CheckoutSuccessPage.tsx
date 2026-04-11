import HomeLayout from '@/app/layouts/HomeLayout'
import { Skeleton } from '@/components/ui/Skeleton'
import { CART_KEY } from '@/features/cart/hooks/useCart'
import { useOrder } from '@/features/orders/hooks/useOrders'
import { ROUTES } from '@/routes/routePaths'
import { formatPrice } from '@/utils/formatPrice'
import { useQueryClient } from '@tanstack/react-query'
import { CheckCircle2, ChevronRight, PackageCheck, ReceiptText, RefreshCw, ShoppingBag } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const CheckoutSuccessPage = () => {
  const [searchParams] = useSearchParams()
  const queryClient = useQueryClient()
  const orderId = searchParams.get('orderId') || sessionStorage.getItem('pendingCheckoutOrderId') || ''
  const { data: order, isLoading, isError, refetch } = useOrder(orderId)

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: CART_KEY })
  }, [queryClient])

  return (
    <HomeLayout>
      <div className="max-w-5xl mx-auto space-y-4">
        <section className="bg-white border border-slate-200 rounded-sm shadow-card overflow-hidden">
          <div className="bg-green-600 px-5 py-8 sm:px-8 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white/80">Payment received</p>
                <h1 className="text-2xl font-bold mt-1">Your order is confirmed</h1>
                <p className="text-sm text-white/90 mt-1">
                  We are preparing your items and will keep your order status updated.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            {!orderId ? (
              <div className="text-center py-8">
                <PackageCheck className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="font-semibold text-slate-800">Order reference is missing.</p>
                <p className="text-sm text-slate-500 mt-1">Open My Orders to see your latest purchase.</p>
              </div>
            ) : isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-28 w-full" />
              </div>
            ) : isError || !order ? (
              <div className="text-center py-8">
                <p className="font-semibold text-slate-800">Payment is done, but order details are still syncing.</p>
                <p className="text-sm text-slate-500 mt-1 mb-4">This can happen while the webhook update finishes.</p>
                <button
                  onClick={() => refetch()}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary border border-primary/20 rounded hover:bg-primary/5">
                  <RefreshCw className="h-4 w-4" /> Check again
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-5">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Order ID</p>
                  <p className="font-bold text-slate-900 mt-1">#{order.id.slice(-10).toUpperCase()}</p>

                  <div className="mt-5 divide-y divide-slate-100 border-y border-slate-100">
                    {order.items.slice(0, 3).map(item => (
                      <div key={item.productId} className="py-3 flex items-center gap-3">
                        <div className="h-14 w-14 bg-slate-50 border border-slate-100 rounded flex items-center justify-center flex-shrink-0">
                          {item.productImage
                            ? <img src={item.productImage} alt={item.productName} className="h-full w-full object-contain p-1" />
                            : <ShoppingBag className="h-5 w-5 text-slate-300" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate">{item.productName}</p>
                          <p className="text-xs text-slate-500 mt-1">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-slate-900">{formatPrice(item.totalPrice)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <aside className="bg-slate-50 border border-slate-100 rounded-sm p-4 h-fit">
                  <div className="flex items-center gap-2 text-slate-700">
                    <ReceiptText className="h-4 w-4 text-primary" />
                    <span className="text-sm font-bold">Order Summary</span>
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>Payment</span>
                      <span className="font-semibold text-green-700">{order.paymentStatus}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Status</span>
                      <span className="font-semibold text-slate-900">{order.orderStatus}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-slate-200">
                      <span className="font-semibold text-slate-700">Total</span>
                      <span className="font-bold text-slate-900">{formatPrice(order.totalPrice)}</span>
                    </div>
                  </div>
                </aside>
              </div>
            )}
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-3">
          {orderId && (
            <Link
              to={ROUTES.ORDER_DETAIL.replace(':id', orderId)}
              className="inline-flex justify-center items-center gap-2 px-5 py-3 bg-primary text-white font-semibold rounded hover:bg-primary-dark">
              View Order <ChevronRight className="h-4 w-4" />
            </Link>
          )}
          <Link
            to={ROUTES.ORDERS}
            className="inline-flex justify-center items-center px-5 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-50">
            My Orders
          </Link>
          <Link
            to={ROUTES.HOME}
            className="inline-flex justify-center items-center px-5 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-50">
            Continue Shopping
          </Link>
        </div>
      </div>
    </HomeLayout>
  )
}

export default CheckoutSuccessPage
