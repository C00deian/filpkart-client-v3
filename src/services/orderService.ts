import api from "./api";
import type { CheckoutResponse, OrderDto } from "@/types/order.types";

const normalizeOrder = (order: OrderDto): OrderDto => ({
  ...order,
  items: order.items ?? [],
  orderDate: order.orderDate ?? new Date().toISOString(),
});

export const orderService = {
  getOrders: async (): Promise<OrderDto[]> => {
    const res = await api.get<OrderDto[]>("/orders");
    return (res.data ?? []).map(normalizeOrder);
  },

  getOrderById: async (id: string): Promise<OrderDto> => {
    const res = await api.get<OrderDto>(`/orders/${id}`);
    return normalizeOrder(res.data);
  },

  checkout: async (cartId: string): Promise<CheckoutResponse> => {
    const res = await api.post<CheckoutResponse>("/checkout", { cartId });
    return res.data;
  },
};
