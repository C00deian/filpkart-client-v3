import { createContext } from "react";
import type { User } from "@/features/auth/types/auth.types";

export interface AuthValueContextValue {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
}

export interface AuthActionsContextValue {
  login: (userData: User) => void;
  logout: () => Promise<void>;
  register: (userData: User) => void;
}

export const AuthValueContext = createContext<AuthValueContextValue | null>(null);
export const AuthActionsContext = createContext<AuthActionsContextValue | null>(
  null
);
