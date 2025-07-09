/**
 * SafeContainer - 确保所有内容都有适当的左右边距
 * 这个组件解决了内容紧贴屏幕边缘的问题
 */

import { ReactNode } from 'react'

interface SafeContainerProps {
  children: ReactNode
  className?: string
  maxWidth?: 'full' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

export default function SafeContainer({ 
  children, 
  className = '', 
  maxWidth = '7xl',
  padding = 'lg'
}: SafeContainerProps) {
  const maxWidthClasses = {
    'full': 'max-w-full',
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl'
  }

  const paddingClasses = {
    'none': '',
    'sm': 'px-4',
    'md': 'px-4 sm:px-6',
    'lg': 'px-4 sm:px-6 lg:px-8',
    'xl': 'px-6 sm:px-8 lg:px-12'
  }

  return (
    <div 
      className={`
        ${maxWidthClasses[maxWidth]} 
        mx-auto 
        ${paddingClasses[padding]} 
        ${className}
      `.trim()}
      style={{
        // 强制最小边距，确保不会紧贴屏幕边缘
        paddingLeft: 'max(1rem, var(--tw-space-x-reverse))',
        paddingRight: 'max(1rem, var(--tw-space-x-reverse))'
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}