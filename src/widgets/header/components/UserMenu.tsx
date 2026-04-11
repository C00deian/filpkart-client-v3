import { Link, useNavigate } from "react-router-dom";
import { useAuthActions } from "@/features/auth/hooks/useAuthActions";
import { useAuthValue } from "@/features/auth/hooks/useAuthValue";
import { ROUTES } from "@/routes/routePaths";
import { useCurrentUserDisplayName } from "@/features/account/hooks/useCurrentUserDisplayName";
import UserMenuList from "./UserMenuList";
import UserMenuTrigger from "./UserMenuTrigger";
import { useUserMenu } from "./useUserMenu";

const UserMenu = () => {
  const { user, isAdmin } = useAuthValue();
  const { logout } = useAuthActions();
  const { profile } = useCurrentUserDisplayName();
  const navigate = useNavigate();
  const { open, ref, menuItems, openMenu, closeMenu } = useUserMenu(isAdmin);

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  if (!user) {
    return (
      <Link
        to={ROUTES.LOGIN}
        className="bg-white text-primary text-sm font-semibold px-8 py-1 rounded hover:bg-slate-100 transition"
      >
        Login
      </Link>
    );
  }

  return (
    <div
      ref={ref}
      className="relative h-full flex items-center"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <UserMenuTrigger displayName={profile && profile.name  ? profile.name : isAdmin ? "Admin" : "User"} open={open} />

      {open && (
        <UserMenuList
          isAdmin={isAdmin}
          items={menuItems}
          onClose={closeMenu}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default UserMenu;
