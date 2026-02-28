import { useAuth } from "@/features/auth/hooks/useAuth"

const ProfileTab = () => {
  const { user } = useAuth()

  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between border-b py-2">
        <span className="text-gray-500">Name</span>
        <span className="font-medium">{user?.name}</span>
      </div>

      <div className="flex justify-between border-b py-2">
        <span className="text-gray-500">Email</span>
        <span className="font-medium">{user?.email}</span>
      </div>
    </div>
  )
}

export default ProfileTab