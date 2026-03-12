import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Package, ShoppingBag, Tag, LogOut, ChevronRight
} from 'lucide-react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { ROUTES } from '@/routes/routePaths'

const NAV = [
  { to: ROUTES.ADMIN.ROOT,      icon: LayoutDashboard, label: 'Dashboard' },
  { to: ROUTES.ADMIN.PRODUCTS,  icon: Package,         label: 'Products'  },
  { to: ROUTES.ADMIN.ORDERS,    icon: ShoppingBag,     label: 'Orders'    },
  { to: ROUTES.ADMIN.CATEGORIES,icon: Tag,             label: 'Categories'},
]

const AdminSidebar = () => {
  const { user, logout } = useAuth()

  return (
    <aside className="w-60 bg-slate-900 min-h-screen flex flex-col flex-shrink-0">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm">Flipkart</p>
            <p className="text-slate-500 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end={to === ROUTES.ADMIN.ROOT}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
              ${isActive
                ? 'bg-primary text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`
            }>
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span>{label}</span>
            <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100" />
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-3 mb-3">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-primary text-xs font-bold">
              {user?.name?.[0]?.toUpperCase() ?? 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">{user?.name ?? 'Admin'}</p>
            <p className="text-slate-500 text-xs truncate">{user?.email}</p>
          </div>
        </div>
        <button onClick={() => logout()}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400
          hover:bg-slate-800 hover:text-red-400 transition-colors w-full">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
export default AdminSidebar
