import { Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import type { Product } from '@/features/products/types/product.types'
import { formatPrice } from '@/utils/formatPrice'

interface Props {
  product: Product
  onDelete: (id: number) => void
  onToggleStock: (id: number) => void
  onEdit: (product: Product) => void
}

const ProductAdminCard = ({ product, onDelete, onToggleStock, onEdit }: Props) => {
  return (
    <div className="border border-[#e0e0e0] bg-white rounded-sm p-4 hover:shadow-sm transition">
      <div className="flex items-center gap-4">
        {/* Thumbnail */}
        <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
          {product.images?.[0]?.imageUrl
            ? <img src={product.images[0].imageUrl} alt={product.name} className="w-full h-full object-contain p-1" />
            : <span className="text-slate-300 text-2xl">📦</span>
          }
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          {/* Category badge */}
          <span className="inline-block text-[11px] font-semibold px-2 py-0.5 bg-[#f0f0f0] text-[#212121] rounded mb-1">
            {product.category.name}
          </span>

          {/* Name + brand */}
          <p className="text-[14px] font-semibold text-[#212121] line-clamp-1">{product.name}</p>
          <p className="text-[12px] text-[#878787] mt-0.5">{product.brand}</p>

          {/* Price + stock */}
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-[14px] font-bold text-[#212121]">{formatPrice(product.price)}</span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
              product.inStock
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-600'
            }`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>

        <div className="ml-auto flex flex-shrink-0 items-center justify-center gap-2 self-center">
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
      </div>
    </div>
  )
}

export default ProductAdminCard
