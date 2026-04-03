import apiClient from "@/services/apiClient";
import type {
  CartDto,
  CartItemDto,
  AddToCartRequest,
} from "../types/cart.types";

export const cartService = {
  getCart: async (): Promise<CartDto> => {
    const res = await apiClient.get<CartDto>("/carts/me");
    return res.data;
  },
  addItem: async (request: AddToCartRequest): Promise<CartItemDto> => {
    const res = await apiClient.post<CartItemDto>("/carts/items", request);
    return res.data;
  },
  increaseItem: async (productId: number): Promise<CartItemDto> => {
    const res = await apiClient.patch<CartItemDto>(
      `/carts/items/${productId}/increase`,
      {},
    );
    return res.data;
  },
  decreaseItem: async (productId: number): Promise<void> => {
    await apiClient.patch(`/carts/items/${productId}/decrease`);
  },
  removeItem: async (productId: number): Promise<void> => {
    await apiClient.delete(`/carts/items/${productId}`);
  },
  clearCart: async (): Promise<void> => {
    await apiClient.delete("/carts/items");
  },
};
