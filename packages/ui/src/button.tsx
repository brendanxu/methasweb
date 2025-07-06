'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', asChild = false, className = '', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
    
    const variants = {
      primary: 'bg-primary-800 text-text-inverse hover:bg-primary-700 focus:ring-primary-600 shadow-lg hover:shadow-xl',
      secondary: 'bg-background-primary text-text-primary border-2 border-primary-800 hover:bg-primary-800 hover:text-text-inverse focus:ring-primary-600',
      outline: 'border-2 border-primary-800 text-primary-800 hover:bg-primary-800 hover:text-text-inverse focus:ring-primary-600',
      ghost: 'text-text-muted hover:text-text-primary hover:bg-secondary-100 focus:ring-secondary-300'
    }
    
    const hoverVariants = {
      primary: { scale: 1.02 },
      secondary: { scale: 1.02 },
      outline: { scale: 1.02 },
      ghost: { scale: 1.02 }
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-button-sm',
      md: 'px-6 py-3 text-button-md',
      lg: 'px-8 py-4 text-button-lg'
    }
    
    const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`
    
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: buttonClasses,
        ref,
        ...props
      } as any)
    }
    
    const { 
      onDrag, 
      onDragStart, 
      onDragEnd, 
      onAnimationStart,
      onAnimationEnd,
      ...otherProps 
    } = props
    
    return (
      <motion.button
        ref={ref}
        className={buttonClasses}
        whileHover={hoverVariants[variant]}
        whileTap={{ scale: 0.95 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 25 
        }}
        {...otherProps}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }