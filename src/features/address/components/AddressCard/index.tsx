import { MapPin, Pencil, Trash2 } from 'lucide-react'
import type { AddressDto } from '@/types/address.types'
import { useAddresses } from '@/features/address/hooks/useAddresses'

interface Props {
  address:    AddressDto
  selected?:  boolean
  selectable?: boolean
  onSelect?:  (address: AddressDto) => void
  onEdit?:    (address: AddressDto) => void
}

const AddressCard = ({ address, selected, selectable, onSelect, onEdit }: Props) => {
  const { deleteAddress, isDeleting } = useAddresses()

  return (
    <div
      onClick={() => selectable && onSelect?.(address)}
      className={`relative border rounded-lg p-4 transition-all
        ${selectable ? 'cursor-pointer' : ''}
        ${selected
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-slate-200 hover:border-slate-300'}`}>

      {/* Radio indicator */}
      {selectable && (
        <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
          ${selected ? 'border-primary' : 'border-slate-300'}`}>
          {selected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
        </div>
      )}

      <div className="flex items-start gap-3">
        <MapPin className={`w-4 h-4 mt-0.5 flex-shrink-0
          ${selected ? 'text-primary' : 'text-slate-400'}`} />

        <div className="flex-1 min-w-0 pr-8">
          {/* Name + Type + Phone */}
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-bold text-slate-900 text-sm">{address.name}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border
              ${address.addressType === 'WORK'
                ? 'bg-blue-50 text-blue-600 border-blue-100'
                : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
              {address.addressType}
            </span>
            <span className="text-slate-500 text-sm">{address.phoneNumber}</span>
          </div>

          {/* Full address */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {address.addressLine}, {address.locality}
            {address.landmark && <>, Near {address.landmark}</>},<br />
            {address.city}, {address.state} —{' '}
            <span className="font-semibold text-slate-700">{address.pincode}</span>
          </p>

          {/* Edit / Delete — only in non-selectable mode */}
          {!selectable && (
            <div className="flex items-center gap-4 mt-3">
              <button onClick={() => onEdit?.(address)}
                className="flex items-center gap-1 text-primary text-xs font-semibold hover:underline">
                <Pencil className="w-3 h-3" /> Edit
              </button>
              <button
                onClick={() => { if (window.confirm('Delete this address?')) deleteAddress(address.id) }}
                disabled={isDeleting}
                className="flex items-center gap-1 text-red-500 text-xs font-semibold hover:underline disabled:opacity-50">
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Deliver Here — shown when selected in checkout */}
      {selectable && selected && (
        <div className="mt-4 pl-7">
          <button
            onClick={e => { e.stopPropagation(); onSelect?.(address) }}
            className="bg-primary hover:bg-primary-dark text-white text-sm font-bold
              px-8 py-2.5 rounded shadow-sm transition-colors">
            DELIVER HERE
          </button>
        </div>
      )}
    </div>
  )
}
export default AddressCard
