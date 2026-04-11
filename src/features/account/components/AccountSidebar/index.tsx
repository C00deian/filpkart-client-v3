import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useAuthActions } from "@/features/auth/hooks/useAuthActions";
import { useAuthValue } from "@/features/auth/hooks/useAuthValue";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { SIDEBAR_SECTIONS } from "@/features/account/config/sidebarConfig";
import Profile from "../ProfileSection";
import Logout from "../Logout";
import {useCurrentUserDisplayName} from "../../hooks/useCurrentUserDisplayName";

const AccountSidebar = () => {
  const { logout } = useAuthActions();
  const { isAdmin } = useAuthValue();
  const { profile } = useCurrentUserDisplayName();

    const subLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block pl-10 pr-4 py-3 text-sm border-b border-slate-100 transition-colors ${isActive
      ? "text-blue-500 font-medium bg-blue-50/50"
      : "text-slate-700 hover:text-blue-500 hover:bg-blue-50"
    }`;

  return (
    <aside className="bg-white rounded-sm shadow-card h-fit text-sm">
      {/* USER INFO */}
        <Profile displayName={profile?.name ? profile.name : "User"} />

      {/* MY ORDERS (Kept separate due to unique layout and conditional rendering) */}
      {!isAdmin && (
        <NavLink
          to="/account/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-4 border-b border-slate-200 transition-colors ${isActive ? "text-blue-500" : "text-slate-500 hover:text-blue-500"
            }`
          }
        >
          <RiShoppingBag3Fill className="w-5 h-5 text-blue-500" />
          <span className="font-bold uppercase tracking-wide text-slate-500 text-md flex-1">
            My Orders
          </span>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </NavLink>
      )}

      {/* DYNAMIC SECTIONS: Account Settings & Payments */}
      {SIDEBAR_SECTIONS.map((section) => {
        const Icon = section.icon;

        return (
          <div key={section.title} className="border-b border-slate-200">
            <div className="flex items-center gap-3 px-4 py-4">
              <Icon className="w-5 h-5 text-blue-500" />
              <span className="font-bold uppercase tracking-wide text-md text-slate-500">
                {section.title}
              </span>
            </div>

            {/* Mapping over the sub-links for each section */}
            {section.links.map((link) => (
              <NavLink key={link.to} to={link.to} className={subLinkClass}>
                {link.rightElement ? (
                  <span className="flex items-center justify-between pr-0">
                    {link.label}
                    {link.rightElement}
                  </span>
                ) : (
                  link.label
                )}
              </NavLink>
            ))}
          </div>
        );
      })}

      {/* LOGOUT */}
      <Logout onLogout={logout} />
    </aside>
  );
};

export default AccountSidebar;