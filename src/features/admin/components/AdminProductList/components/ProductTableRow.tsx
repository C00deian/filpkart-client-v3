import { Trash2, ToggleLeft, ToggleRight, Pencil } from 'lucide-react'
import type { Product } from '@/types/product.types'
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
      <div className="flex items-center gap-1">
        <button onClick={() => onEdit(product)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors"
          title="Edit">
          <Pencil className="w-4 h-4" />
        </button>
        <button onClick={() => onToggleStock(product.id)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
          title={product.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}>
          {product.inStock
            ? <ToggleRight className="w-4 h-4 text-green-500" />
            : <ToggleLeft  className="w-4 h-4 text-slate-400" />
          }
        </button>
        <button onClick={() => { if (confirm('Delete this product?')) onDelete(product.id) }}
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          title="Delete">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </td>
  </tr>
)
export default ProductTableRow
