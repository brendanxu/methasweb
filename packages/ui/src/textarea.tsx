'use client'

import React from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  variant?: 'default' | 'filled'
  textareaSize?: 'sm' | 'md' | 'lg'
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, variant = 'default', textareaSize = 'md', className = '', ...props }, ref) => {
    const baseStyles = 'w-full border rounded font-sans transition-all duration-fast ease-out focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-disabled disabled:cursor-not-allowed resize-vertical min-h-[100px]'
    
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
    
    const textareaClasses = `${baseStyles} ${variants[variant]} ${sizes[textareaSize]} ${errorStyles} ${className}`
    
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-sm font-medium text-neutral-800">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={textareaClasses}
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

Textarea.displayName = 'Textarea'

export { Textarea }