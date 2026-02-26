import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  ChevronDown,
  LogOut,
  Package,
  Heart,
  MapPin,
} from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROUTES } from "@/routes/routePaths";

const UserMenu = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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

  /* ✅ MENU CONFIG */
  const userMenuItems = [
    { label: "My Profile", icon: User, to: ROUTES.ACCOUNT },
    { label: "My Orders", icon: Package, to: ROUTES.ORDERS },
    { label: "Wishlist", icon: Heart, to: ROUTES.WISHLIST },
  ];

  const adminMenuItems = [
    { label: "Admin Dashboard", icon: MapPin, to: ROUTES.ADMIN.ROOT },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-white text-sm font-medium"
      >
        <User className="w-4 h-4" />
        <span>{user.name ?? "Account"}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-8 w-56 bg-white rounded shadow-xl border border-slate-100 py-1 z-50">
          <div className="px-4 py-2 border-b border-slate-100">
            <p className="text-xs text-slate-400">Signed in as</p>
            <p className="text-sm font-semibold text-slate-800 truncate">
              {user.email ?? user.name}
            </p>
          </div>

          {/* ✅ MAPPED MENU */}
          {menuItems.map(({ label, icon: Icon, to }) => (
            <Link
              key={label}
              to={to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50
                ${isAdmin ? "text-primary font-medium" : "text-slate-700"}`}
            >
              <Icon className="w-4 h-4 text-slate-400" />
              {label}
            </Link>
          ))}

          {/* ✅ Logout */}
          <div className="border-t border-slate-100 mt-1">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;