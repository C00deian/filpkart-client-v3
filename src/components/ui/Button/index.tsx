import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  fullWidth?: boolean
}

const variantCls = {
  primary:   'bg-primary hover:bg-primary-dark text-white shadow-sm',
  secondary: 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50',
  ghost:     'text-primary hover:bg-primary/10',
  danger:    'bg-red-500 hover:bg-red-600 text-white',
}
const sizeCls = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, fullWidth, className = '', children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantCls[variant]} ${sizeCls[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}`}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  )
)
Button.displayName = 'Button'
export default Button
