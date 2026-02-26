import { z } from 'zod'

export const productFormSchema = z.object({
  name:        z.string().min(1, 'Product name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  categoryId:  z.coerce.number().min(1, 'Please select a category'),
  brand:       z.string().min(1, 'Brand is required'),
  quantity:    z.coerce.number().min(1, 'Quantity must be at least 1'),
  price:       z.coerce.number().min(0.1, 'Price must be greater than ₹0'),
  inStock:     z.boolean(),
})

export type ProductFormValues = z.infer<typeof productFormSchema>
