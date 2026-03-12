import api from './api'
import type { ApiResponse } from '@/types/api.types'
import type { AddressDto, UserProfile } from '@/types/user.types'

export const userService = {
  getProfile: async (): Promise<UserProfile> => {
    const res = await api.get<ApiResponse<UserProfile>>('/users/profile')
    return res.data.data
  },
  updateProfile: async (data: {
    name?: string; bio?: string; dateOfBirth?: string
    gender?: 'MALE' | 'FEMALE' | 'OTHER'; avatarUrl?: string
  }): Promise<UserProfile> => {
    const res = await api.put<ApiResponse<UserProfile>>('/users/profile', data)
    return res.data.data
  },
}
