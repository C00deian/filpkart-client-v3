import { Navigate, Outlet } from 'react-router-dom'
import { useAuthValue } from '@/features/auth/hooks/useAuthValue'
import PageLoader from '@/components/ui/Loader'
import { ROUTES } from './routePaths'

const PrivateRoute = () => {
  const { user, isLoading } = useAuthValue()
  if (isLoading) return <PageLoader spinnerClassName="border-blue-600" />
  return user ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />
}

export default PrivateRoute