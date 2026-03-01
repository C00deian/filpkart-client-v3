import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "@/services/profileService";
import type { UpdateProfileRequest } from "@/types/profile.types";
import { toast } from "react-toastify";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const PROFILE_KEY = ["profile"];


export const useProfile = () => {
  const qc = useQueryClient();
  const { user, logout } = useAuth();

  // 🔥 Fetch Profile
  const { data: profile, isLoading } = useQuery({
    queryKey: PROFILE_KEY,
    queryFn: profileService.getProfile,
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });

  // 🔥 Update Profile
  const updateProfile = useMutation({
    mutationFn: (payload: UpdateProfileRequest) =>
      profileService.updateProfile(payload),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PROFILE_KEY });
      toast.success("Profile updated successfully!");
    },

    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  // 🔥 Delete Account
  const deleteAccount = useMutation({
    mutationFn: profileService.deleteAccount,

    onSuccess: () => {
      qc.clear(); // clear all react-query cache
      logout();   // clear auth state + cookies
      toast.success("Account deleted successfully");
      window.location.href = "/";
    },

    onError: () => {
      toast.error("Failed to delete account");
    },
  });

  return {
    profile,
    isLoading,

    updateProfile: (payload: UpdateProfileRequest) =>
      updateProfile.mutate(payload),

    deleteAccount: () => deleteAccount.mutate(),

    isUpdating: updateProfile.isPending,
    isDeleting: deleteAccount.isPending,
  };
};