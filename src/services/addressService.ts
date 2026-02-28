import api from './api'
import type { ApiResponse } from '@/types/api.types'
import type { AddressDto, AddressRequest, AddressType } from '@/types/address.types'

type AddressId = number | string

const normalizeAddressType = (value?: string | null): AddressType =>
  value === 'WORK' ? 'WORK' : 'HOME'

const normalizeAddress = (address: AddressDto): AddressDto => ({
  ...address,
  pincode:     address.pincode     ?? address.zip    ?? '',
  addressLine: address.addressLine ?? address.street ?? '',
  addressType: normalizeAddressType(address.addressType),
})

export const addressService = {
  /** GET /users/me/addresses */
  getAddresses: async (): Promise<AddressDto[]> => {
    const res = await api.get<ApiResponse<AddressDto[]>>('/users/me/addresses')
    return (res.data.data ?? []).map(normalizeAddress)
  },

  /** POST /users/me/addresses */
  addAddress: async (payload: AddressRequest): Promise<AddressDto> => {
    const res = await api.post<ApiResponse<AddressDto>>('/users/me/addresses', payload)
    return normalizeAddress(res.data.data)
  },

  /** PUT /users/me/addresses/{addressId} */
  updateAddress: async (addressId: AddressId, payload: AddressRequest): Promise<AddressDto> => {
    const res = await api.put<ApiResponse<AddressDto>>(`/users/me/addresses/${addressId}`, payload)
    return normalizeAddress(res.data.data)
  },

  /** DELETE /users/me/addresses/{addressId} */
  deleteAddress: async (addressId: AddressId): Promise<void> => {
    await api.delete<ApiResponse<null>>(`/users/me/addresses/${addressId}`)
  },
}
