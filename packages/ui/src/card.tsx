'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  imageUrl: string
  category?: string
  title: string
  description: string
  href: string
  className?: string
}

export function Card({ imageUrl, category, title, description, href, className = '' }: CardProps) {
  return (
    <motion.a
      href={href}
      className={`group block overflow-hidden rounded-xl bg-white border border-neutral-200 transition-all duration-normal relative ${className}`}
      whileHover={{
        y: -4,
        boxShadow: '0 10px 40px rgba(10, 61, 46, 0.08)',
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
      }}
    >
      {/* 专业顶部装饰条 */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-700 to-primary-500"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative h-48 overflow-hidden bg-neutral-100">
        <motion.img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
        />
        {category && (
          <motion.span 
            className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-medium"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.2 }}
          >
            {category}
          </motion.span>
        )}
      </div>
      
      <div className="p-6">
        <motion.h3 
          className="mb-3 text-xl font-semibold text-neutral-900 line-clamp-2 group-hover:text-primary-700 transition-colors duration-normal"
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
        >
          {title}
        </motion.h3>
        <p className="text-neutral-600 line-clamp-3 text-sm leading-relaxed">{description}</p>
        
        {/* 专业的阅读更多指示 */}
        <motion.div
          className="mt-4 flex items-center text-primary-700 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-normal"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          了解更多
          <motion.svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </motion.svg>
        </motion.div>
      </div>
    </motion.a>
  )
}