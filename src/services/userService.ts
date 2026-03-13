import api from './api'
import type { ApiResponse } from '@/types/api.types'
import type { UserProfile } from '@/types/user.types'
import type { UpdateProfileRequest } from '@/types/profile.types'

export const userService = {
  /**
   * GET /users/profile — returns the logged-in user's profile
   * Backend: UserController#getProfile (reads X-Auth-User-Id from Gateway header)
   */
  getProfile: async (): Promise<UserProfile> => {
    const res = await api.get<ApiResponse<UserProfile>>('/users/profile')
    return res.data.data
  },

  /**
   * PUT /users/profile — updates name, email, phoneNumber, gender, bio, dateOfBirth, avatarUrl
   * Backend: UserController#updateUser
   */
  updateProfile: async (data: UpdateProfileRequest): Promise<UserProfile> => {
    const res = await api.put<ApiResponse<UserProfile>>('/users/profile', data)
    return res.data.data
  },

  /**
   * DELETE /users — deletes the currently authenticated user account
   * Backend: UserController#deleteUserById
   */
  deleteAccount: async (): Promise<void> => {
    await api.delete('/users')
  },
}


