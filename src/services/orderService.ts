import api from "./api";
import type { CheckoutResponse, OrderDto } from "@/types/order.types";

export const orderService = {
  getOrders: async (): Promise<OrderDto[]> => {
    const res = await api.get<OrderDto[]>("/orders");
    return res.data;
  },
  getOrderById: async (id: string): Promise<OrderDto> => {
    const res = await api.get<OrderDto>(`/orders/${id}`);
    return res.data;
  },
  checkout: async (cartId: string): Promise<CheckoutResponse> => {
    const res = await api.post<CheckoutResponse>("/checkout", { cartId });
    return res.data;
  },
};
