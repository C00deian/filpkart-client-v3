import { useContext } from "react";
import { AuthActionsContext } from "../store/AuthContext";

export const useAuthActions = () => {
  const ctx = useContext(AuthActionsContext);
  if (!ctx) {
    throw new Error("useAuthActions must be used within AuthProvider");
  }
  return ctx;
};
