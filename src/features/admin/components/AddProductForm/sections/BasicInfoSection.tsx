import { UseFormReturn } from 'react-hook-form'
import type { ProductFormValues } from '../schema/productSchema'
import Input from '@/components/ui/Input'
import { useCategories } from '@/features/products/hooks/useCategories'

interface Props { form: UseFormReturn<ProductFormValues> }

const BasicInfoSection = ({ form }: Props) => {
  const { register, formState: { errors } } = form
  const { data: categories = [] } = useCategories()

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Basic Info</h3>

      <Input
        {...register('name')}
        label="Product Name"
        placeholder="e.g. Sony WH-1000XM5 Headphones"
        error={errors.name?.message}
      />

      <div>
        <label className="text-sm font-medium text-slate-700 block mb-1">Description</label>
        <textarea
          {...register('description')}
          rows={3}
          placeholder="Describe the product..."
          className={`w-full border rounded px-3 py-2.5 text-sm text-slate-800 outline-none transition resize-none
            placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20
            ${errors.description ? 'border-red-400' : 'border-slate-300'}`}
        />
        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
      </div>

      <Input
        {...register('brand')}
        label="Brand"
        placeholder="e.g. Sony, Apple, Samsung"
        error={errors.brand?.message}
      />

      <div>
        <label className="text-sm font-medium text-slate-700 block mb-1">Category</label>
        <select
          {...register('categoryId', { valueAsNumber: true })}
          className={`w-full border rounded px-3 py-2.5 text-sm text-slate-800 outline-none transition bg-white
            focus:border-primary focus:ring-2 focus:ring-primary/20
            ${errors.categoryId ? 'border-red-400' : 'border-slate-300'}`}
        >
          <option value={0}>Select a category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        {errors.categoryId && <p className="text-xs text-red-500 mt-1">{errors.categoryId.message}</p>}
      </div>
    </div>
  )
}
export default BasicInfoSection
