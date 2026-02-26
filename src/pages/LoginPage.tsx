import LoginForm from '@/features/auth/components/LoginForm'

const LoginPage = () => (
  <div className="min-h-screen bg-primary flex flex-col">
    <div className="flex-1 flex items-center justify-center p-4">
      <LoginForm />
    </div>
  </div>
)
export default LoginPage
