import PageWrapper from '@/components/layout/PageWrapper'
import { useCart } from '@/features/cart/hooks/useCart'
import CartItem from '@/features/cart/components/CartItem'
import CartSummary from '@/features/cart/components/CartSummary'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/routePaths'
import { Skeleton } from '@/components/ui/Skeleton'

const CartPage = () => {
  const { cart, isLoading } = useCart()

  if (isLoading) return (
    <PageWrapper>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 w-full" />)}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    </PageWrapper>
  )

  if (!cart || cart.items.length === 0) return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-sm shadow-card gap-4">
        <ShoppingCart className="w-16 h-16 text-slate-200" />
        <h2 className="text-xl font-semibold text-slate-700">Your cart is empty!</h2>
        <p className="text-slate-400 text-sm">Add items to it now.</p>
        <Link to={ROUTES.HOME}
          className="bg-primary text-white font-bold px-8 py-3 rounded hover:bg-primary-dark transition-colors">
          Shop Now
        </Link>
      </div>
    </PageWrapper>
  )

  return (
    <PageWrapper>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-sm shadow-card">
          <div className="p-4 border-b border-slate-100">
            <h1 className="font-bold text-slate-800">My Cart ({cart.items.length})</h1>
          </div>
          {cart.items.map(item => <CartItem key={item.productId} item={item} />)}
        </div>
        <CartSummary cart={cart} />
      </div>
    </PageWrapper>
  )
}
export default CartPage
