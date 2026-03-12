interface BadgeProps {
  label: string
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default'
  size?: 'sm' | 'md'
}

const variantCls = {
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error:   'bg-red-100 text-red-600',
  info:    'bg-blue-100 text-blue-700',
  default: 'bg-slate-100 text-slate-600',
}

const Badge = ({ label, variant = 'default', size = 'md' }: BadgeProps) => (
  <span className={`inline-flex items-center font-semibold rounded-full
    ${size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'}
    ${variantCls[variant]}`}>
    {label}
  </span>
)
export default Badge
