import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/routePaths'
import PageWrapper from '@/components/layout/PageWrapper'

const NotFoundPage = () => (
  <PageWrapper>
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <div className="text-8xl font-bold text-primary/20">404</div>
      <h1 className="text-2xl font-bold text-slate-800">Page Not Found</h1>
      <p className="text-slate-500 max-w-sm">The page you are looking for might have been removed or is temporarily unavailable.</p>
      <Link to={ROUTES.HOME}
        className="mt-2 bg-primary text-white font-bold px-8 py-3 rounded hover:bg-primary-dark transition-colors">
        Go to Homepage
      </Link>
    </div>
  </PageWrapper>
)
export default NotFoundPage
