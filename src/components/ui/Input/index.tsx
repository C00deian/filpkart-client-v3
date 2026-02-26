import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  helperText?: string
  
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({  error, helperText, className = '', ...props }, ref) => (
    <div className="flex flex-col gap-1">
      <input
        ref={ref}
        className={`w-full border rounded px-3 py-2.5 text-sm text-slate-800 outline-none transition
          placeholder-slate-400
          focus:border-primary focus:ring-2 focus:ring-primary/20
          disabled:bg-slate-50 disabled:cursor-not-allowed
          ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-300'}
          ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-400">{helperText}</p>}
    </div>
  )
)
Input.displayName = 'Input'
export default Input
