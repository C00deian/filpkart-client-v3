import { X } from 'lucide-react'
import { useAddressForm } from './hooks/useAddressForm'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import type { AddressDto } from '@/types/address.types'

const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu and Kashmir','Ladakh',
]

interface Props {
  editAddress?: AddressDto | null
  onClose: () => void
}

const AddressForm = ({ editAddress, onClose }: Props) => {
  const { form, onSubmit, isLoading, isEdit } = useAddressForm({ editAddress, onSuccess: onClose })
  const { register, formState: { errors }, watch } = form

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl my-8 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {isEdit ? 'Edit Address' : 'Add New Address'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Fields marked * are required</p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-5">
          {/* Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input {...register('name')}
              label="Full Name *"
              placeholder="Rahul Sharma"
              error={errors.name?.message} />
            <Input {...register('phoneNumber')}
              label="Mobile Number *"
              placeholder="10-digit mobile number"
              maxLength={15}
              error={errors.phoneNumber?.message} />
          </div>

          {/* Pincode + Locality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input {...register('pincode')}
              label="Pincode *"
              placeholder="6-digit pincode"
              maxLength={6}
              error={errors.pincode?.message} />
            <Input {...register('locality')}
              label="Locality / Area / Town *"
              placeholder="e.g. Koramangala, Sector 15"
              error={errors.locality?.message} />
          </div>

          {/* Address Line */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">
              Address (House No, Building, Street) *
            </label>
            <textarea {...register('addressLine')} rows={2}
              placeholder="Flat 301, Prestige Heights, MG Road..."
              className={`w-full border rounded px-3 py-2.5 text-sm text-slate-800 outline-none
                transition resize-none placeholder-slate-400
                focus:border-primary focus:ring-2 focus:ring-primary/20
                ${errors.addressLine ? 'border-red-400' : 'border-slate-300'}`} />
            {errors.addressLine && (
              <p className="text-xs text-red-500 mt-1">{errors.addressLine.message}</p>
            )}
          </div>

          {/* City + State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input {...register('city')}
              label="City / District *"
              placeholder="Bengaluru"
              error={errors.city?.message} />
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">State *</label>
              <select {...register('state')}
                className={`w-full border rounded px-3 py-2.5 text-sm text-slate-800 bg-white
                  outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20
                  ${errors.state ? 'border-red-400' : 'border-slate-300'}`}>
                <option value="">Select State</option>
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>}
            </div>
          </div>

          {/* Optional */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input {...register('landmark')}
              label="Landmark (Optional)"
              placeholder="Near City Mall, Opp Metro Station" />
            <Input {...register('alternatePhone')}
              label="Alternate Phone (Optional)"
              placeholder="Another contact number" />
          </div>

          {/* Address Type */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">Address Type</label>
            <div className="flex gap-3">
              {(['HOME', 'WORK'] as const).map(type => (
                <label key={type}
                  className={`flex items-center gap-2 border rounded-lg px-5 py-2.5 cursor-pointer
                    transition-all select-none
                    ${watch('addressType') === type
                      ? 'border-primary bg-primary/5 text-primary font-semibold'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                  <input type="radio" value={type} {...register('addressType')} className="sr-only" />
                  <span>{type === 'HOME' ? '🏠' : '💼'}</span>
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t border-slate-100">
            <Button type="button" variant="secondary" onClick={onClose} fullWidth>
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading} fullWidth>
              {isEdit ? 'Save Changes' : 'Save Address'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddressForm
