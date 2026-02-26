import { X } from 'lucide-react'
import { useAddProductForm } from '../../hooks/useAddProductForm'
import BasicInfoSection from './sections/BasicInfoSection'
import PricingSection from './sections/PricingSection'
import StockSection from './sections/StockSection'
import ColorImageSection from './sections/ColorImageSection'
import Button from '@/components/ui/Button'

interface Props { onClose: () => void }

const AddProductForm = ({ onClose }: Props) => {
  const { form, images, isLoading, handleImageChange, onSubmit } = useAddProductForm(onClose)

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-2xl my-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Add New Product</h2>
            <p className="text-xs text-slate-400">Fill in all required fields</p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-6 space-y-6">
          <BasicInfoSection form={form} />
          <div className="border-t border-slate-100" />
          <PricingSection form={form} />
          <div className="border-t border-slate-100" />
          <ColorImageSection images={images} onChange={handleImageChange} />
          <div className="border-t border-slate-100" />
          <StockSection form={form} />

          {/* Footer */}
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose} fullWidth>
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading} fullWidth>
              {isLoading ? 'Adding Product...' : 'Add Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddProductForm
