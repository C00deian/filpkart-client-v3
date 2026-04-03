import { API_ENDPOINTS } from "@/config/constants";
import apiClient from "@/services/apiClient";
import type { ApiResponse } from "@/types/api.types";
import type {
  User,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth.types";

export const authService = {

  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
    );
    return res.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data,
    );
    return res.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },
  getMe: async (): Promise<User> => {
    const res = await apiClient.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.ME);
    return res.data.data;
  },
  
};
