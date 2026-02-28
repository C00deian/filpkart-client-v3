import { useOrders } from "@/features/orders/hooks/useOrders"
import { Package } from "lucide-react"

const OverviewTab = () => {
  const { data: orders = [] } = useOrders()

  return (
    <div>
      <h2 className="font-semibold text-gray-800 mb-4">
        Overview
      </h2>

      <div className="text-sm text-gray-600">
        Total Orders: {orders.length}
      </div>
    </div>
  )
}

export default OverviewTab