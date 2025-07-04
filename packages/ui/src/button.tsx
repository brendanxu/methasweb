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
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-primary text-white focus:ring-primary',
      secondary: 'bg-secondary text-white focus:ring-secondary',
      outline: 'border-2 border-primary text-primary focus:ring-primary',
      ghost: 'text-gray focus:ring-gray'
    }
    
    const hoverVariants = {
      primary: { backgroundColor: 'rgba(0, 87, 255, 0.9)', scale: 1.03 },
      secondary: { backgroundColor: 'rgba(0, 181, 161, 0.9)', scale: 1.03 },
      outline: { backgroundColor: '#0057FF', color: '#FFFFFF', scale: 1.03 },
      ghost: { backgroundColor: '#F8FAFC', color: '#0F172A', scale: 1.03 }
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
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