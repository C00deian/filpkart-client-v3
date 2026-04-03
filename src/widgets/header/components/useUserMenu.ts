import { useEffect, useRef, useState } from "react";
import { User, Package, Heart, LayoutDashboard } from "lucide-react";
import { ROUTES } from "@/routes/routePaths";

export type UserMenuItem = {
  label: string;
  icon: typeof User;
  to: string;
};

const customerMenuItems: UserMenuItem[] = [
  { label: "My Orders", icon: Package, to: ROUTES.ORDERS },
  { label: "Wishlist", icon: Heart, to: ROUTES.WISHLIST },
];

const adminMenuItems: UserMenuItem[] = [
  { label: "Admin Dashboard", icon: LayoutDashboard, to: ROUTES.ADMIN.ROOT },
  { label: "My Profile", icon: User, to: ROUTES.ACCOUNT },
];

const userMenuItems: UserMenuItem[] = [
  { label: "My Profile", icon: User, to: ROUTES.ACCOUNT },
  ...customerMenuItems,
];

export const useUserMenu = (isAdmin: boolean) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return {
    open,
    ref,
    menuItems: isAdmin ? adminMenuItems : userMenuItems,
    openMenu: () => setOpen(true),
    closeMenu: () => setOpen(false),
  };
};
