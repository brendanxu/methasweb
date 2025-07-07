'use client'

import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  variant?: 'default' | 'filled'
  inputSize?: 'sm' | 'md' | 'lg'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, variant = 'default', inputSize = 'md', className = '', ...props }, ref) => {
    const baseStyles = 'w-full border rounded font-sans transition-all duration-fast ease-out focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-disabled disabled:cursor-not-allowed'
    
    const variants = {
      default: 'border-neutral-300 bg-neutral-0 text-neutral-700 placeholder:text-neutral-500 focus:border-primary focus:ring-primary/20',
      filled: 'border-neutral-200 bg-neutral-100 text-neutral-700 placeholder:text-neutral-500 focus:bg-neutral-0 focus:border-primary focus:ring-primary/20'
    }
    
    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg'
    }
    
    const errorStyles = error ? 'border-error focus:border-error focus:ring-error/20' : ''
    
    const inputClasses = `${baseStyles} ${variants[variant]} ${sizes[inputSize]} ${errorStyles} ${className}`
    
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-sm font-medium text-neutral-800">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }