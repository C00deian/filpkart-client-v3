import HomeLayout from '@/app/layouts/HomeLayout'
import { ROUTES } from '@/routes/routePaths'
import { AlertCircle, ArrowLeft, CreditCard, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

const CheckoutCancelPage = () => {
  const orderId = sessionStorage.getItem('pendingCheckoutOrderId')

  return (
    <HomeLayout>
      <div className="max-w-3xl mx-auto">
        <section className="bg-white border border-slate-200 rounded-sm shadow-card overflow-hidden">
          <div className="bg-amber-500 px-5 py-8 sm:px-8 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-8 w-8 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white/80">Payment not completed</p>
                <h1 className="text-2xl font-bold mt-1">Your checkout was cancelled</h1>
                <p className="text-sm text-white/90 mt-1">
                  No payment was captured. You can review your cart and try again when ready.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            {orderId && (
              <div className="bg-slate-50 border border-slate-100 rounded-sm p-4">
                <p className="text-xs font-semibold text-slate-500 uppercase">Last checkout reference</p>
                <p className="font-bold text-slate-900 mt-1">#{orderId.slice(-10).toUpperCase()}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to={ROUTES.CART}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white font-semibold rounded hover:bg-primary-dark">
                <ShoppingCart className="h-4 w-4" /> Return to Cart
              </Link>
              <Link
                to={ROUTES.CHECKOUT}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-50">
                <CreditCard className="h-4 w-4" /> Try Payment Again
              </Link>
            </div>

            <Link
              to={ROUTES.HOME}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary">
              <ArrowLeft className="h-4 w-4" /> Continue shopping
            </Link>
          </div>
        </section>
      </div>
    </HomeLayout>
  )
}

export default CheckoutCancelPage
