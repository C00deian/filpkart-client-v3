import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { userService } from "@/services/userService";
import { PROFILE_KEY } from "@/features/account/hooks/useProfile";
import { normalizeUser } from "@/utils/userProfile";

export const useCurrentUserDisplayName = () => {
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: PROFILE_KEY,
    queryFn: userService.getProfile,
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });

  const normalized = normalizeUser(user, profile);

  return {
    displayName: normalized.name,
    profile,
    normalized,
  };
};
