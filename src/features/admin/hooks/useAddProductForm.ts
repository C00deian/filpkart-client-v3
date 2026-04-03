import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { productFormSchema, ProductFormValues } from '../components/AddProductForm/schema/productSchema'
import { addProduct } from '../services/adminService'
import { uploadToCloudinary } from '@/utils/cloudinary'
import type { ImageType } from '@/features/products/types/product.types'
import { ADMIN_PRODUCTS_KEY } from './useAdminProducts'

export const useAddProductForm = (onSuccess?: () => void) => {
  const qc = useQueryClient()
  const [isLoading, setLoading] = useState(false)
  const [images, setImages] = useState<ImageType[]>([])

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '', description: '', brand: '',
      quantity: 1, price: 0, inStock: true, categoryId: 0,
    },
  })

  const handleImageChange = (color: string, colorCode: string, file: File | null) => {
    setImages(prev => {
      const idx = prev.findIndex(i => i.color === color)
      if (!file)    return prev.filter(i => i.color !== color)
      if (idx >= 0) return prev.map((i, n) => n === idx ? { color, colorCode, imageUrl: file } : i)
      return [...prev, { color, colorCode, imageUrl: file }]
    })
  }

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    if (images.length === 0) {
      toast.error('Upload at least one product image')
      return
    }
    setLoading(true)
    try {
      const uploadedImages = await Promise.all(
        images.map(async img => ({
          color:     img.color,
          colorCode: img.colorCode,
          imageUrl:  await uploadToCloudinary(img.imageUrl as File),
        }))
      )
      await addProduct({ ...data, images: uploadedImages })
      toast.success('Product added successfully!')
      qc.invalidateQueries({ queryKey: ADMIN_PRODUCTS_KEY })
      form.reset()
      setImages([])
      onSuccess?.()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to add product')
    } finally {
      setLoading(false)
    }
  }

  return { form, images, isLoading, handleImageChange, onSubmit: form.handleSubmit(onSubmit) }
}
