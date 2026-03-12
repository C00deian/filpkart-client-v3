import { useState } from 'react'
import { Plus, Tag, X } from 'lucide-react'
import { useCategories } from '@/features/products/hooks/useCategories'
import { useAddCategoryForm } from '../../hooks/useAddCategoryForm'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Skeleton } from '@/components/ui/Skeleton'

const AddCategoryModal = ({ onClose }: { onClose: () => void }) => {
  const { form, isLoading, autoSlug, onSubmit } = useAddCategoryForm(onClose)
  const { register, formState: { errors }, watch } = form

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Add Category</h2>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>
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
            <img src={watch('imageUrl')} alt="preview"
              className="w-20 h-20 rounded-lg object-cover border border-slate-200" />
          )}
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose} fullWidth>Cancel</Button>
            <Button type="submit" isLoading={isLoading} fullWidth>Add Category</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

const AdminCategoryList = () => {
  const { data: categories = [], isLoading } = useCategories()
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Tag className="w-6 h-6 text-primary" /> Categories
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">{categories.length} categories</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors text-sm">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-36 rounded-xl" />)
          : categories.map(cat => (
            <div key={cat.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col items-center gap-3 hover:shadow-md transition-shadow">
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
          ))
        }
      </div>

      {showForm && <AddCategoryModal onClose={() => setShowForm(false)} />}
    </div>
  )
}
export default AdminCategoryList
