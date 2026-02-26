import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      <div className="relative group">
        <input
          ref={ref}
          id={id}
          placeholder=" "
          className={`peer block w-full rounded border px-3 pb-2.5 pt-5 text-sm text-slate-800
            bg-transparent outline-none transition-colors
            ${error ? 'border-red-400 focus:border-red-400' : 'border-slate-300 focus:border-primary'}
            disabled:bg-slate-50 disabled:cursor-not-allowed
            ${className}`}
          {...props}
        />

        {label && (
          <label
            htmlFor={id}
            className="absolute left-3 top-4 z-10 origin-[0] scale-75 -translate-y-3 transform text-sm text-slate-500
              duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
              peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-primary bg-white px-1"
          >
            {label}
          </label>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-400">{helperText}</p>}
    </div>
  )
)
Input.displayName = 'Input'
export default Input