
import { useOrders } from '@/features/orders/hooks/useOrders'
import OrderCard from '@/features/orders/components/OrderCard'
import { Package } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/routePaths'
import { Skeleton } from '@/components/ui/Skeleton'
import HomeLayout from '@/components/layout/Header/components/HomeLayout/HomeLayout'

const OrdersPage = () => {
  const { data: orders, isLoading } = useOrders()

  return (
    <HomeLayout>
      <h1 className="text-xl font-bold text-slate-900 mb-4">My Orders</h1>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-40 w-full" />)}
        </div>
      ) : !orders?.length ? (
        <div className="bg-white rounded-sm shadow-card flex flex-col items-center py-16 gap-4">
          <Package className="w-16 h-16 text-slate-200" />
          <h2 className="text-xl font-semibold text-slate-700">No orders yet!</h2>
          <Link to={ROUTES.HOME}
            className="bg-primary text-white font-bold px-8 py-3 rounded hover:bg-primary-dark transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => <OrderCard key={order.id} order={order} />)}
        </div>
      )}
    </HomeLayout>
  )
}
export default OrdersPage
