import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AuthActionsContext,
  AuthValueContext,
} from "./AuthContext";
import type { User } from "@/features/auth/types/auth.types";
import { isAdminRole } from "@/features/account/types/user.types";
import { authService } from "@/features/auth/services/authService";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback((userData: User) => {
    setUser(userData);
  }, []);

  const register = useCallback((userData: User) => {
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAdmin: isAdminRole(user?.role),
    }),
    [user, isLoading]
  );

  const actions = useMemo(
    () => ({
      login,
      logout,
      register,
    }),
    [login, logout, register]
  );

  return (
    <AuthActionsContext.Provider value={actions}>
      <AuthValueContext.Provider value={value}>
        {children}
      </AuthValueContext.Provider>
    </AuthActionsContext.Provider>
  );
};
