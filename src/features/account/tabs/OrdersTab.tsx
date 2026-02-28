import { useOrders } from "@/features/orders/hooks/useOrders"
import OrderCard from "@/features/orders/components/OrderCard"

const OrdersTab = () => {
  const { data: orders = [] } = useOrders()

  if (!orders.length) {
    return (
      <div className="text-center py-10 text-gray-500">
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