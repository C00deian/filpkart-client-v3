import { UseFormReturn } from 'react-hook-form'
import type { ProductFormValues } from '../schema/productSchema'

interface Props { form: UseFormReturn<ProductFormValues> }

const PricingSection = ({ form }: Props) => {
  const { register, formState: { errors } } = form

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Pricing & Stock</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Price */}
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">Price (₹)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
            <input
              {...register('price', { valueAsNumber: true })}
              type="number" min="0" step="0.01"
              placeholder="0.00"
              className={`w-full border rounded pl-7 pr-3 py-2.5 text-sm text-slate-800 outline-none transition
                focus:border-primary focus:ring-2 focus:ring-primary/20
                ${errors.price ? 'border-red-400' : 'border-slate-300'}`}
            />
          </div>
          {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>}
        </div>

        {/* Quantity */}
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">Quantity</label>
          <input
            {...register('quantity', { valueAsNumber: true })}
            type="number" min="1"
            placeholder="1"
            className={`w-full border rounded px-3 py-2.5 text-sm text-slate-800 outline-none transition
              focus:border-primary focus:ring-2 focus:ring-primary/20
              ${errors.quantity ? 'border-red-400' : 'border-slate-300'}`}
          />
          {errors.quantity && <p className="text-xs text-red-500 mt-1">{errors.quantity.message}</p>}
        </div>
      </div>
    </div>
  )
}
export default PricingSection
