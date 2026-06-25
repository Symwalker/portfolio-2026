import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"

// Seeded random number generator (pure function) to satisfy React render purity rules
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

/**
 * ParticleDust renders a responsive, floating particle starfield in the 3D scene.
 * @param {object} props
 * @param {number} [props.count] - Number of dust particles.
 */
export function ParticleDust({ count = 150 }) {
  const pointsRef = useRef(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    let seed = 1.0
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededRandom(seed++) - 0.5) * 12
      pos[i * 3 + 1] = (seededRandom(seed++) - 0.5) * 12
      pos[i * 3 + 2] = (seededRandom(seed++) - 0.5) * 8
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = time * 0.015
      pointsRef.current.rotation.x = time * 0.008
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#f59e0b"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.25}
        depthWrite={false}
      />
    </points>
  )
}
