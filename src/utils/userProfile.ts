export type UiUser = {
  id?: string;
  name: string;
  email?: string;
  role?: string;
};

const fallbackNameFromEmail = (email?: string | null): string => {
  if (!email) return "Account";
  const username = email.split("@")[0]?.trim();
  return username || "Account";
};

export const normalizeUser = (authMe: any, profile: any): UiUser => {
  const merged = { ...(profile || {}), ...(authMe || {}) };

  return {
    id: merged.userId || merged.id,
    name:
      merged.name ||
      merged.fullName ||
      merged.username ||
      merged.firstName ||
      fallbackNameFromEmail(merged.email),
    email: merged.email,
    role: merged.role,
  };
};

