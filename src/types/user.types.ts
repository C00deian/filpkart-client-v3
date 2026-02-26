export interface AddressDto {
  id: number
  street: string
  city: string
  zip: string
}

export interface UserProfile {
  id: number
  userId: string
  name?: string | null
  email?: string | null
  phoneNumber?: string | null
  bio?: string | null
  dateOfBirth?: string | null
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | string | null
  avatarUrl?: string | null
  loyaltyPoints?: number | null
  addresses?: AddressDto[]
}

export type UserRole = 'USER' | 'ADMIN' | 'SELLER' | string
export const isAdminRole = (role?: UserRole): boolean =>
  role === 'ROLE_ADMIN' || role === 'ADMIN'
