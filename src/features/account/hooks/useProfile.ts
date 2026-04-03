import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/features/account/services/userService";
import type { UpdateProfileRequest } from "@/features/account/types/profile.types";
import { toast } from "react-toastify";
import { useAuthActions } from "@/features/auth/hooks/useAuthActions";
import { PROFILE_KEY, useCurrentUserProfile } from "./useCurrentUserProfile";

export const useProfile = () => {
  const qc = useQueryClient();
  const { logout } = useAuthActions();

  const { data: profile, isLoading } = useCurrentUserProfile();

  // Update Profile via PUT /users/profile
  const updateProfile = useMutation({
    mutationFn: userService.updateProfile,

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
      void logout();
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
