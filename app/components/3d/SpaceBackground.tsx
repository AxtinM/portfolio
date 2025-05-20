'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useInView } from 'framer-motion'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { MathUtils } from 'three'
import Canvas from './Canvas'

// Custom particle material with glow effect
const ParticleMaterial = ({ color }: { color: string }) => {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(color) },
        time: { value: 0 },
        size: { value: 0.05 }
      },
      vertexShader: `
        uniform float time;
        uniform float size;
        
        attribute float speed;
        attribute vec3 customColor;
        
        varying vec3 vColor;
        
        void main() {
          vColor = customColor;
          
          vec3 pos = position;
          pos.y += sin(time * speed) * 0.1;
          pos.x += cos(time * speed) * 0.1;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (30.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5, 0.5));
          if (dist > 0.5) discard;
          
          float intensity = 1.0 - dist * 2.0;
          gl_FragColor = vec4(vColor, intensity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  }, [color])

  useFrame(({ clock }) => {
    material.uniforms.time.value = clock.getElapsedTime()
  })

  return <primitive object={material} />
}

// Particles component
function Particles({ count = 500, color = '#FF204E' }) {
  const [positions, setPositions] = useState<Float32Array | null>(null)
  const [speeds, setSpeeds] = useState<Float32Array | null>(null) 
  const [colors, setColors] = useState<Float32Array | null>(null)
  const points = useRef<THREE.Points>(null!)
  
  // Generate particles only on client
  useEffect(() => {
    const p = new Float32Array(count * 3)
    const s = new Float32Array(count)
    const c = new Float32Array(count * 3)
    
    const color1 = new THREE.Color('#FF204E')
    const color2 = new THREE.Color('#A0153E')
    const color3 = new THREE.Color('#5D0E41')
    const colorArray = [color1, color2, color3]
    
    for (let i = 0; i < count; i++) {
      // Position
      const x = (Math.random() - 0.5) * 10
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 4
      
      p[i * 3] = x
      p[i * 3 + 1] = y
      p[i * 3 + 2] = z
      
      // Speed
      s[i] = Math.random() * 0.5 + 0.1
      
      // Color
      const randomColor = colorArray[Math.floor(Math.random() * colorArray.length)]
      c[i * 3] = randomColor.r
      c[i * 3 + 1] = randomColor.g
      c[i * 3 + 2] = randomColor.b
    }
    
    setPositions(p)
    setSpeeds(s)
    setColors(c)
  }, [count])
  
  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })
  
  if (!positions || !speeds || !colors) return null
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-speed"
          args={[speeds, 1]}
        />
        <bufferAttribute
          attach="attributes-customColor"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <ParticleMaterial color={color} />
    </points>
  )
}

// 3D Background component 
function BackgroundScene() {
  const cameraGroup = useRef<THREE.Group>(null!)
  
  useFrame(({ clock, mouse, viewport }) => {
    if (cameraGroup.current) {
      // Gentle camera movement following mouse
      cameraGroup.current.position.x = MathUtils.lerp(
        cameraGroup.current.position.x,
        (mouse.x * viewport.width) / 10,
        0.05
      )
      cameraGroup.current.position.y = MathUtils.lerp(
        cameraGroup.current.position.y,
        (mouse.y * viewport.height) / 10,
        0.05
      )
    }
  })
  
  return (
    <>
      <group ref={cameraGroup}>
        <Particles count={500} />
      </group>
      
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.2} 
          luminanceSmoothing={0.9} 
          intensity={0.8} 
        />
        <Vignette darkness={0.5} offset={0.1} />
      </EffectComposer>
    </>
  )
}

// Background gradient
function BackgroundGradient() {
  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#00224D] via-[#5D0E41] to-[#00224D] opacity-90" />
  )
}

// Main component
export default function SpaceBackground({ className }: { className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })
  
  return (
    <div ref={ref} className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <BackgroundGradient />
      {isInView && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 1.5]} // Lower DPR for better performance
        >
          <BackgroundScene />
        </Canvas>
      )}
    </div>
  )
}