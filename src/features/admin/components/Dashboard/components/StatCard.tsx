import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  color: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'yellow'
  sub?: string
}

const colorMap = {
  blue:   { bg: 'bg-blue-50',   icon: 'bg-blue-100 text-blue-600',   text: 'text-blue-600'   },
  green:  { bg: 'bg-green-50',  icon: 'bg-green-100 text-green-600', text: 'text-green-600'  },
  orange: { bg: 'bg-orange-50', icon: 'bg-orange-100 text-orange-600',text: 'text-orange-600' },
  red:    { bg: 'bg-red-50',    icon: 'bg-red-100 text-red-600',     text: 'text-red-500'    },
  purple: { bg: 'bg-purple-50', icon: 'bg-purple-100 text-purple-600',text: 'text-purple-600' },
  yellow: { bg: 'bg-yellow-50', icon: 'bg-yellow-100 text-yellow-600',text: 'text-yellow-600' },
}

const StatCard = ({ label, value, icon: Icon, color, sub }: StatCardProps) => {
  const c = colorMap[color]
  return (
    <div className={`${c.bg} rounded-xl p-5 flex items-center gap-4`}>
      <div className={`${c.icon} p-3 rounded-xl flex-shrink-0`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <p className={`text-2xl font-bold ${c.text}`}>{value}</p>
        {sub && <p className="text-slate-400 text-xs mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}
export default StatCard
