import api from "./api";
import type {
  CartDto,
  CartItemDto,
  AddToCartRequest,
} from "@/types/order.types";

export const cartService = {
  getCart: async (): Promise<CartDto> => {
    const res = await api.get<CartDto>("/carts/me");
    return res.data;
  },
  addItem: async (request: AddToCartRequest): Promise<CartItemDto> => {
    const res = await api.post<CartItemDto>("/carts/items", request);
    return res.data;
  },
  increaseItem: async (productId: number): Promise<CartItemDto> => {
    const res = await api.patch<CartItemDto>(
      `/carts/items/${productId}/increase`,
      {},
    );
    return res.data;
  },
  decreaseItem: async (productId: number): Promise<void> => {
    await api.patch(`/carts/items/${productId}/decrease`);
  },
  removeItem: async (productId: number): Promise<void> => {
    await api.delete(`/carts/items/${productId}`);
  },
  clearCart: async (): Promise<void> => {
    await api.delete("/carts/items");
  },
  createCart: async (): Promise<CartDto> => {
    const res = await api.post<CartDto>("/carts");
    return res.data;
  },
};
