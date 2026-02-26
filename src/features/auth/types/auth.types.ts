import { User } from "@/types/auth.types";


export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
export interface AuthResponse {
  token: string;
  user: User;
}
