
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useOrders } from '@/features/orders/hooks/useOrders'
import OrderCard from '@/features/orders/components/OrderCard'
import { User, Package, Heart, MapPin, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/routePaths'
import HomeLayout from '@/components/layout/Header/components/HomeLayout/HomeLayout'

const NAV_ITEMS = [
  { icon: Package, label: 'My Orders',   href: ROUTES.ORDERS },
  { icon: Heart,   label: 'Wishlist',    href: ROUTES.WISHLIST },
  { icon: MapPin,  label: 'Addresses',   href: '#' },
  { icon: Settings,label: 'Settings',    href: '#' },
]

const AccountPage = () => {
  const { user } = useAuth()
  const { data: orders } = useOrders()

  return (
   <HomeLayout>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar */}
        <aside className="bg-white rounded-sm shadow-card p-4 h-fit">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-bold text-slate-800">{user?.name ?? 'User'}</p>
              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>
          </div>
          <nav className="space-y-1">
            {NAV_ITEMS.map(item => (
              <Link key={item.label} to={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded text-sm text-slate-600 hover:bg-primary/5 hover:text-primary transition-colors">
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-sm shadow-card p-4">
            <h2 className="font-bold text-slate-800 mb-4">Recent Orders</h2>
            {orders?.length ? (
              <div className="space-y-3">
                {orders.slice(0, 3).map(order => <OrderCard key={order.id} order={order} />)}
                {orders.length > 3 && (
                  <Link to={ROUTES.ORDERS} className="text-primary text-sm font-semibold hover:underline block text-center pt-2">
                    View All Orders →
                  </Link>
                )}
              </div>
            ) : (
              <p className="text-slate-400 text-sm text-center py-6">No orders yet</p>
            )}
          </div>
        </div>
      </div>
   </HomeLayout>
    
  )
}
export default AccountPage
