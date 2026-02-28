import { Link } from "react-router-dom";
import type { OrderDto } from "@/types/order.types";
import { formatPrice } from "@/utils/formatPrice";
import { ChevronRight, Star } from "lucide-react";

interface Props {
  order: OrderDto;
}

const OrderCard = ({ order }: Props) => {
  const item = order.items[0]; // Flipkart style = show first item only

  const formattedDate = new Date(order.orderDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      to={`/orders/${order.id}`}
      className="block border border-[#e0e0e0] bg-white rounded-sm hover:shadow-md transition"
    >
      <div className="p-4 flex items-center gap-6">
        {/* Product Image */}
        <div className="w-[80px] h-[80px] flex-shrink-0  flex items-center justify-center">
          {item.productImage ? (
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-full h-full object-contain p-1"
            />
          ) : (
            <span className="text-2xl">📦</span>
          )}
        </div>

        {/* Middle Section */}
        <div className="flex-1 min-w-0">
          <p className="text-[14px] text-[#212121] truncate">
            {item.productName}
          </p>

          <p className="text-[13px] text-[#878787] mt-1">
            Qty: {item.quantity}
          </p>

          <p className="text-[14px] font-medium text-[#212121] mt-2">
            {formatPrice(item.unitPrice)}
          </p>
        </div>

        {/* Right Section */}
        <div className="text-right min-w-[220px]">
          {/* Status */}
          <div className="flex items-center justify-end gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                order.orderStatus === "DELIVERED"
                  ? "bg-green-500"
                  : order.orderStatus === "PENDING"
                    ? "bg-gray-400"
                    : "bg-blue-500"
              }`}
            />

            <p className="text-[14px] font-medium text-[#212121]">
              {order.orderStatus === "DELIVERED"
                ? `Delivered on ${formattedDate}`
                : order.orderStatus}
            </p>
          </div>

          {order.orderStatus === "DELIVERED" && (
            <>
              <p className="text-[12px] text-[#878787] mt-1">
                Your item has been delivered
              </p>

              <div className="flex items-center justify-end gap-2 text-[#2874f0] mt-2 text-[13px] font-medium">
                <Star className="w-4 h-4 fill-[#2874f0]" />
                Rate & Review Product
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
