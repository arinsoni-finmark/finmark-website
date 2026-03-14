import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import * as THREE from 'three'

// Morphing icosahedron with noise-like vertex displacement
function MorphingSphere() {
  const meshRef = useRef()
  const wireRef = useRef()
  const originalPositions = useRef(null)

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return
    const geo = meshRef.current.geometry
    const pos = geo.attributes.position

    if (!originalPositions.current) {
      originalPositions.current = new Float32Array(pos.array)
    }

    const t = clock.getElapsedTime()
    const orig = originalPositions.current

    for (let i = 0; i < pos.count; i++) {
      const ox = orig[i * 3]
      const oy = orig[i * 3 + 1]
      const oz = orig[i * 3 + 2]

      const len = Math.sqrt(ox * ox + oy * oy + oz * oz)
      const nx = ox / len
      const ny = oy / len
      const nz = oz / len

      // Multi-frequency displacement for organic morphing
      const d =
        Math.sin(ox * 3 + t * 0.8) *
          Math.cos(oy * 3 + t * 0.6) *
          Math.sin(oz * 3 + t * 0.4) *
          0.12 +
        Math.sin(ox * 5 - t * 1.2) * Math.cos(oz * 5 + t) * 0.06

      pos.array[i * 3] = ox + nx * d
      pos.array[i * 3 + 1] = oy + ny * d
      pos.array[i * 3 + 2] = oz + nz * d
    }

    pos.needsUpdate = true
    geo.computeVertexNormals()

    // Slow rotation + mouse influence
    const group = meshRef.current.parent
    if (group) {
      group.rotation.y = t * 0.05 + pointer.x * 0.4
      group.rotation.x = Math.sin(t * 0.03) * 0.15 + pointer.y * 0.2
    }
  })

  return (
    <group>
      {/* Solid mesh with gradient-like material */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 5]} />
        <meshStandardMaterial
          color="#0a0a2e"
          roughness={0.8}
          metalness={0.2}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Wireframe overlay for tech look */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.01, 5]} />
        <meshBasicMaterial
          color="#0066FF"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial
          color="#0066FF"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

// Data particles orbiting the sphere
function OrbitalParticles() {
  const ref = useRef()
  const count = 1500

  const { positions, colors, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    const colorA = new THREE.Color('#0066FF')
    const colorB = new THREE.Color('#7C3AED')
    const colorC = new THREE.Color('#3388FF')

    for (let i = 0; i < count; i++) {
      // Distribute in a shell around the sphere
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const r = 2.5 + Math.random() * 3

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      const t = Math.random()
      const c = t < 0.33 ? colorA : t < 0.66 ? colorB : colorC
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b

      spd[i] = 0.2 + Math.random() * 0.5
    }
    return { positions: pos, colors: col, speeds: spd }
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array
    const t = clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      const x = pos[i * 3]
      const y = pos[i * 3 + 1]
      const z = pos[i * 3 + 2]

      // Orbit around Y axis
      const angle = speeds[i] * t * 0.1
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const nx = x * cos - z * sin
      const nz = x * sin + z * cos

      pos[i * 3] = nx
      pos[i * 3 + 2] = nz
    }

    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
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
        size={0.025}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Data stream rings
function DataRings() {
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()

  const ringPoints = useMemo(() => {
    const createRing = (radius, count) => {
      const pos = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2
        pos[i * 3] = Math.cos(angle) * radius
        pos[i * 3 + 1] = 0
        pos[i * 3 + 2] = Math.sin(angle) * radius
      }
      return pos
    }
    return {
      ring1: createRing(3.2, 150),
      ring2: createRing(4.0, 200),
      ring3: createRing(4.8, 120),
    }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 3
      ring1Ref.current.rotation.y = t * 0.15
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.PI / 2.5
      ring2Ref.current.rotation.z = -t * 0.1
      ring2Ref.current.rotation.y = t * 0.05
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = Math.PI / 4
      ring3Ref.current.rotation.y = -t * 0.08
      ring3Ref.current.rotation.z = t * 0.12
    }
  })

  return (
    <>
      <points ref={ring1Ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={150}
            array={ringPoints.ring1}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#0066FF"
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={ring2Ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={200}
            array={ringPoints.ring2}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#7C3AED"
          transparent
          opacity={0.35}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={ring3Ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={120}
            array={ringPoints.ring3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#3388FF"
          transparent
          opacity={0.25}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  )
}

// Background stars
function StarField() {
  const ref = useRef()
  const count = 500

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.005
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#ffffff"
        transparent
        opacity={0.2}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#0066FF" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.3}
          color="#7C3AED"
        />
        <pointLight position={[0, 10, -5]} intensity={0.2} color="#3388FF" />

        <MorphingSphere />
        <OrbitalParticles />
        <DataRings />
        <StarField />

        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  )
}
