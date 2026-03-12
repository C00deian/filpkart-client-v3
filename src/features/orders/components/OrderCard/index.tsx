import { Link } from "react-router-dom";
import type { OrderDto } from "@/types/order.types";
import { formatPrice } from "@/utils/formatPrice";
import { Star } from "lucide-react";
import { ROUTES } from "@/routes/routePaths";

interface Props {
  order: OrderDto;
}

const statusDotClass = (status: string) => {
  if (status === "DELIVERED") return "bg-green-500";
  if (status === "CANCELLED" || status === "FAILED") return "bg-red-500";
  if (status === "PENDING") return "bg-gray-400";
  return "bg-blue-500";
};

const OrderCard = ({ order }: Props) => {
  const firstItem = order.items[0];

  const formattedDate = new Date(order.orderDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      to={ROUTES.ORDER_DETAIL.replace(":id", order.id)}
      className="block border border-[#e0e0e0] bg-white rounded-sm hover:shadow-md transition"
    >
      <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="w-[80px] h-[80px] flex-shrink-0 flex items-center justify-center">
          {firstItem?.productImage ? (
            <img
              src={firstItem.productImage}
              alt={firstItem.productName}
              className="w-full h-full object-contain p-1"
            />
          ) : (
            <span className="text-2xl">📦</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[14px] text-[#212121] truncate">
            {firstItem?.productName ?? "Order item"}
          </p>
          <p className="text-[13px] text-[#878787] mt-1">
            Qty: {firstItem?.quantity ?? 0}
          </p>
          <p className="text-[14px] font-medium text-[#212121] mt-2">
            {firstItem
              ? formatPrice(firstItem.unitPrice)
              : formatPrice(order.totalPrice)}
          </p>
        </div>

        <div className="sm:text-right sm:min-w-[220px]">
          <div className="flex items-center sm:justify-end gap-2">
            <span
              className={`w-2 h-2 rounded-full ${statusDotClass(order.orderStatus)}`}
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
              <div className="flex items-center sm:justify-end gap-2 text-[#2874f0] mt-2 text-[13px] font-medium">
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
