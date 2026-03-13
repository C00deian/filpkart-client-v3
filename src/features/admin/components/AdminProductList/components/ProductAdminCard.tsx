import { useState } from 'react'
import { MoreVertical, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import type { Product } from '@/types/product.types'
import { formatPrice } from '@/utils/formatPrice'

interface Props {
  product: Product
  onDelete: (id: number) => void
  onToggleStock: (id: number) => void
  onEdit: (product: Product) => void
}

const ProductAdminCard = ({ product, onDelete, onToggleStock, onEdit }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative border border-[#e0e0e0] bg-white rounded-sm p-4 hover:shadow-sm transition"
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-start gap-4">
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

        {/* 3-dot menu */}
        <div className="relative flex-shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); setOpen(p => !p) }}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>

          {open && (
            <div className="absolute right-0 mt-1 w-36 bg-white border border-[#e0e0e0] shadow-md rounded-sm z-10">
              <button
                onClick={() => { setOpen(false); onEdit(product) }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
              >
                <Pencil className="w-3.5 h-3.5 text-primary" /> Edit
              </button>
              <button
                onClick={() => { setOpen(false); onToggleStock(product.id) }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
              >
                {product.inStock
                  ? <><ToggleRight className="w-3.5 h-3.5 text-orange-500" /> Mark Out of Stock</>
                  : <><ToggleLeft  className="w-3.5 h-3.5 text-green-500" /> Mark In Stock</>
                }
              </button>
              <button
                onClick={() => {
                  setOpen(false)
                  if (confirm('Delete this product?')) onDelete(product.id)
                }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductAdminCard

