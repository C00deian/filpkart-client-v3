export type AddressType = 'HOME' | 'WORK'

export interface AddressDto {
  id: number
  name: string
  phoneNumber: string
  pincode: string
  locality: string
  addressLine: string
  city: string
  state: string
  landmark?: string | null
  alternatePhone?: string | null
  addressType: AddressType
  // Backward-compatible API fields returned by backend
  street?: string
  zip?: string
}

export interface AddressRequest {
  name: string
  phoneNumber: string
  pincode: string
  locality: string
  addressLine: string
  city: string
  state: string
  landmark?: string
  alternatePhone?: string
  addressType?: AddressType
}
