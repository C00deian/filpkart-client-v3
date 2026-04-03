import apiClient from "@/services/apiClient";
import { API_ENDPOINTS } from "@/config/constants";
import type { ApiResponse } from "@/types/api.types";
import type { UserProfile } from "@/features/account/types/user.types";
import type { UpdateProfileRequest } from "@/features/account/types/profile.types";

export const userService = {
  /**
   * GET /users/profile — returns the logged-in user's profile
   * Backend: UserController#getProfile (reads X-Auth-User-Id from Gateway header)
   */
  getProfile: async (): Promise<UserProfile> => {
    const res = await apiClient.get<ApiResponse<UserProfile>>(
      API_ENDPOINTS.USERS.PROFILE,
    );
    return res.data.data;
  },

  /**
   * PUT /users/profile — updates name, email, phoneNumber, gender, bio, dateOfBirth, avatarUrl
   * Backend: UserController#updateUser
   */
  updateProfile: async (data: UpdateProfileRequest): Promise<UserProfile> => {
    const res = await apiClient.put<ApiResponse<UserProfile>>(
      API_ENDPOINTS.USERS.PROFILE,
      data,
    );
    return res.data.data;
  },

  /**
   * DELETE /users — deletes the currently authenticated user account
   * Backend: UserController#deleteUserById
   */
  deleteAccount: async (): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.USERS.ROOT);
  },
};
