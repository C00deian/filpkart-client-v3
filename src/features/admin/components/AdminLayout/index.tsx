import { Outlet } from 'react-router-dom'
import AdminSidebar from './components/AdminSidebar'

const AdminLayout = () => (
  <div className="flex min-h-screen bg-slate-100">
    <AdminSidebar />
    <main className="flex-1 overflow-auto">
      <Outlet />
    </main>
  </div>
)
export default AdminLayout
