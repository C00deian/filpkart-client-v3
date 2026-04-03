import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_TIMES } from '@/config/constants'
import { addressService } from '@/features/address/services/addressService'
import type { AddressRequest } from '@/features/address/types/address.types'
import { toast } from 'react-toastify'
import { useAuthValue } from '@/features/auth/hooks/useAuthValue'

export const ADDRESS_KEY = ['addresses']

export const useAddresses = () => {
  const qc = useQueryClient()
  const { user } = useAuthValue()

  const {
    data: addresses = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ADDRESS_KEY,
    queryFn: addressService.getAddresses,
    enabled: !!user,
    staleTime: QUERY_TIMES.DEFAULT,
  })

  const addAddress = useMutation({
    mutationFn: addressService.addAddress,
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
    mutationFn: addressService.deleteAddress,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ADDRESS_KEY })
      toast.success('Address removed')
    },
    onError: () => toast.error('Failed to delete address'),
  })

  return {
    addresses,
    isLoading,
    isError,
    error,
    refetch,
    addAddress: (payload: AddressRequest) => addAddress.mutateAsync(payload),
    updateAddress: (id: number, payload: AddressRequest) => updateAddress.mutateAsync({ id, payload }),
    deleteAddress: (id: number) => deleteAddress.mutateAsync(id),
    isAdding: addAddress.isPending,
    isUpdating: updateAddress.isPending,
    isDeleting: deleteAddress.isPending,
  }
}
