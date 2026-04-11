import { useState } from 'react'
import { Plus, Tag } from 'lucide-react'
import { useCategories } from '@/features/products/hooks/useCategories'
import { Skeleton } from '@/components/ui/Skeleton'
import AddCategoryForm from '../AddCategoryForm'

const AdminCategoryList = () => {
  const { data: categories = [], isLoading } = useCategories()
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between p-2">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Tag className="w-6 h-6 text-primary" /> Manage Categories
          </h1>
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

export default AdminCategoryList;