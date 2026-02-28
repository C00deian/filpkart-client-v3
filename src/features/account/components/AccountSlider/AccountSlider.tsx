import { NavLink } from "react-router-dom"
import { Package, ChevronRight } from "lucide-react"
import { useAuth } from "@/features/auth/hooks/useAuth"

const AccountSidebar = () => {
  const { user, logout } = useAuth()

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `w-full text-left px-8 py-2 transition ${
      isActive
        ? "bg-blue-50 text-blue-600 font-medium"
        : "text-gray-700 hover:bg-gray-50"
    }`

  return (
    <aside className="w-[240px] bg-white border border-gray-200 text-sm">

      {/* User Info */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200">
        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold">
          {user?.name?.[0]?.toUpperCase() ?? "U"}
        </div>
        <div>
          <p className="text-xs text-gray-500">Hello,</p>
          <p className="font-semibold text-gray-800">
            {user?.name ?? "User"}
          </p>
        </div>
      </div>

      {/* My Orders */}
      <NavLink to="/account/orders" className={linkClass}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-4 h-4" />
            <span className="uppercase text-xs tracking-wide">
              My Orders
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </NavLink>

      {/* Account Settings */}
      <div className="border-t border-gray-200">
        <div className="px-4 py-3 text-gray-500 uppercase text-xs tracking-wide font-medium">
          Account Settings
        </div>

        <NavLink to="/account/profile" className={linkClass}>
          Profile Information
        </NavLink>

        <NavLink to="/account/addresses" className={linkClass}>
          Manage Addresses
        </NavLink>

        <button className="w-full text-left px-8 py-2 hover:bg-gray-50 text-gray-700">
          PAN Card Information
        </button>
      </div>

      {/* Payments */}
      <div className="border-t border-gray-200">
        <div className="px-4 py-3 text-gray-500 uppercase text-xs tracking-wide font-medium">
          Payments
        </div>

        <button className="w-full text-left px-8 py-2 hover:bg-gray-50 text-gray-700">
          Gift Cards
        </button>

        <button className="w-full text-left px-8 py-2 hover:bg-gray-50 text-gray-700">
          Saved UPI
        </button>

        <button className="w-full text-left px-8 py-2 hover:bg-gray-50 text-gray-700">
          Saved Cards
        </button>
      </div>

      {/* Logout */}
      <div className="border-t border-gray-200 mt-2">
        <button
          onClick={logout}
          className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 transition"
        >
          Logout
        </button>
      </div>

    </aside>
  )
}

export default AccountSidebar