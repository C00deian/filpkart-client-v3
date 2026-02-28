import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { addressService } from '@/services/addressService'
import type { AddressRequest } from '@/types/address.types'
import { toast } from 'react-toastify'
import { useAuth } from '@/features/auth/hooks/useAuth'

export const ADDRESS_KEY = ['addresses']

export const useAddresses = () => {
  const qc = useQueryClient()
  const { user } = useAuth()

  const { data: addresses = [], isLoading } = useQuery({
    queryKey: ADDRESS_KEY,
    queryFn: addressService.getAddresses,
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  })

  const addAddress = useMutation({
    mutationFn: (payload: AddressRequest) => addressService.addAddress(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ADDRESS_KEY })
      toast.success('Address added!')
    },
    onError: () => toast.error('Failed to add address'),
  })

  const updateAddress = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: AddressRequest }) =>
      addressService.updateAddress(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ADDRESS_KEY })
      toast.success('Address updated!')
    },
    onError: () => toast.error('Failed to update address'),
  })

  const deleteAddress = useMutation({
    mutationFn: (id: number) => addressService.deleteAddress(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ADDRESS_KEY })
      toast.success('Address removed')
    },
    onError: () => toast.error('Failed to delete address'),
  })

  return {
    addresses,
    isLoading,
    addAddress:    (payload: AddressRequest)              => addAddress.mutate(payload),
    updateAddress: (id: number, payload: AddressRequest) => updateAddress.mutate({ id, payload }),
    deleteAddress: (id: number)                          => deleteAddress.mutate(id),
    isAdding:   addAddress.isPending,
    isUpdating: updateAddress.isPending,
    isDeleting: deleteAddress.isPending,
  }
}
