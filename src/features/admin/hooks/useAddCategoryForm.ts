import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { addCategory } from '../services/adminService'

const categorySchema = z.object({
  name:     z.string().min(1, 'Name is required'),
  slug:     z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug: lowercase, numbers, hyphens only'),
  imageUrl: z.string().url('Must be a valid URL'),
})

export type CategoryFormValues = z.infer<typeof categorySchema>

export const useAddCategoryForm = (onSuccess?: () => void) => {
  const qc = useQueryClient()
  const [isLoading, setLoading] = useState(false)

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: '', slug: '', imageUrl: '' },
  })

  const autoSlug = (name: string) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    form.setValue('slug', slug)
  }

  const onSubmit: SubmitHandler<CategoryFormValues> = async (data) => {
    setLoading(true)
    try {
      await addCategory(data)
      toast.success('Category added!')
      qc.invalidateQueries({ queryKey: ['categories'] })
      form.reset()
      onSuccess?.()
    } catch {
      toast.error('Failed to add category')
    } finally {
      setLoading(false)
    }
  }

  return { form, isLoading, autoSlug, onSubmit: form.handleSubmit(onSubmit) }
}
