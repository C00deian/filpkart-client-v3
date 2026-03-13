import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  ChevronDown,
  LogOut,
  Package,
  Heart,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROUTES } from "@/routes/routePaths";
import { useCurrentUserDisplayName } from "@/features/account/hooks/useCurrentUserDisplayName";

const UserMenu = () => {
  const { user, logout, isAdmin } = useAuth();
  const { displayName } = useCurrentUserDisplayName();
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

  /* User always sees these items */
  const baseMenuItems = [
    { label: "My Profile", icon: User, to: ROUTES.ACCOUNT },
    { label: "My Orders", icon: Package, to: ROUTES.ORDERS },
    { label: "Wishlist", icon: Heart, to: ROUTES.WISHLIST },
  ];

  /* Admin gets an extra Dashboard entry prepended */
  const menuItems = isAdmin
    ? [
        { label: "Admin Dashboard", icon: LayoutDashboard, to: ROUTES.ADMIN.ROOT },
        ...baseMenuItems,
      ]
    : baseMenuItems;

  return (
    <div
      ref={ref}
      className="relative h-full flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-2 text-slate-800 text-[15px] font-medium hover:text-primary transition-all group py-4">
        <div className="p-0.5 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
          <User className="w-5 h-5" />
        </div>
        <span>{displayName}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180 text-primary" : "text-slate-400"}`}
        />
      </button>

      {open && (
        <>
          {/* Transparent bridge */}
          <div className="absolute top-10 left-0 w-full h-4 z-[109]" />

          <div className="absolute right-0 top-[52px] w-64 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-[110] animate-in fade-in zoom-in-95 duration-200 origin-top-right">
            <div className="px-5 py-3 border-b border-slate-50">
              <p className="text-[15px] font-bold text-slate-900 leading-tight">
                Your Account
              </p>
              {isAdmin && (
                <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-primary/10 text-primary">
                  Admin
                </span>
              )}
            </div>

            <div className="py-1">
              {menuItems.map(({ label, icon: Icon, to }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 mx-2 px-3 py-2.5 text-[14px] text-slate-700 hover:bg-[#f0f5ff] hover:text-primary rounded-lg transition-colors group"
                >
                  <Icon className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
                  <span className="font-normal">{label}</span>
                </Link>
              ))}
            </div>

            {/* Logout */}
            <div className="border-t border-slate-50 mt-1 pt-1">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 mx-2 px-3 py-2.5 text-[14px] text-red-500 hover:bg-red-50 rounded-lg w-[calc(100%-16px)] transition-colors group"
              >
                <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-500 transition-colors" />
                <span className="font-normal">Logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;
