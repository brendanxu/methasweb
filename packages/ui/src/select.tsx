'use client'

import React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  variant?: 'default' | 'filled'
  selectSize?: 'sm' | 'md' | 'lg'
  options: { value: string; label: string }[]
  placeholder?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, variant = 'default', selectSize = 'md', options, placeholder, className = '', ...props }, ref) => {
    const baseStyles = 'w-full border rounded font-sans transition-all duration-fast ease-out focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-disabled disabled:cursor-not-allowed appearance-none bg-no-repeat bg-right'
    
    const variants = {
      default: 'border-neutral-300 bg-neutral-0 text-neutral-700 focus:border-primary focus:ring-primary/20',
      filled: 'border-neutral-200 bg-neutral-100 text-neutral-700 focus:bg-neutral-0 focus:border-primary focus:ring-primary/20'
    }
    
    const sizes = {
      sm: 'px-3 py-2 pr-8 text-sm',
      md: 'px-4 py-3 pr-10 text-base',
      lg: 'px-5 py-4 pr-12 text-lg'
    }
    
    const errorStyles = error ? 'border-error focus:border-error focus:ring-error/20' : ''
    
    const selectClasses = `${baseStyles} ${variants[variant]} ${sizes[selectSize]} ${errorStyles} ${className}`
    
    // SVG arrow icon inline as background
    const arrowIcon = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B778C' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`
    
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-sm font-medium text-neutral-800">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={selectClasses}
            style={{ 
              backgroundImage: arrowIcon,
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1.25rem 1.25rem'
            }}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <p className="mt-1 text-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export { Select }