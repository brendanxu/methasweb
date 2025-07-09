'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { type VariantProps, cva } from 'class-variance-authority'

// 按钮变体配置
const buttonVariants = cva(
  // 基础样式
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-sm hover:shadow-md',
        secondary: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 shadow-sm hover:shadow-md',
        outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-500 bg-transparent',
        ghost: 'text-primary-500 hover:bg-primary-50 focus:ring-primary-500 bg-transparent',
        link: 'text-primary-500 hover:text-primary-600 underline-offset-4 hover:underline focus:ring-primary-500 bg-transparent p-0',
        destructive: 'bg-error text-white hover:bg-red-600 focus:ring-red-500 shadow-sm hover:shadow-md',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
        xl: 'h-14 px-8 text-xl',
        icon: 'h-10 w-10',
      },
      loading: {
        true: 'cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      loading: false,
    },
  }
)

// 按钮属性类型
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

// 加载中图标组件
const LoadingIcon = () => (
  <motion.svg
    className="h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </motion.svg>
)

// 按钮组件
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    loading = false, 
    disabled,
    leftIcon,
    rightIcon,
    children,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading

    return (
      <motion.button
        ref={ref}
        className={buttonVariants({ variant, size, loading, className })}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.02 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {loading && <LoadingIcon />}
        {!loading && leftIcon && leftIcon}
        {children}
        {!loading && rightIcon && rightIcon}
      </motion.button>
    )
  }
)

Button.displayName = "Button"

// 按钮图标组件
export const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size="icon"
        className={className}
        {...props}
      >
        {children}
      </Button>
    )
  }
)

ButtonIcon.displayName = "ButtonIcon"

// 按钮组组件
export interface ButtonGroupProps {
  children: React.ReactNode
  className?: string
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ children, className, orientation = 'horizontal', size, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          inline-flex
          ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'}
          ${className}
        `}
        role="group"
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === Button) {
            return React.cloneElement(child, {
              size: size || child.props.size,
              variant: variant || child.props.variant,
              className: `
                ${child.props.className || ''}
                ${orientation === 'horizontal' ? 'first:rounded-r-none last:rounded-l-none' : 'first:rounded-b-none last:rounded-t-none'}
                ${index > 0 && index < React.Children.count(children) - 1 ? 'rounded-none' : ''}
                ${orientation === 'horizontal' ? '-ml-px' : '-mt-px'}
              `,
            })
          }
          return child
        })}
      </div>
    )
  }
)

ButtonGroup.displayName = "ButtonGroup"