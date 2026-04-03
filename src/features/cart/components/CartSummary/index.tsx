import { useNavigate } from 'react-router-dom'
import { formatPrice } from '@/utils/formatPrice'
import { ROUTES } from '@/routes/routePaths'
import type { CartDto } from '@/features/cart/types/cart.types'

interface Props {
  cart: CartDto
  /** Pass true on the checkout page to hide the PLACE ORDER button */
  hideAction?: boolean
}

const CartSummary = ({ cart, hideAction = false }: Props) => {
  const navigate = useNavigate()
  const savings = cart.items.reduce((sum, i) => sum + (i.unitPrice * i.quantity - i.totalPrice), 0)

  return (
    <div className="bg-white rounded-sm shadow-card p-4 sticky top-20">
      <h3 className="text-slate-500 font-bold uppercase text-xs tracking-wider mb-4 pb-3 border-b border-slate-100">
        Price Details
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-slate-700">
          <span>Price ({cart.items.length} item{cart.items.length > 1 ? 's' : ''})</span>
          <span>{formatPrice(cart.totalPrice)}</span>
        </div>
        {savings > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>- {formatPrice(savings)}</span>
          </div>
        )}
        <div className="flex justify-between text-green-600">
          <span>Delivery Charges</span>
          <span className="flex items-center gap-1">
            <span className="line-through text-slate-400 text-xs">₹100</span> FREE
          </span>
        </div>
        <div className="border-t border-dashed border-slate-200 pt-3 flex justify-between font-bold text-base text-slate-900">
          <span>Total Amount</span>
          <span>{formatPrice(cart.totalPrice)}</span>
        </div>
        {savings > 0 && (
          <p className="text-green-600 text-sm font-semibold">
            You will save {formatPrice(savings)} on this order
          </p>
        )}
      </div>

      {!hideAction && (
        <button
          onClick={() => navigate(ROUTES.CHECKOUT)}
          className="mt-5 w-full py-3 bg-[#fb641b] hover:bg-[#e85d10] text-white font-bold rounded shadow-sm transition-colors">
          PLACE ORDER
        </button>
      )}
    </div>
  )
}
export default CartSummary
