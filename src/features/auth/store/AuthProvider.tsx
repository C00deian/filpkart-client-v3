import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContext } from './AuthContext'
import type { User } from '@/types/auth.types'
import { isAdminRole } from '@/types/user.types'
import { authService } from '@/services/authService'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser]         = useState<User | null>(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    authService.getMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback((userData: User) => {
    setUser(userData)
  }, [])

  const logout = useCallback(async () => {
    try { await authService.logout() } finally { setUser(null) }
  }, [])

  const value = useMemo(() => ({
    user,
    isLoading,
    isAdmin: isAdminRole(user?.role),
    login,
    logout,
  }), [user, isLoading, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
