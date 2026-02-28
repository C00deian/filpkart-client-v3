import { z } from 'zod'

export const addressSchema = z.object({
  name:           z.string().min(1, 'Full name is required'),
  phoneNumber:    z.string()
                    .min(10, 'Enter valid 10-digit phone')
                    .max(15, 'Too long'),
  pincode:        z.string()
                    .length(6, 'Pincode must be 6 digits')
                    .regex(/^[0-9]+$/, 'Only digits allowed'),
  locality:       z.string().min(1, 'Locality / Area is required'),
  addressLine:    z.string().min(5, 'Address is too short'),
  city:           z.string().min(1, 'City is required'),
  state:          z.string().min(1, 'State is required'),
  landmark:       z.string().optional(),
  alternatePhone: z.string().optional(),
  addressType:    z.enum(['HOME', 'WORK']).default('HOME'),
})

export type AddressFormValues = z.infer<typeof addressSchema>
