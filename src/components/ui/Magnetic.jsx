import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Magnetic component wraps any button or link to attract it towards the cursor.
 * Uses spring physics for an organic, responsive pull effect.
 * @param {object} props
 * @param {React.ReactNode} props.children - Element to wrap.
 * @param {number} [props.range=45] - Attraction radius in pixels.
 * @param {string} [props.className] - Additional styles.
 */
export function Magnetic({ children, range = 45, className }) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2

    const distanceX = clientX - centerX
    const distanceY = clientY - centerY

    // Euclidean distance calculation
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    if (distance < range) {
      // Pull element towards cursor (30% displacement pull strength)
      setPosition({ x: distanceX * 0.3, y: distanceY * 0.3 })
    } else {
      // Reset position when cursor is outside the threshold
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 160, damping: 15, mass: 0.1 }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  )
}

export default Magnetic;
