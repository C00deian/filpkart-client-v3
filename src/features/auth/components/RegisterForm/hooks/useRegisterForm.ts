import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { registerSchema ,RegisterFormValues } from '../schema/registerSchema'
import { authService } from '@/services/authService'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { ROUTES } from '@/routes/routePaths'

export const useRegisterForm = () => {
  const { register} = useAuth()
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { phoneNumber : '' },
  })

  const onSubmit: SubmitHandler<RegisterFormValues> = async ({ phoneNumber }) => {
    setLoading(true)
    try {
      await authService.register({ phoneNumber: phoneNumber })
      const user = await authService.getMe()
      register(user)
      toast.success("Account creation done.")
      navigate(ROUTES.HOME)
    } catch {
      toast.error('Account creation failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return { form, onSubmit: form.handleSubmit(onSubmit), isLoading }
}
