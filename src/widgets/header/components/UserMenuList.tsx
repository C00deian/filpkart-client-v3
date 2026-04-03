import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import type { UserMenuItem } from "./useUserMenu";

type UserMenuListProps = {
  isAdmin: boolean;
  items: UserMenuItem[];
  onClose: () => void;
  onLogout: () => void;
};

const UserMenuList = ({
  isAdmin,
  items,
  onClose,
  onLogout,
}: UserMenuListProps) => (
  <>
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
        {items.map(({ label, icon: Icon, to }) => (
          <Link
            key={label}
            to={to}
            onClick={onClose}
            className="flex items-center gap-3 mx-2 px-3 py-2.5 text-[14px] text-slate-700 hover:bg-[#f0f5ff] hover:text-primary rounded-lg transition-colors group"
          >
            <Icon className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
            <span className="font-normal">{label}</span>
          </Link>
        ))}
      </div>

      <div className="border-t border-slate-50 mt-1 pt-1">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 mx-2 px-3 py-2.5 text-[14px] text-red-500 hover:bg-red-50 rounded-lg w-[calc(100%-16px)] transition-colors group"
        >
          <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-500 transition-colors" />
          <span className="font-normal">Logout</span>
        </button>
      </div>
    </div>
  </>
);

export default UserMenuList;
