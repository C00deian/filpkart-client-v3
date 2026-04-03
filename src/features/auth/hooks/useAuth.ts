import { useAuthActions } from "./useAuthActions";
import { useAuthValue } from "./useAuthValue";

export const useAuth = () => {
  const value = useAuthValue();
  const actions = useAuthActions();

  return {
    ...value,
    ...actions,
  };
};
