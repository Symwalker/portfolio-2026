import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

// concentric torus rings at top-right
function TorusRings() {
  const groupRef = useRef()

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.x = elapsed * 0.04
      groupRef.current.rotation.y = elapsed * 0.06
      groupRef.current.rotation.z = elapsed * 0.02
    }
  })

  return (
    <group ref={groupRef} position={[2.2, 1.4, -0.5]}>
      <mesh>
        <torusGeometry args={[1.5, 0.008, 8, 64]} />
        <meshBasicMaterial color="#C5FF3C" wireframe opacity={0.12} transparent />
      </mesh>
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1.15, 0.008, 8, 64]} />
        <meshBasicMaterial color="#C5FF3C" wireframe opacity={0.16} transparent />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <torusGeometry args={[0.8, 0.008, 8, 64]} />
        <meshBasicMaterial color="#C5FF3C" wireframe opacity={0.20} transparent />
      </mesh>
    </group>
  )
}

// Counter-rotating boxes at bottom-left
function BoxWireframes() {
  const box1Ref = useRef()
  const box2Ref = useRef()

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime()
    if (box1Ref.current) {
      box1Ref.current.rotation.x = elapsed * 0.05
      box1Ref.current.rotation.y = elapsed * 0.04
    }
    if (box2Ref.current) {
      box2Ref.current.rotation.x = -elapsed * 0.04
      box2Ref.current.rotation.y = -elapsed * 0.06
    }
  })

  return (
    <group position={[-2.2, -1.5, -0.5]}>
      <mesh ref={box1Ref}>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshBasicMaterial color="#F5F0E8" wireframe opacity={0.05} transparent />
      </mesh>
      <mesh ref={box2Ref}>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        <meshBasicMaterial color="#F5F0E8" wireframe opacity={0.05} transparent />
      </mesh>
    </group>
  )
}

// Scattered floating gold dot particles
function FloatingParticles({ count = 100 }) {
  const pointsRef = useRef()

  const [positions, initialY, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const initY = new Float32Array(count)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      // spread particles across screen
      pos[i * 3] = (Math.random() - 0.5) * 8     // X
      initY[i] = (Math.random() - 0.5) * 6       // initial Y
      pos[i * 3 + 1] = initY[i]
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4 // Z

      spd[i] = 0.05 + Math.random() * 0.15       // speed factor
    }
    return [pos, initY, spd]
  }, [count])

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime()
    const posAttr = pointsRef.current?.geometry.attributes.position
    if (posAttr) {
      for (let i = 0; i < count; i++) {
        // slow vertical drift and horizontal sine wave wobble
        const xOffset = posAttr.array[i * 3]
        posAttr.array[i * 3 + 1] = initialY[i] + Math.sin(elapsed * speeds[i] + xOffset) * 0.2
        posAttr.array[i * 3] = xOffset + Math.cos(elapsed * 0.03 * speeds[i]) * 0.001
      }
      posAttr.needsUpdate = true
    }
  })

  // create small circle texture for round dots instead of squares
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 16
    canvas.height = 16
    const ctx = canvas.getContext("2d")
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8)
    grad.addColorStop(0, "rgba(197, 255, 60, 1)")
    grad.addColorStop(0.5, "rgba(197, 255, 60, 0.7)")
    grad.addColorStop(1, "rgba(197, 255, 60, 0)")
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 16, 16)
    return new THREE.CanvasTexture(canvas)
  }, [])

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#C5FF3C"
        size={0.065}
        map={texture}
        transparent
        opacity={0.3}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function ThreeBackground() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none overflow-hidden bg-[#09090F]">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: "none" }}
      >
        <TorusRings />
        <BoxWireframes />
        <FloatingParticles count={80} />
      </Canvas>
    </div>
  )
}

export default ThreeBackground
