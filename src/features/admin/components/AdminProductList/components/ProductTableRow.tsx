import { Trash2, ToggleLeft, ToggleRight, Pencil } from 'lucide-react'
import type { Product } from '@/features/products/types/product.types'
import { formatPrice } from '@/utils/formatPrice'
import Badge from '@/components/ui/Badge'

interface Props {
  product: Product
  onDelete: (id: number) => void
  onToggleStock: (id: number) => void
  onEdit: (product: Product) => void
}

const ProductTableRow = ({ product, onDelete, onToggleStock, onEdit }: Props) => (
  <tr className="hover:bg-slate-50 transition-colors">
    <td className="px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
          {product.images?.[0]?.imageUrl
            ? <img src={product.images[0].imageUrl} alt={product.name} className="w-full h-full object-contain p-1" />
            : <span className="text-slate-300 text-xl">📦</span>
          }
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-800 line-clamp-1">{product.name}</p>
          <p className="text-xs text-slate-400">{product.brand}</p>
        </div>
      </div>
    </td>
    <td className="px-4 py-3 text-sm text-slate-600">{product.category.name}</td>
    <td className="px-4 py-3 text-sm font-semibold text-slate-800">{formatPrice(product.price)}</td>
    <td className="px-4 py-3">
      <Badge
        label={product.inStock ? 'In Stock' : 'Out of Stock'}
        variant={product.inStock ? 'success' : 'error'}
        size="sm"
      />
    </td>
    <td className="px-4 py-3">
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => onEdit(product)}
          title="Edit"
          aria-label="Edit product"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-700 transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={() => onToggleStock(product.id)}
          title={product.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
          aria-label={product.inStock ? 'Mark product out of stock' : 'Mark product in stock'}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-md border transition ${
            product.inStock
              ? 'border-orange-200 text-orange-600 hover:bg-orange-50'
              : 'border-green-200 text-green-600 hover:bg-green-50'
          }`}
        >
          {product.inStock
            ? <ToggleRight className="h-4 w-4" />
            : <ToggleLeft className="h-4 w-4" />
          }
        </button>
        <button
          onClick={() => { if (confirm('Delete this product?')) onDelete(product.id) }}
          title="Delete"
          aria-label="Delete product"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-red-200 text-red-600 transition hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </td>
  </tr>
)
export default ProductTableRow
