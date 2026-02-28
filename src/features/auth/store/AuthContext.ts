import { createContext } from 'react'
import type { User } from '@/types/auth.types'

export interface AuthContextValue {
  user: User 
  isLoading: boolean
  isAdmin: boolean
  login: (userData: User) => void
  logout: () => void
  register: (userData : User) => void 
}

export const AuthContext = createContext<AuthContextValue | null>(null)
