import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import * as THREE from 'three'

function fibonacciSphere(samples) {
  const points = []
  const phi = Math.PI * (Math.sqrt(5) - 1)
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = phi * i
    points.push(new THREE.Vector3(
      Math.cos(theta) * radius,
      y,
      Math.sin(theta) * radius
    ))
  }
  return points
}

function Globe() {
  const pointsRef = useRef()
  const linesRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })

  const count = 1500
  const radius = 2.2

  const { positions, colors } = useMemo(() => {
    const pts = fibonacciSphere(count)
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const colorA = new THREE.Color('#0066FF')
    const colorB = new THREE.Color('#7C3AED')

    pts.forEach((p, i) => {
      pos[i * 3] = p.x * radius
      pos[i * 3 + 1] = p.y * radius
      pos[i * 3 + 2] = p.z * radius

      const t = (p.y + 1) / 2
      const c = colorA.clone().lerp(colorB, t)
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    })
    return { positions: pos, colors: col }
  }, [])

  const linePositions = useMemo(() => {
    const pts = fibonacciSphere(count)
    const lines = []
    const threshold = 0.35

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = pts[i].distanceTo(pts[j])
        if (dist < threshold) {
          lines.push(
            pts[i].x * radius, pts[i].y * radius, pts[i].z * radius,
            pts[j].x * radius, pts[j].y * radius, pts[j].z * radius
          )
        }
        if (lines.length > 15000) break
      }
      if (lines.length > 15000) break
    }
    return new Float32Array(lines)
  }, [])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.08
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.1
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = clock.getElapsedTime() * 0.08
      linesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.1
    }
  })

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#0066FF" transparent opacity={0.08} />
      </lineSegments>
    </group>
  )
}

export default function ParticleGlobe() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <Globe />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  )
}
