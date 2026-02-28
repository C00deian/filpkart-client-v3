import { Outlet } from "react-router-dom"
import HomeLayout from "@/components/layout/Header/components/HomeLayout/HomeLayout"
import AccountSidebar from "./components/AccountSidebar"


const AccountLayout = () => {
  return (
    <HomeLayout>
      <div className="bg-[#f1f3f6] min-h-screen py-6">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4">

          {/* Sidebar */}
          <AccountSidebar />

          {/* Content (same styling you originally used) */}
          <div className="bg-white rounded-sm shadow-card p-4 space-y-4">
            <Outlet />
          </div>

        </div>
      </div>
    </HomeLayout>
  )
}

export default AccountLayout