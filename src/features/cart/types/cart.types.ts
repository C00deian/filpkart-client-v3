import type { Product } from "@/features/products/types/product.types";

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
}

export interface CartItemDto {
  productId: number;
  productName: string;
  productImage: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CartDto {
  id: string;
  userId: string;
  items: CartItemDto[];
  totalPrice: number;
}

export interface AddToCartRequest {
  productId: number;
  quantity?: number;
}
