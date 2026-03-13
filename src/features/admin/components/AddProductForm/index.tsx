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
    <div className="bg-white border border-slate-200 rounded-md shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-sm font-bold text-primary uppercase">
          Add New Product
        </h2>
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

        {/* Buttons */}
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
  )
}
export default AddProductForm
