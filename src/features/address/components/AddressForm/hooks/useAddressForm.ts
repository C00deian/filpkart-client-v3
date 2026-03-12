import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addressSchema, AddressFormValues } from '../schema/addressSchema'
import { useAddresses } from '@/features/address/hooks/useAddresses'
import type { AddressDto } from '@/types/address.types'

interface Options {
  editAddress?: AddressDto | null
  onSuccess?:   () => void
}

export const useAddressForm = ({ editAddress, onSuccess }: Options) => {
  const { addAddress, updateAddress, isAdding, isUpdating } = useAddresses()

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: editAddress
      ? {
          name:           editAddress.name,
          phoneNumber:    editAddress.phoneNumber,
          pincode:        editAddress.pincode,
          locality:       editAddress.locality,
          addressLine:    editAddress.addressLine,
          city:           editAddress.city,
          state:          editAddress.state,
          landmark:       editAddress.landmark       ?? '',
          alternatePhone: editAddress.alternatePhone ?? '',
          addressType:    editAddress.addressType,
        }
      : {
          name: '', phoneNumber: '', pincode: '', locality: '',
          addressLine: '', city: '', state: '',
          landmark: '', alternatePhone: '', addressType: 'HOME',
        },
  })

  const onSubmit: SubmitHandler<AddressFormValues> = (data) => {
    if (editAddress) {
      updateAddress(editAddress.id, data)
    } else {
      addAddress(data)
    }
    onSuccess?.()
  }

  return {
    form,
    onSubmit:  form.handleSubmit(onSubmit),
    isLoading: isAdding || isUpdating,
    isEdit:    !!editAddress,
  }
}
