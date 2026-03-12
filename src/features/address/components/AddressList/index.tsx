import { useState } from 'react'
import { Plus, MapPin } from 'lucide-react'
import { useAddresses } from '@/features/address/hooks/useAddresses'
import AddressCard from '../AddressCard'
import AddressForm from '../AddressForm'
import type { AddressDto } from '@/types/address.types'
import { Skeleton } from '@/components/ui/Skeleton'

const AddressList = () => {
  const { addresses, isLoading } = useAddresses()

  const [showForm, setShowForm] = useState(false)
  const [editAddr, setEditAddr] = useState<AddressDto | null>(null)

  const handleEdit = (addr: AddressDto) => {
    setEditAddr(addr)
    setShowForm(true)
  }

  const handleClose = () => {
    setEditAddr(null)
    setShowForm(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-2">
        <h2 className="font-bold text-slate-800 flex items-center">
          <MapPin className="w-4 h-4 text-primary mr-2" /> Manage Addresses
        </h2>
      </div>

      {!showForm && (
        <div className='flex items-center w-full py-2 text-primary text-xs border border-[#e0e0e0] bg-white font-semibold cursor-pointer gap-2'>
          <button
            onClick={() => setShowForm(true)}
          >
            <div className=' p-2 flex items-center gap-2 uppercase'>
              <Plus className="w-4 h-4" /> Add New Address
            </div>
          </button>
        </div>
      )}

      {/* FORM */}
      {showForm && (
        <div className="animate-slideDown">
          <AddressForm editAddress={editAddr} onClose={handleClose} />
        </div>
      )}

      {/* LIST */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map(i => (
            <Skeleton key={i} className="h-28 rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map(addr => (
            <AddressCard
              key={addr.id}
              address={addr}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

    </div>
  )
}

export default AddressList