import apiClient from "@/services/apiClient";
import type {
  Category,
  Product,
  ProductFormType,
  CategoryFormType,
} from "@/features/products/types/product.types";
import type { Order } from "@/features/orders/types/order.types";

// ─── Orders ───────────────────────────────────────────────
export const getAllOrders = async (): Promise<Order[]> => {
  const res = await apiClient.get<Order[]>("/admin/orders");
  return res.data;
};

export const getOrder = async (orderId: string): Promise<Order> => {
  const res = await apiClient.get<Order>(`/admin/orders/${orderId}`);
  return res.data;
};

export const dispatchOrder = async (id: string): Promise<Order> => {
  const res = await apiClient.put<Order>(`/admin/orders/${id}/dispatch`);
  return res.data;
};

export const deliverOrder = async (id: string): Promise<Order> => {
  const res = await apiClient.put<Order>(`/admin/orders/${id}/deliver`);
  return res.data;
};

// ─── Products ─────────────────────────────────────────────
export const addProduct = async (data: ProductFormType): Promise<Product> => {
  const res = await apiClient.post<Product>("/products/add-product", data);
  return res.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await apiClient.delete(`/products/${id}`);
};

export const toggleStockStatus = async (id: number): Promise<Product> => {
  const res = await apiClient.put<Product>(`/products/${id}/stock`);
  return res.data;
};

export const updateProduct = async (
  id: number,
  data: ProductFormType,
): Promise<Product> => {
  const res = await apiClient.put<Product>(`/products/${id}`, data);
  return res.data;
};

// ─── Categories ───────────────────────────────────────────
export const addCategory = async (
  data: CategoryFormType,
): Promise<Category> => {
  const res = await apiClient.post<Category>("/products/add-category", data);
  return res.data;
};
