import { useState } from 'react'
import { Plus, Search, Package } from 'lucide-react'
import { useAdminProducts } from '../../hooks/useAdminProducts'
import { useCategories } from '@/features/products/hooks/useCategories'
import ProductTableRow from './components/ProductTableRow'
import AddProductForm from '../AddProductForm'
import { Skeleton } from '@/components/ui/Skeleton'
import type { Product } from '@/types/product.types'

const AdminProductList = () => {
  const {
    products, isLoading,
    search, setSearch,
    categoryFilter, setCategoryFilter,
    deleteProduct, toggleStock,
  } = useAdminProducts()
  const { data: categories = [] } = useCategories()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" /> Products
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">{products.length} products</p>
        </div>
        <button onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors text-sm">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or brand..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
        </div>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition bg-white text-slate-700">
          <option value="all">All Categories</option>
          {categories.map(cat => <option key={cat.id} value={cat.slug}>{cat.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-lg" />)}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-slate-400 gap-3">
            <Package className="w-12 h-12" />
            <p className="font-medium">No products found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['Product', 'Category', 'Price', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {products.map(p => (
                  <ProductTableRow
                    key={p.id}
                    product={p}
                    onDelete={deleteProduct}
                    onToggleStock={toggleStock}
                    onEdit={setEditProduct}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddForm && <AddProductForm onClose={() => setShowAddForm(false)} />}
    </div>
  )
}
export default AdminProductList
