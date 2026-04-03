import { useAuthValue } from "@/features/auth/hooks/useAuthValue";
import { normalizeUser } from "@/utils/userProfile";
import { useCurrentUserProfile } from "./useCurrentUserProfile";

export const useCurrentUserDisplayName = () => {
  const { user } = useAuthValue();
  const { data: profile } = useCurrentUserProfile();

  const normalized = normalizeUser(user, profile);

  return {
    displayName: normalized.name,
    profile,
    normalized,
  };
};
