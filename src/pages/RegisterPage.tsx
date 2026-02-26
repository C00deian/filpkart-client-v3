import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/routePaths'

const RegisterPage = () => (
  <div className="min-h-screen bg-primary flex items-center justify-center p-4">
    <div className="bg-white rounded shadow-xl p-8 w-full max-w-md text-center">
      <h2 className="text-2xl font-bold mb-2">Create Account</h2>
      <p className="text-slate-500 mb-6 text-sm">Join millions of happy shoppers</p>
      <p className="text-sm text-slate-500">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="text-primary font-semibold hover:underline">Login</Link>
      </p>
    </div>
  </div>
)
export default RegisterPage
