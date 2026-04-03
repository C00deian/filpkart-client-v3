import { useContext } from "react";
import { AuthValueContext } from "../store/AuthContext";

export const useAuthValue = () => {
  const ctx = useContext(AuthValueContext);
  if (!ctx) {
    throw new Error("useAuthValue must be used within AuthProvider");
  }
  return ctx;
};
