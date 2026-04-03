import { useOrders } from '@/features/orders/hooks/useOrders'
import OrderCard from '@/features/orders/components/OrderCard'
import { Package, RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/routePaths'
import { Skeleton } from '@/components/ui/Skeleton'
import HomeLayout from '@/app/layouts/HomeLayout'

const OrdersPage = () => {
  const { data: orders = [], isLoading, isError, refetch } = useOrders()

  return (
    <HomeLayout>
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
        <aside className="bg-white border border-slate-200 rounded-sm p-4 h-fit hidden lg:block">
          <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Account</p>
          <h1 className="text-xl font-bold text-slate-900">My Orders</h1>
          <p className="text-sm text-slate-500 mt-2">Track, return, and reorder your purchases.</p>
        </aside>

        <section>
          <h1 className="lg:hidden text-xl font-bold text-slate-900 mb-4">My Orders</h1>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-36 w-full" />
              ))}
            </div>
          ) : isError ? (
            <div className="bg-white rounded-sm border border-slate-200 p-8 text-center">
              <p className="text-sm text-slate-600 mb-3">Unable to fetch your orders right now.</p>
              <button
                onClick={() => refetch()}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary border border-primary/20 rounded hover:bg-primary/5">
                <RefreshCw className="w-4 h-4" /> Retry
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-sm shadow-card flex flex-col items-center py-16 gap-4">
              <Package className="w-16 h-16 text-slate-200" />
              <h2 className="text-xl font-semibold text-slate-700">No orders yet!</h2>
              <p className="text-sm text-slate-500">Looks like you have not placed any orders so far.</p>
              <Link
                to={ROUTES.HOME}
                className="bg-primary text-white font-bold px-8 py-3 rounded hover:bg-primary-dark transition-colors">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </section>
      </div>
    </HomeLayout>
  )
}

export default OrdersPage
