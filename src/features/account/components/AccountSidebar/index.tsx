import { NavLink } from "react-router-dom";
import { User, Package, Settings, ChevronRight } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";

const AccountSidebar = () => {
  const { user, logout } = useAuth();

  return (
    <aside className="bg-white rounded-sm shadow-card h-fit text-sm">
      {/* User info (your original style) */}
      <div className="p-4 flex items-center gap-3 border-b border-slate-100">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
          {user?.name ? (
            <span className="text-primary font-bold text-xl">
              {user.name[0].toUpperCase()}
            </span>
          ) : (
            <User className="w-6 h-6 text-primary" />
          )}
        </div>

        <div className="min-w-0">
          <p className="font-bold text-slate-800 truncate">
            {user?.name ?? "User"}
          </p>
          <p className="text-xs text-slate-400 truncate">{user?.email}</p>
        </div>
      </div>

      {/* Nav (Route-based active detection) */}
      <nav className="p-2 space-y-1">
        <NavLink
          to="/account/orders"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors ${
              isActive
                ? "bg-primary/10 text-primary font-semibold"
                : "text-slate-600 hover:bg-slate-50"
            }`
          }
        >
          <Package className="w-4 h-4" />
          My Orders
          <ChevronRight className="w-3.5 h-3.5 ml-auto" />
        </NavLink>

        <NavLink
          to="/account/profile"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors ${
              isActive
                ? "bg-primary/10 text-primary font-semibold"
                : "text-slate-600 hover:bg-slate-50"
            }`
          }
        >
          <Settings className="w-4 h-4" />
          Profile Settings
          <ChevronRight className="w-3.5 h-3.5 ml-auto" />
        </NavLink>

        <NavLink
          to="/account/addresses"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors ${
              isActive
                ? "bg-primary/10 text-primary font-semibold"
                : "text-slate-600 hover:bg-slate-50"
            }`
          }
        >
          Manage Addresses
          <ChevronRight className="w-3.5 h-3.5 ml-auto" />
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-slate-100">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm text-red-500 hover:bg-red-50 transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AccountSidebar;
