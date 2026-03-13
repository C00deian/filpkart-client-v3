import { useState } from 'react'
import { Plus, Tag } from 'lucide-react'
import { useCategories } from '@/features/products/hooks/useCategories'
import { useAddCategoryForm } from '../../hooks/useAddCategoryForm'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Skeleton } from '@/components/ui/Skeleton'

/* ── Inline form card — same shell as AddressForm / AddProductForm ── */
const AddCategoryForm = ({ onClose }: { onClose: () => void }) => {
  const { form, isLoading, autoSlug, onSubmit } = useAddCategoryForm(onClose)
  const { register, formState: { errors }, watch } = form

  return (
    <div className="bg-white border border-slate-200 rounded-md shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-sm font-bold text-primary uppercase">Add New Category</h2>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="p-6 space-y-4">
        <Input
          {...register('name')}
          label="Category Name"
          placeholder="e.g. Electronics"
          error={errors.name?.message}
          onChange={e => {
            register('name').onChange(e)
            autoSlug(e.target.value)
          }}
        />
        <Input
          {...register('slug')}
          label="Slug"
          placeholder="e.g. electronics"
          error={errors.slug?.message}
          helperText="Auto-generated from name. Lowercase, hyphens only."
        />
        <Input
          {...register('imageUrl')}
          label="Image URL"
          placeholder="https://..."
          error={errors.imageUrl?.message}
        />
        {watch('imageUrl') && (
          <img
            src={watch('imageUrl')}
            alt="preview"
            className="w-20 h-20 rounded-lg object-cover border border-slate-200"
          />
        )}
        <div className="flex gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} fullWidth>Cancel</Button>
          <Button type="submit" isLoading={isLoading} fullWidth>Add Category</Button>
        </div>
      </form>
    </div>
  )
}

/* ── Main list ── */
const AdminCategoryList = () => {
  const { data: categories = [], isLoading } = useCategories()
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between p-2">
        <h2 className="font-bold text-slate-800 flex items-center">
          <Tag className="w-4 h-4 text-primary mr-2" /> Manage Categories
        </h2>
      </div>

      {/* Add Category inline toggle button */}
      {!showForm && (
        <div className="flex items-center w-full py-2 text-primary text-xs border border-[#e0e0e0] bg-white font-semibold cursor-pointer gap-2">
          <button onClick={() => setShowForm(true)}>
            <div className="p-2 flex items-center gap-2 uppercase">
              <Plus className="w-4 h-4" /> Add New Category
            </div>
          </button>
        </div>
      )}

      {/* Inline form with slide-down animation */}
      {showForm && (
        <div className="animate-slideDown">
          <AddCategoryForm onClose={() => setShowForm(false)} />
        </div>
      )}

      {/* Category cards grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-xl" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-sm p-10 text-center">
          <Tag className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-700">No categories yet</p>
          <p className="text-xs text-slate-500 mt-1">Add a new category to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.map(cat => (
            <div
              key={cat.id}
              className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col items-center gap-3 hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                {cat.imageUrl
                  ? <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" />
                  : <Tag className="w-6 h-6 text-slate-300" />
                }
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-800">{cat.name}</p>
                <p className="text-xs text-slate-400 font-mono">{cat.slug}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default AdminCategoryList


