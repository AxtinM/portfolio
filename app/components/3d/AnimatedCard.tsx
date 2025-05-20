'use client'

import React, { useState, useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  bordered?: boolean
  hoverable?: boolean
  depth?: number
}

export default function AnimatedCard({
  children,
  className,
  bordered = true,
  hoverable = true,
  depth = 1.07
}: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // Motion values for card tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Smooth springs for better animation
  const springConfig = { damping: 20, stiffness: 300 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)
  
  // Transform mouse movement to rotation
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-10, 10])
  
  // Calculate shadow dynamically in the component render
  const calculateShadow = () => {
    const xValue = xSpring.get()
    const yValue = ySpring.get()
    const intensity = isHovered ? 0.3 : 0.1
    
    return `
      ${-xValue * 20}px ${yValue * 20}px 30px rgba(0, 0, 0, ${intensity}),
      0px 10px 30px rgba(0, 0, 0, 0.05),
      inset ${-xValue * 5}px ${yValue * 5}px 10px rgba(255, 255, 255, 0.05),
      inset ${xValue * 5}px ${-yValue * 5}px 20px rgba(0, 0, 0, 0.1)
    `
  }
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverable || !ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    // Calculate position within card (0 to 1)
    const xPos = (e.clientX - rect.left) / width
    const yPos = (e.clientY - rect.top) / height
    
    // Convert to -0.5 to 0.5 range
    x.set(xPos - 0.5)
    y.set(yPos - 0.5)
  }
  
  const handleMouseLeave = () => {
    if (!hoverable) return
    
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }
  
  const borderVariants = {
    default: {
      opacity: 0.5,
      transition: { 
        duration: 0.5 
      }
    },
    hover: {
      opacity: 1,
      transition: { 
        duration: 0.3 
      }
    }
  }
  
  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-xl bg-background/40 backdrop-blur-md',
        bordered && 'p-px',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: hoverable ? depth : 1 }}
      style={{
        rotateX: hoverable ? rotateX : 0,
        rotateY: hoverable ? rotateY : 0,
        boxShadow: calculateShadow(),
        transformPerspective: 1500,
        transformStyle: 'preserve-3d',
      }}
      transition={{ duration: 0.2 }}
    >
      {bordered && (
        <motion.div 
          className="absolute inset-0 rounded-xl pointer-events-none border border-secondary/20 bg-gradient-to-br from-[#FF204E]/10 via-[#A0153E]/5 to-transparent"
          variants={borderVariants}
          initial="default"
          animate={isHovered ? "hover" : "default"}
        />
      )}
      
      <div className="relative z-10 h-full rounded-xl overflow-hidden">
        {children}
      </div>
    </motion.div>
  )
}