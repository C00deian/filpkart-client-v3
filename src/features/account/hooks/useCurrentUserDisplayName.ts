import { useAuthValue } from "@/features/auth/hooks/useAuthValue";

import { useCurrentUserProfile } from "./useCurrentUserProfile";

export const useCurrentUserDisplayName = () => {
  const { data: profile } = useCurrentUserProfile();

  return {
    profile,
  };
};
