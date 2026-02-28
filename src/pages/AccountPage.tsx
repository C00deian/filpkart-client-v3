
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useOrders } from '@/features/orders/hooks/useOrders'
import OrderCard from '@/features/orders/components/OrderCard'
import { User, Package, Heart, MapPin, Settings, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/routePaths'
import HomeLayout from '@/components/layout/Header/components/HomeLayout/HomeLayout'
import { useState } from 'react'
import AddressList from '@/features/address/components/AddressList'

type Tab = 'overview' | 'orders' | 'addresses' | 'profile'

  const NAV: { tab: Tab; icon: typeof User; label: string }[] = [
    { tab: 'overview',   icon: User,    label: 'Overview'       },
    { tab: 'orders',     icon: Package, label: 'My Orders'      },
    { tab: 'addresses',  icon: MapPin,  label: 'Addresses'      },
    { tab: 'profile',    icon: Settings,label: 'Profile Settings'},
  ]

const AccountPage = () => {
    const { user, logout } = useAuth()
  const { data: orders = [] } = useOrders()
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  return (
   <HomeLayout>
       <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* Sidebar */}
        <aside className="bg-white rounded-sm shadow-card h-fit">
          {/* User info */}
          <div className="p-4 flex items-center gap-3 border-b border-slate-100">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              {user?.name
                ? <span className="text-primary font-bold text-xl">{user.name[0].toUpperCase()}</span>
                : <User className="w-6 h-6 text-primary" />
              }
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-800 truncate">{user?.name ?? 'User'}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="p-2">
            {NAV.map(({ tab, icon: Icon, label }) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors
                  ${activeTab === tab
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'}`}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
                {activeTab === tab && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-2 border-t border-slate-100">
            <button onClick={() => logout()}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm text-red-500
                hover:bg-red-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">

          {/* ── Overview Tab ── */}
          {activeTab === 'overview' && (
            <>
              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { icon: Package, label: 'Total Orders', value: orders.length, color: 'text-blue-600 bg-blue-50' },
                  { icon: Package, label: 'Delivered',    value: orders.filter(o => o.orderStatus === 'DELIVERED').length, color: 'text-green-600 bg-green-50' },
                  { icon: Heart,   label: 'Wishlist',     value: 0, color: 'text-red-500 bg-red-50' },
                ].map(stat => (
                  <div key={stat.label} className="bg-white rounded-sm shadow-card p-4 flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-slate-800">{stat.value}</p>
                      <p className="text-xs text-slate-400">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent orders preview */}
              <div className="bg-white rounded-sm shadow-card p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-slate-800">Recent Orders</h2>
                  <button onClick={() => setActiveTab('orders')}
                    className="text-primary text-sm font-semibold hover:underline">
                    View All
                  </button>
                </div>
                {orders.length === 0 ? (
                  <div className="text-center py-6 text-slate-400">
                    <Package className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No orders yet</p>
                    <Link to={ROUTES.HOME} className="text-primary text-sm font-semibold hover:underline mt-1 block">
                      Start Shopping →
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.slice(0, 3).map(order => <OrderCard key={order.id} order={order} />)}
                  </div>
                )}
              </div>
            </>
          )}

          {/* ── Orders Tab ── */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-sm shadow-card p-4">
              <h2 className="font-bold text-slate-800 mb-4">All Orders</h2>
              {orders.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No orders placed yet</p>
                  <Link to={ROUTES.HOME} className="text-primary text-sm font-semibold hover:underline mt-1 block">
                    Start Shopping →
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map(order => <OrderCard key={order.id} order={order} />)}
                </div>
              )}
            </div>
          )}

          {/* ── Addresses Tab ── */}
          {activeTab === 'addresses' && (
            <div className="bg-white rounded-sm shadow-card p-4">
              <AddressList />
            </div>
          )}

          {/* ── Profile Tab ── */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-sm shadow-card p-4">
              <h2 className="font-bold text-slate-800 mb-4">Profile Settings</h2>
              <div className="space-y-3 max-w-sm text-sm text-slate-600">
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-400">Name</span>
                  <span className="font-medium">{user?.name ?? '—'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-400">Email</span>
                  <span className="font-medium">{user?.email ?? '—'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-400">Role</span>
                  <span className="font-medium capitalize">{user?.role?.toLowerCase() ?? '—'}</span>
                </div>
                <p className="text-xs text-slate-400 pt-2">
                  Profile editing coming soon.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
   </HomeLayout>
    
  )
}
export default AccountPage
