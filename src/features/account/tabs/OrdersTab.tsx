import { useOrders } from "@/features/orders/hooks/useOrders"
import OrderCard from "@/features/orders/components/OrderCard"
import { Package, RefreshCw } from "lucide-react"
import { Skeleton } from "@/components/ui/Skeleton"

const OrdersTab = () => {
  const { data: orders = [], isLoading, isError, refetch } = useOrders()

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-white rounded-sm border border-slate-200 p-6 text-center">
        <p className="text-sm text-slate-600 mb-3">Could not load your orders.</p>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary border border-primary/20 rounded hover:bg-primary/5">
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    )
  }

  if (!orders.length) {
    return (
      <div className="text-center py-10 text-gray-500 bg-white border border-slate-200 rounded-sm">
        <Package className="w-8 h-8 mx-auto text-slate-300 mb-2" />
        No orders placed yet
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}

export default OrdersTab