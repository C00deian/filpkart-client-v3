import { Navigate, Outlet } from 'react-router-dom'
import { useAuthValue } from '@/features/auth/hooks/useAuthValue'
import PageLoader from '@/components/ui/Loader'
import { ROUTES } from './routePaths'

const AdminRoute = () => {
  const { isAdmin, isLoading } = useAuthValue()
  if (isLoading) return <PageLoader spinnerClassName="border-blue-600" />
  return isAdmin ? <Outlet /> : <Navigate to={ROUTES.HOME} replace />
}

export default AdminRoute
