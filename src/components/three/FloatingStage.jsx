import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

/**
 * FloatingStage renders an ambient, floating 3D shape (wireframe torus knot) in the background.
 */
export function FloatingStage() {
  const groupRef = useRef(null)

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime()
      // Subtle float up and down
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.15
      // Slow rotation
      groupRef.current.rotation.x = time * 0.08
      groupRef.current.rotation.y = time * 0.12
    }
  })

  return (
    <group ref={groupRef} position={[2, 0.5, -2]}>
      <mesh>
        <torusKnotGeometry args={[0.7, 0.2, 100, 12]} />
        <meshStandardMaterial
          color="#d97706"
          wireframe={true}
          transparent={true}
          opacity={0.15}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  )
}
