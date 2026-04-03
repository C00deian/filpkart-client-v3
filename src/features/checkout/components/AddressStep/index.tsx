
import { MapPin, Plus } from 'lucide-react'
import { useState } from 'react'
import type { AddressDto } from '@/features/address/types/address.types'
import Button from '@/components/ui/Button'

interface Props {
  addresses: AddressDto[]
  onSelect: (address: AddressDto) => void
}

const AddressStep = ({ addresses, onSelect }: Props) => {
  const [selected, setSelected] = useState<number | null>(addresses[0]?.id ?? null)

  const handleContinue = () => {
    const addr = addresses.find(a => a.id === selected)
    if (addr) onSelect(addr)
  }

  return (
    <div>
      <div className="bg-primary px-4 py-3 rounded-t-sm flex items-center gap-3">
        <span className="bg-white text-primary text-xs font-bold px-2 py-0.5 rounded">STEP 2</span>
        <h2 className="text-white font-bold">Select Delivery Address</h2>
      </div>
      <div className="bg-white p-5 rounded-b-sm border-x border-b border-slate-100 space-y-3">
        {addresses.map(addr => (
          <label key={addr.id}
            className={`flex items-start gap-4 p-4 border rounded cursor-pointer transition-all
              ${selected === addr.id
                ? 'border-primary bg-primary/5'
                : 'border-slate-200 hover:border-primary/40'}`}>
            <input type="radio" name="address" value={addr.id}
              checked={selected === addr.id}
              onChange={() => setSelected(addr.id)}
              className="mt-1 accent-primary" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-bold bg-slate-100 px-2 py-0.5 rounded uppercase text-slate-500">
                  {addr.city}
                </span>
              </div>
              <p className="text-sm text-slate-700">
                {addr.addressLine ?? addr.street}, {addr.city} - {addr.pincode ?? addr.zip}
              </p>

              {selected === addr.id && (
                <Button onClick={handleContinue} size="sm" className="mt-3">
                  DELIVER HERE
                </Button>
              )}
            </div>
          </label>
        ))}

        <button className="flex items-center gap-2 w-full border border-dashed border-slate-300 rounded p-3
          text-primary text-sm font-semibold hover:bg-slate-50 hover:border-primary transition-colors">
          <Plus className="w-4 h-4" /> Add New Address
        </button>
      </div>
    </div>
  )
}
export default AddressStep
