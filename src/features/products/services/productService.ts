import apiClient from "@/services/apiClient";
import { API_ENDPOINTS } from "@/config/constants";
import type { Product, ProductFilters, Category } from "../types/product.types";
import type { ApiResponse } from "@/types/api.types";

export const productService = {
  getProducts: async (filters: ProductFilters = {}): Promise<Product[]> => {
    const res = await apiClient.get<ApiResponse<Product[]>>(
      API_ENDPOINTS.PRODUCTS.ROOT,
      { params: filters },
    );
    return res.data.data;
  },
  getProductById: async (id: number): Promise<Product> => {
    const res = await apiClient.get<ApiResponse<Product>>(
      `${API_ENDPOINTS.PRODUCTS.ROOT}/${id}`,
    );
    return res.data.data;
  },
  getCategories: async (): Promise<Category[]> => {
    const res = await apiClient.get<Category[]>(
      API_ENDPOINTS.PRODUCTS.CATEGORIES,
    );
    return res.data;
  },
};
