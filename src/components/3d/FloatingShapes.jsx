import { Canvas } from '@react-three/fiber'
import { Float, AdaptiveDpr } from '@react-three/drei'

function WireframeShape({ geometry, position, color, speed = 1 }) {
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh position={position}>
        {geometry}
        <meshBasicMaterial color={color} wireframe transparent opacity={0.15} />
      </mesh>
    </Float>
  )
}

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <WireframeShape
          geometry={<icosahedronGeometry args={[1.2, 1]} />}
          position={[-4, 2, -2]}
          color="#0066FF"
          speed={1.2}
        />
        <WireframeShape
          geometry={<torusGeometry args={[0.8, 0.3, 8, 16]} />}
          position={[4, -1, -3]}
          color="#7C3AED"
          speed={0.8}
        />
        <WireframeShape
          geometry={<octahedronGeometry args={[1, 0]} />}
          position={[3, 3, -4]}
          color="#3388FF"
          speed={1}
        />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  )
}
