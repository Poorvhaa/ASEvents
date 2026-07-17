'use client'

import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function GoldParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  
  // Generate particles in a spherical formation
  const [particleData] = useState(() => {
    const count = 180
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = 2.5 + Math.random() * 3.5 // Radius between 2.5 and 6.0
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    return positions
  })

  useFrame((state) => {
    if (pointsRef.current) {
      // Slow rotation drift
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.04
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={pointsRef} positions={particleData} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#C5A880"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.6}
        />
      </Points>
    </group>
  )
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const elapsedTime = state.clock.getElapsedTime()
      // Elegant slow rotation
      meshRef.current.rotation.y = elapsedTime * 0.12
      meshRef.current.rotation.x = elapsedTime * 0.08
      // Smooth vertical float
      meshRef.current.position.y = Math.sin(elapsedTime * 0.6) * 0.15
    }
  })

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      {/* Elegant geometric shape: TorusKnot representing celebrations/unification */}
      <torusKnotGeometry args={[0.8, 0.22, 120, 16, 2, 3]} />
      <meshStandardMaterial
        color="#C5A880"
        roughness={0.25}
        metalness={0.9}
        flatShading={false}
      />
    </mesh>
  )
}

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(true)
  const [isTabActive, setIsTabActive] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // 1. Intersection Observer for viewport visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    // 2. Page visibility API for active tab detection
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden)
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // 3. Accessibility prefers-reduced-motion media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const motionListener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    mediaQuery.addEventListener('change', motionListener)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      mediaQuery.removeEventListener('change', motionListener)
    }
  }, [])

  // Static fallback if motion is restricted or low-end device is assumed
  if (prefersReducedMotion) {
    return null
  }

  // Fully stop Canvas execution when off-screen or tab is inactive to preserve battery & CPU
  if (!isInView || !isTabActive) {
    return <div ref={containerRef} className="absolute inset-0 z-0 bg-transparent" />
  }

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 60 }}
        dpr={[1, 2]} // Capped DPR for mobile performance
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#FAF8F5" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#EADBC8" />
        <directionalLight position={[0, 5, 5]} intensity={1.2} color="#FFFFFF" />
        
        <Suspense fallback={null}>
          <FloatingGeometry />
          <GoldParticles />
        </Suspense>
      </Canvas>
    </div>
  )
}
