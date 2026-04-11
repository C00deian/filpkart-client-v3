import { useState } from 'react'
import { Plus, Package, Search } from 'lucide-react'
import { useAdminProducts } from '../../hooks/useAdminProducts'
import { useCategories } from '@/features/products/hooks/useCategories'
import ProductAdminCard from './components/ProductAdminCard'
import AddProductForm from '../AddProductForm'
import { Skeleton } from '@/components/ui/Skeleton'
import type { Product } from '@/features/products/types/product.types'

const AdminProductList = () => {
  const {
    products, isLoading, isDeleting,
    search, setSearch,
    categoryFilter, setCategoryFilter,
    deleteProduct, toggleStock,
  } = useAdminProducts()
  const { data: categories = [] } = useCategories()
  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleEdit = (product: Product) => {
    setEditProduct(product)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id)
      deleteProduct(id)
      if (editProduct?.id === id) {
        setEditProduct(null)
        setShowForm(false)
      }
    } finally {
      setDeletingId(null)
    }
  }

  const handleClose = () => {
    setEditProduct(null)
    setShowForm(false)
  }

  return (
    <div className="space-y-4">
      {/* Title row */}
      <div className="flex items-center justify-between p-2">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Package className="w-6 h-6 text-primary" /> Manage Products
        </h1>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or brand..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-[#e0e0e0] rounded outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition bg-white"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="border border-[#e0e0e0] rounded px-3 py-2 text-sm outline-none focus:border-primary transition bg-white text-slate-700"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => <option key={cat.id} value={cat.slug}>{cat.name}</option>)}
        </select>
      </div>

      {/* Add Product inline toggle button — hidden while form is open */}
      {!showForm && (
        <div className="flex items-center w-full py-2 text-primary text-xs border border-[#e0e0e0] bg-white font-semibold cursor-pointer gap-2">
          <button onClick={() => setShowForm(true)}>
            <div className="p-2 flex items-center gap-2 uppercase">
              <Plus className="w-4 h-4" /> Add New Product
            </div>
          </button>
        </div>
      )}

      {/* Inline form with slide-down animation */}
      {showForm && (
        <div className="animate-slideDown">
          <AddProductForm onClose={handleClose} />
        </div>
      )}

      {/* Product list */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-28 rounded-lg" />)}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-sm p-10 text-center">
          <Package className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-700">No products found</p>
          <p className="text-xs text-slate-500 mt-1">Add a new product to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map(p => (
            <div
              key={p.id}
              className={deletingId === p.id ? 'opacity-60 pointer-events-none' : ''}
            >
              <ProductAdminCard
                product={p}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStock={toggleStock}
              />
              {deletingId === p.id && isDeleting && (
                <p className="text-xs text-slate-500 mt-1 px-1">Removing product...</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default AdminProductList
