import { createContext } from "react";
import type { User } from "@/types/auth.types";

export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  register: (userData: User) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
