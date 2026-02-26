import { useState } from 'react'
import AddressStep from '@/features/checkout/components/AddressStep'
import CartSummary from '@/features/cart/components/CartSummary'
import { useCart } from '@/features/cart/hooks/useCart'
import { userService } from '@/services/userService'
import { useQuery } from '@tanstack/react-query'
import type { AddressDto } from '@/types/user.types'
import { orderService } from '@/services/orderService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import HomeLayout from '@/components/layout/Header/components/HomeLayout/HomeLayout'

const STEPS = ['Login', 'Delivery Address', 'Order Summary', 'Payment']

const CheckoutPage = () => {
  const { cart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedAddress, setSelectedAddress] = useState<AddressDto | null>(null)

  const { data: addresses = [] } = useQuery({
    queryKey: ['addresses'],
    queryFn: userService.getAddresses,
  })

  const handleCheckout = async () => {
    if (!cart) return
    try {
      const res = await orderService.checkout(cart.id)
      navigate(`/order-confirmation?orderId=${res.orderId}`)
    } catch {
      toast.error('Checkout failed. Please try again.')
    }
  }

  if (!cart) return null

  return (
    <HomeLayout>
      {/* Stepper */}
      <div className="hidden md:flex items-center max-w-2xl mx-auto mb-6">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold
                ${i < step ? 'bg-primary text-white' : i === step ? 'bg-primary text-white ring-4 ring-primary/20' : 'bg-slate-200 text-slate-400'}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-sm font-medium ${i === step ? 'text-primary font-bold' : 'text-slate-400'}`}>{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-3 ${i < step ? 'bg-primary' : 'bg-slate-200'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          {step === 1 && (
            <AddressStep
              addresses={addresses}
              onSelect={(addr) => { setSelectedAddress(addr); setStep(2) }}
            />
          )}
          {step === 2 && (
            <div className="bg-white rounded-sm shadow-card p-6">
              <h2 className="font-bold text-slate-800 mb-4">Confirm & Pay</h2>
              {selectedAddress && (
                <div className="bg-slate-50 rounded p-3 mb-4 text-sm text-slate-600">
                  <p className="font-semibold text-slate-800 mb-1">Delivering to:</p>
                  <p>{selectedAddress.street}, {selectedAddress.city} - {selectedAddress.zip}</p>
                </div>
              )}
              <button onClick={handleCheckout}
                className="w-full py-3 bg-[#fb641b] hover:bg-[#e85d10] text-white font-bold rounded transition-colors">
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
        {cart && <div className="lg:w-80"><CartSummary cart={cart} /></div>}
      </div>
    </HomeLayout>
  )
}
export default CheckoutPage
