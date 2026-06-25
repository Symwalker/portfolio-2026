import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

/**
 * WaveyFrameBuffer renders a wavy mesh terrain in the background.
 */
export function WaveyFrameBuffer() {
  const meshRef = useRef(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      // Slow rhythmic sway
      meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.05
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={[-2.5, -2, -4]}
      rotation={[-Math.PI / 2.3, 0, 0]}
    >
      <planeGeometry args={[10, 10, 24, 24]} />
      <meshBasicMaterial
        color="#d97706"
        wireframe={true}
        transparent={true}
        opacity={0.06}
      />
    </mesh>
  )
}
