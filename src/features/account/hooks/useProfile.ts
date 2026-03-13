import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import type { UpdateProfileRequest } from "@/types/profile.types";
import { toast } from "react-toastify";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const PROFILE_KEY = ["profile"];

export const useProfile = () => {
  const qc = useQueryClient();
  const { user, logout } = useAuth();

  // Fetch Profile via GET /users/profile
  const { data: profile, isLoading } = useQuery({
    queryKey: PROFILE_KEY,
    queryFn: userService.getProfile,
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });

  // Update Profile via PUT /users/profile
  const updateProfile = useMutation({
    mutationFn: (payload: UpdateProfileRequest) =>
      userService.updateProfile(payload),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PROFILE_KEY });
      toast.success("Profile updated successfully!");
    },

    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  // Delete Account via DELETE /users
  const deleteAccount = useMutation({
    mutationFn: userService.deleteAccount,

    onSuccess: () => {
      qc.clear();
      logout();
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

