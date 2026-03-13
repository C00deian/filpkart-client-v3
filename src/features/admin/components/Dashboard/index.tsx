import { LayoutDashboard, ShoppingBag, Package, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react'
import { useAdminOrders } from '../../hooks/useAdminOrders'
import { useAdminProducts } from '../../hooks/useAdminProducts'
import { formatPrice } from '@/utils/formatPrice'
import StatCard from './components/StatCard'
import RecentOrders from './components/RecentOrders'
import { Skeleton } from '@/components/ui/Skeleton'
import Navbar from "@/components/Navbar/Navbar.tsx";

const Dashboard = () => {
  const { orders, stats: orderStats, isLoading: ordersLoading } = useAdminOrders()
  const { allProducts, isLoading: productsLoading } = useAdminProducts()
  const isLoading = ordersLoading || productsLoading

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-primary" /> Dashboard
        </h1>
        <p className="text-slate-400 text-sm mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          <StatCard label="Total Revenue"   value={formatPrice(orderStats.revenue)} icon={TrendingUp}   color="green"  sub="From paid orders" />
          <StatCard label="Total Orders"    value={orderStats.total}                icon={ShoppingBag}  color="blue"   sub="All time" />
          <StatCard label="Total Products"  value={allProducts.length}              icon={Package}      color="purple" sub="In catalogue" />
          <StatCard label="Placed"          value={orderStats.placed}               icon={Clock}        color="orange" sub="Awaiting dispatch" />
          <StatCard label="Delivered"       value={orderStats.delivered}            icon={CheckCircle}  color="green"  sub="Successfully" />
          <StatCard label="Cancelled"       value={orderStats.cancelled}            icon={XCircle}      color="red"    sub="Lost revenue" />
        </div>
      )}

      {/* Recent Orders Table */}
      {isLoading
        ? <Skeleton className="h-80 rounded-xl" />
        : <RecentOrders orders={orders} />
      }
    </div>
  )
}
export default Dashboard
