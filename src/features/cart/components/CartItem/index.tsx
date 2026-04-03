import { Minus, Plus, Trash2 } from 'lucide-react'
import type { CartItemDto } from '@/features/cart/types/cart.types'
import { formatPrice } from '@/utils/formatPrice'
import { useCart } from '@/features/cart/hooks/useCart'

interface Props { item: CartItemDto }

const CartItem = ({ item }: Props) => {
  const { increaseItem, decreaseItem, removeItem } = useCart()

  return (
    <div className="flex gap-4 p-4 border-b border-slate-100 last:border-0">
      <div className="w-24 h-24 flex-shrink-0 bg-slate-50 rounded flex items-center justify-center overflow-hidden">
        {item.productImage
          ? <img src={item.productImage} alt={item.productName} className="w-full h-full object-contain p-1" />
          : <span className="text-3xl">📦</span>
        }
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 line-clamp-2 mb-1">{item.productName}</p>
        <p className="text-xs text-slate-400 mb-3">Unit Price: {formatPrice(item.unitPrice)}</p>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Quantity Controls */}
          <div className="flex items-center border border-slate-300 rounded">
            <button onClick={() => decreaseItem(item.productId)}
              className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors rounded-l">
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center text-sm font-semibold text-slate-800">{item.quantity}</span>
            <button onClick={() => increaseItem(item.productId)}
              className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors rounded-r">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button onClick={() => removeItem(item.productId)}
            className="flex items-center gap-1.5 text-slate-400 hover:text-red-500 text-xs font-medium transition-colors">
            <Trash2 className="w-3.5 h-3.5" /> Remove
          </button>
        </div>
      </div>

      <div className="flex-shrink-0 text-right">
        <p className="font-bold text-slate-900">{formatPrice(item.totalPrice)}</p>
      </div>
    </div>
  )
}
export default CartItem
