import { UseFormReturn } from 'react-hook-form'
import type { ProductFormValues } from '../schema/productSchema'

interface Props { form: UseFormReturn<ProductFormValues> }

const StockSection = ({ form }: Props) => {
  const { register, watch } = form
  const inStock = watch('inStock')

  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
      <div>
        <p className="text-sm font-semibold text-slate-700">Stock Status</p>
        <p className="text-xs text-slate-400 mt-0.5">
          {inStock ? '✅ Product is available for purchase' : '❌ Product is hidden from customers'}
        </p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input {...register('inStock')} type="checkbox" className="sr-only peer" />
        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer
          peer-checked:after:translate-x-full peer-checked:after:border-white
          after:content-[''] after:absolute after:top-[2px] after:left-[2px]
          after:bg-white after:border-gray-300 after:border after:rounded-full
          after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
      </label>
    </div>
  )
}
export default StockSection
