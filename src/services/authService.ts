import api from "./api";
import type {
  User,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "@/types/auth.types";

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/auth/login", credentials);
    return res.data;
  },
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/auth/register", data);
    return res.data;
  },
  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },
  getMe: async (): Promise<User> => {
    const res = await api.get<User>("/auth/me");
    return res.data;
  },
};
