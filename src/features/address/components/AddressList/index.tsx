import { useState } from 'react'
import { Plus, MapPin, RefreshCw } from 'lucide-react'
import { useAddresses } from '@/features/address/hooks/useAddresses'
import AddressCard from '../AddressCard'
import AddressForm from '../AddressForm'
import type { AddressDto } from '@/types/address.types'
import { Skeleton } from '@/components/ui/Skeleton'

const AddressList = () => {
  const {
    addresses,
    isLoading,
    isError,
    refetch,
    deleteAddress,
    isDeleting,
  } = useAddresses()

  const [showForm, setShowForm] = useState(false)
  const [editAddr, setEditAddr] = useState<AddressDto | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleEdit = (addr: AddressDto) => {
    setEditAddr(addr)
    setShowForm(true)
  }

  const handleDelete = async (addressId: number) => {
    const confirmed = window.confirm('Delete this address?')
    if (!confirmed) return

    try {
      setDeletingId(addressId)
      await deleteAddress(addressId)
      if (editAddr?.id === addressId) {
        setEditAddr(null)
        setShowForm(false)
      }
    } finally {
      setDeletingId(null)
    }
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
        <div className="flex items-center w-full py-2 text-primary text-xs border border-[#e0e0e0] bg-white font-semibold cursor-pointer gap-2">
          <button onClick={() => setShowForm(true)}>
            <div className="p-2 flex items-center gap-2 uppercase">
              <Plus className="w-4 h-4" /> Add New Address
            </div>
          </button>
        </div>
      )}

      {showForm && (
        <div className="animate-slideDown">
          <AddressForm editAddress={editAddr} onClose={handleClose} />
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map(i => <Skeleton key={i} className="h-28 rounded-lg" />)}
        </div>
      ) : isError ? (
        <div className="bg-white border border-slate-200 rounded-sm p-6 text-center">
          <p className="text-sm text-slate-600 mb-3">Unable to load addresses right now.</p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary border border-primary/20 rounded hover:bg-primary/5">
            <RefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      ) : addresses.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-sm p-10 text-center">
          <MapPin className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-700">No saved addresses yet</p>
          <p className="text-xs text-slate-500 mt-1">Add a new address to speed up checkout.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map(addr => (
            <div key={addr.id} className={deletingId === addr.id ? 'opacity-60 pointer-events-none' : ''}>
              <AddressCard
                address={addr}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              {deletingId === addr.id && isDeleting && (
                <p className="text-xs text-slate-500 mt-1 px-1">Removing address...</p>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default AddressList