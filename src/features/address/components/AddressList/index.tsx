import { useState } from 'react'
import { Plus, MapPin } from 'lucide-react'
import { useAddresses } from '@/features/address/hooks/useAddresses'
import AddressCard from '../AddressCard'
import AddressForm from '../AddressForm'
import type { AddressDto } from '@/types/address.types'
import { Skeleton } from '@/components/ui/Skeleton'

const AddressList = () => {
  const { addresses, isLoading } = useAddresses()
  const [showForm, setShowForm]     = useState(false)
  const [editAddr, setEditAddr]     = useState<AddressDto | null>(null)

  const handleEdit  = (addr: AddressDto) => { setEditAddr(addr); setShowForm(true) }
  const handleClose = ()                  => { setEditAddr(null); setShowForm(false) }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-slate-800 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" /> Saved Addresses
        </h2>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline">
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map(i => <Skeleton key={i} className="h-28 rounded-lg" />)}
        </div>
      ) : addresses.length === 0 ? (
        <div className="border-2 border-dashed border-slate-200 rounded-lg p-10 text-center">
          <MapPin className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-semibold mb-1">No saved addresses</p>
          <p className="text-slate-400 text-sm mb-4">Add an address for faster checkout</p>
          <button onClick={() => setShowForm(true)}
            className="bg-primary text-white text-sm font-bold px-6 py-2 rounded hover:bg-primary-dark transition-colors">
            Add Address
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map(addr => (
            <AddressCard key={addr.id} address={addr} onEdit={handleEdit} />
          ))}
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 w-full border border-dashed border-slate-300 rounded-lg p-3
              text-primary text-sm font-semibold hover:bg-slate-50 hover:border-primary transition-colors">
            <Plus className="w-4 h-4" /> Add New Address
          </button>
        </div>
      )}

      {showForm && <AddressForm editAddress={editAddr} onClose={handleClose} />}
    </div>
  )
}
export default AddressList
