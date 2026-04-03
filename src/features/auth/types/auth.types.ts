export interface LoginRequest {
  email?: string;
  phoneNumber?: string;
}
export interface RegisterRequest {
  phoneNumber?: string;
}
export interface AuthResponse {
  success: boolean;
  message: string;
  data: { token: string };
}

export interface User {
  
  id: number;
  userId: string;
  name?: string | null;
  email?: string | null;
  role: "USER" | "ADMIN" | "SELLER" | string;
  gender?: string | null;
  phoneNumber?: string | null;
}
