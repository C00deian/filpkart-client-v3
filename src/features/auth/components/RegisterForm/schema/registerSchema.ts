import { z } from 'zod'

export const registerSchema = z.object({
  phoneNumber: z.string().min(1, 'Phone number is required'),
})
export type RegisterFormValues = z.infer<typeof registerSchema>
