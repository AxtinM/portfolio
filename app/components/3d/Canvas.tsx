'use client'

import { ReactNode, Suspense } from 'react'
import { Canvas as ThreeCanvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { cn } from '@/lib/utils'

interface CanvasProps {
  children: ReactNode
  className?: string
  camera?: {
    position?: [number, number, number]
    fov?: number
    near?: number
    far?: number
  }
  shadows?: boolean
  dpr?: [number, number]
}

export default function Canvas({
  children,
  className,
  camera = { 
    position: [0, 0, 5],
    fov: 75,
    near: 0.1,
    far: 1000
  },
  shadows = false,
  dpr = [1, 2],
}: CanvasProps) {
  return (
    <div className={cn('w-full h-full', className)}>
      <ThreeCanvas
        className="!absolute inset-0"
        camera={camera}
        shadows={shadows}
        dpr={dpr}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </ThreeCanvas>
    </div>
  )
}