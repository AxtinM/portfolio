'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedHeadingProps {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  colorClassName?: string
}

export default function AnimatedHeading({
  text,
  className,
  delay = 0.2,
  as: Component = 'h1',
  colorClassName = 'text-primary'
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const controls = useAnimation()
  const [letters, setLetters] = useState<string[]>([])
  
  useEffect(() => {
    setLetters(text.split(''))
  }, [text])
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.06, 
        delayChildren: delay * i
      },
    }),
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -40,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <Component
      ref={ref}
      className={cn('leading-tight overflow-hidden', className)}
    >
      <motion.span
        className="inline-block"
        variants={container}
        initial="hidden"
        animate={controls}
        style={{ perspective: '1000px', perspectiveOrigin: 'bottom' }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={child}
            className={cn(
              "inline-block",
              letter === ' ' ? 'mr-2' : '',
              colorClassName
            )}
            whileHover={{
              y: -5,
              scale: 1.1,
              color: '#FF204E',
              transition: { duration: 0.1 }
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  )
}