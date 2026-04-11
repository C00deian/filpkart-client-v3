import { useQuery } from "@tanstack/react-query";
import { userService } from "@/features/account/services/userService";
import { QUERY_TIMES } from "@/config/constants";
import { useAuthValue } from "@/features/auth/hooks/useAuthValue";

export const PROFILE_KEY = "profile";

export const useCurrentUserProfile = () => {
  const { user } = useAuthValue();
  return useQuery({
    queryKey: [PROFILE_KEY, user?.id],
    queryFn: userService.getProfile,
    enabled: !!user,
    staleTime: QUERY_TIMES.DEFAULT,
  });
};
