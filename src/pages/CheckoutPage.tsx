import { useState } from 'react'
import HomeLayout from '@/components/layout/Header/components/HomeLayout/HomeLayout'
import CartSummary from '@/features/cart/components/CartSummary'
import AddressCard from '@/features/address/components/AddressCard'
import AddressForm from '@/features/address/components/AddressForm'
import { useCart } from '@/features/cart/hooks/useCart'
import { useAddresses } from '@/features/address/hooks/useAddresses'
import { orderService } from '@/services/orderService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Plus, CheckCircle, MapPin, ShoppingBag } from 'lucide-react'
import type { AddressDto } from '@/types/address.types'
import { Skeleton } from '@/components/ui/Skeleton'

const STEPS = ['Login', 'Delivery Address', 'Order Summary', 'Payment']

const CheckoutPage = () => {
  const { cart } = useCart()
  const { addresses, isLoading: addrLoading } = useAddresses()
  const navigate = useNavigate()

  const [step, setStep]                         = useState(1)
  const [selectedAddr, setSelectedAddr]         = useState<AddressDto | null>(null)
  const [showAddressForm, setShowAddressForm]   = useState(false)
  const [isPlacing, setIsPlacing]               = useState(false)

  const handleSelectAddress = (addr: AddressDto) => {
    setSelectedAddr(addr)
    setStep(2)
  }

  const handlePlaceOrder = async () => {
    if (!cart) return
    setIsPlacing(true)
    try {
      const res = await orderService.checkout(cart.id)
      // If Stripe URL returned — redirect there
      if (res.checkoutUrl) {
        window.location.href = res.checkoutUrl
      } else {
        navigate(`/order-confirmation?orderId=${res.orderId}`)
      }
    } catch {
      toast.error('Failed to place order. Please try again.')
    } finally {
      setIsPlacing(false)
    }
  }

  if (!cart || cart.items.length === 0) {
    navigate('/')
    return null
  }

  return (
    <HomeLayout>
      {/* Stepper */}
      <div className="hidden md:flex items-center max-w-3xl mx-auto mb-6">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${i < step
                  ? 'bg-primary text-white'
                  : i === step
                  ? 'bg-primary text-white ring-4 ring-primary/20'
                  : 'bg-slate-200 text-slate-400'}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:block
                ${i === step ? 'text-primary font-bold' : i < step ? 'text-slate-600' : 'text-slate-400'}`}>
                {s}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-3 transition-colors ${i < step ? 'bg-primary' : 'bg-slate-200'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left Column */}
        <div className="flex-1 space-y-3">

          {/* ── STEP 1: Completed — show selected address summary ── */}
          {step > 1 && selectedAddr && (
            <div className="bg-white rounded-sm shadow-card p-4 flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 text-slate-500 px-2 py-0.5 text-xs font-bold uppercase rounded">
                  STEP 1
                </div>
                <CheckCircle className="w-4 h-4 text-primary" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span className="font-semibold text-slate-800 text-sm">{selectedAddr.name}</span>
                  <span className="text-slate-400 text-xs">
                    {selectedAddr.addressLine}, {selectedAddr.city}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-primary text-xs font-bold hover:underline flex-shrink-0">
                Change
              </button>
            </div>
          )}

          {/* ── STEP 1: Address Selection ── */}
          {step === 1 && (
            <div>
              <div className="bg-primary px-4 py-3 rounded-t-sm flex items-center gap-3">
                <span className="bg-white text-primary text-xs font-bold px-2 py-0.5 rounded">STEP 1</span>
                <h2 className="text-white font-bold flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Select Delivery Address
                </h2>
              </div>

              <div className="bg-white p-5 rounded-b-sm border-x border-b border-slate-100 space-y-3">
                {addrLoading ? (
                  <div className="space-y-3">
                    {[1, 2].map(i => <Skeleton key={i} className="h-24 rounded-lg" />)}
                  </div>
                ) : addresses.length === 0 ? (
                  <div className="text-center py-6">
                    <MapPin className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-500 font-medium mb-1">No saved addresses</p>
                    <p className="text-slate-400 text-sm mb-4">Add a new address to continue</p>
                  </div>
                ) : (
                  addresses.map(addr => (
                    <AddressCard
                      key={addr.id}
                      address={addr}
                      selectable
                      selected={selectedAddr?.id === addr.id}
                      onSelect={handleSelectAddress}
                    />
                  ))
                )}

                {/* Add New Address trigger */}
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="flex items-center gap-2 w-full border border-dashed border-slate-300 rounded-lg p-3
                    text-primary text-sm font-semibold hover:bg-slate-50 hover:border-primary transition-colors">
                  <Plus className="w-4 h-4" /> Add New Address
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Order Summary + Place Order ── */}
          {step === 2 && (
            <div>
              <div className="bg-primary px-4 py-3 rounded-t-sm flex items-center gap-3">
                <span className="bg-white text-primary text-xs font-bold px-2 py-0.5 rounded">STEP 2</span>
                <h2 className="text-white font-bold flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> Order Summary & Payment
                </h2>
              </div>

              <div className="bg-white p-5 rounded-b-sm border-x border-b border-slate-100 space-y-4">
                {/* Cart items preview */}
                <div className="space-y-3">
                  {cart.items.map(item => (
                    <div key={item.productId} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                      <div className="w-14 h-14 flex-shrink-0 bg-slate-50 rounded border border-slate-100 flex items-center justify-center">
                        {item.productImage
                          ? <img src={item.productImage} alt={item.productName} className="w-full h-full object-contain p-1" />
                          : <span className="text-xl">📦</span>
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{item.productName}</p>
                        <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-slate-800 flex-shrink-0">
                        ₹{item.totalPrice.toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Delivery address confirmation */}
                {selectedAddr && (
                  <div className="bg-slate-50 rounded-lg p-3 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase mb-0.5">Delivering to</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedAddr.name}</p>
                      <p className="text-xs text-slate-500">
                        {selectedAddr.addressLine}, {selectedAddr.locality}, {selectedAddr.city} — {selectedAddr.pincode}
                      </p>
                    </div>
                  </div>
                )}

                {/* Place Order */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={isPlacing}
                  className="w-full py-3 bg-[#fb641b] hover:bg-[#e85d10] disabled:opacity-60
                    text-white font-bold rounded shadow-sm transition-colors flex items-center justify-center gap-2">
                  {isPlacing ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Placing Order...
                    </>
                  ) : (
                    'PLACE ORDER'
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 3 & 4 placeholders — greyed out */}
          {[
            { step: 3, label: 'Order Summary' },
            { step: 4, label: 'Payment Options' },
          ].map(s => (
            <div key={s.step}
              className="bg-white rounded-sm shadow-card p-4 border border-slate-100 opacity-50">
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 text-slate-400 px-2 py-0.5 text-xs font-bold uppercase rounded">
                  STEP {s.step}
                </div>
                <span className="font-bold text-slate-400 text-sm uppercase">{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar — Cart Summary */}
        <div className="lg:w-96 flex-shrink-0">
          <CartSummary cart={cart}/>
        </div>
      </div>

      {showAddressForm && (
        <AddressForm onClose={() => setShowAddressForm(false)} />
      )}
    </HomeLayout>
  )
}
export default CheckoutPage
