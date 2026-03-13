import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { MdAccountBalanceWallet } from "react-icons/md";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { useCurrentUserDisplayName } from "@/features/account/hooks/useCurrentUserDisplayName";
import { FaSignOutAlt } from "react-icons/fa";

const AccountSidebar = () => {
  const { logout, isAdmin } = useAuth();
  const { displayName } = useCurrentUserDisplayName();

  const subLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block pl-10 pr-4 py-3 text-sm border-b border-slate-100 transition-colors ${
      isActive
        ? "text-blue-500 font-medium bg-blue-50/50"
        : "text-slate-700 hover:text-blue-500 hover:bg-blue-50"
    }`;

  return (
    <aside className="bg-white rounded-sm shadow-card h-fit text-sm">
      {/* User info (your original style) */}
      <div className="p-4 flex items-center gap-3 border-b border-slate-100">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
          {displayName ? (
            <span className="text-primary font-bold text-xl">
              {displayName[0].toUpperCase()}
            </span>
          ) : (
            <FaUser className="w-6 h-6 text-primary" />
          )}
        </div>
        <div>
          <p className="text-xs text-slate-700">Hello,</p>
          <p className="font-bold text-slate-800 text-base leading-tight">
            {displayName || "User"}
          </p>
        </div>
      </div>

      {/* MY ORDERS */}
      {!isAdmin && (
        <NavLink
          to="/account/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-4 border-b border-slate-200 transition-colors ${
              isActive ? "text-blue-500" : "text-slate-500 hover:text-blue-500"
            }`
          }
        >
          <RiShoppingBag3Fill className="w-5 h-5 text-blue-500" />
          <span className="font-bold uppercase tracking-wide  text-slate-500 text-md flex-1">
            My Orders
          </span>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </NavLink>
      )}

      {/* ACCOUNT SETTINGS */}
      <div className="border-b border-slate-200">
        <div className="flex items-center gap-3 px-4 py-4">
          <FaUser className="w-5 h-5 text-blue-500" />
          <span className="font-bold uppercase tracking-wide text-md text-slate-500 ">
            Account Settings
          </span>
        </div>
        <NavLink to="/account/profile" className={subLinkClass} >
          Profile Information
        </NavLink>
        <NavLink to="/account/addresses" className={subLinkClass}>
          Manage Addresses
        </NavLink>
        <NavLink to="/account/pan" className={subLinkClass}>
          PAN Card Information
        </NavLink>
      </div>

      {/* PAYMENTS */}
      <div className="border-b border-slate-200">
        <div className="flex items-center gap-3 px-4 py-4">
          <MdAccountBalanceWallet className="w-5 h-5 text-blue-500" />
          <span className="font-bold uppercase tracking-wide text-md text-slate-500 ">
            Payments
          </span>
        </div>
        <NavLink to="/account/gift-cards" className={subLinkClass}>
          <span className="flex items-center justify-between pr-0">
            Gift Cards
            <span className="text-green-600 font-medium">₹0</span>
          </span>
        </NavLink>
        <NavLink to="/account/upi" className={subLinkClass}>
          Saved UPI
        </NavLink>
        <NavLink to="/account/cards" className={subLinkClass}>
          Saved Cards
        </NavLink>
      </div>

      {/* Logout */}
      <div className="flex items-center gap-2 px-4 py-3">
        <FaSignOutAlt className="w-5 h-5 text-blue-500" />
        <button
            onClick={logout}
            className="w-full text-left px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-600 hover:text-blue-500 transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AccountSidebar;