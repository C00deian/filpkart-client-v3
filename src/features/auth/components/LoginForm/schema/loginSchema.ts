import { z } from 'zod'

export const loginSchema = z.object({
  identifier: z.string().min(1, 'Email or phone number is required'),
})
export type LoginFormValues = z.infer<typeof loginSchema>
