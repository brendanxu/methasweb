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
      className={`group block overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-normal border border-gray-200 ${className}`}
      whileHover={{ 
        y: -2
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <motion.img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
        />
        {category && (
          <motion.span 
            className="absolute top-4 left-4 inline-block rounded-md bg-green-500 px-3 py-1 text-xs font-medium text-white"
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
          className="mb-2 text-heading-md font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-500 transition-colors duration-fast"
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
        >
          {title}
        </motion.h3>
        <p className="text-gray-600 line-clamp-3 text-body-sm leading-relaxed">{description}</p>
      </div>
    </motion.a>
  )
}