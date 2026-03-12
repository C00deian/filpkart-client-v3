import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { ROUTES } from './routePaths'

const AdminRoute = () => {
  const { isAdmin, isLoading } = useAuth()
  if (isLoading) return <div className="flex h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" /></div>
  return isAdmin ? <Outlet /> : <Navigate to={ROUTES.HOME} replace />
}

export default AdminRoute