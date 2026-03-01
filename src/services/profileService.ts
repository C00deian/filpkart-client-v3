import api from "./api";
import type { UpdateProfileRequest, ProfileDto } from "../types/profile.types"

export const profileService = {
  getProfile: async (): Promise<ProfileDto> => {
    const { data } = await api.get("/auth/me");
    return data;
  },

  updateProfile: async (
    payload: UpdateProfileRequest
  ): Promise<ProfileDto> => {
    const { data } = await api.put("/users/profile", payload);
    return data;
  },

  deleteAccount: async (): Promise<void> => {
    await api.delete("/users");
  },
};