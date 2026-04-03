import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { loginSchema, LoginFormValues } from '../schema/loginSchema'
import { authService } from '@/features/auth/services/authService'
import { useAuthActions } from '@/features/auth/hooks/useAuthActions'
import { ROUTES } from '@/routes/routePaths'

export const useLoginForm = () => {
  const { login } = useAuthActions()
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '' },
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async ({ identifier }) => {
    setLoading(true)
    try {
      const isEmail = identifier.includes('@')
      await authService.login(isEmail ? { email: identifier } : { phoneNumber: identifier })
      const user = await authService.getMe()
      login(user)
      toast.success('Welcome back!')
      navigate(ROUTES.HOME)
    } catch {
      toast.error('Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return { form, onSubmit: form.handleSubmit(onSubmit), isLoading }
}
