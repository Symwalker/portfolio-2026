import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { useReducedMotion } from "./useReducedMotion"

/**
 * Counts up from 0 to a target number using GSAP.
 * Respects accessibility guidelines by showing the end value immediately if reduced motion is active.
 * @param {number} endValue - The target value to count up to.
 * @param {number} duration - Animation duration in seconds.
 * @returns {number} - The current display count.
 */
export function useCountUp(endValue, duration = 1.5) {
  const isReducedMotion = useReducedMotion()
  const [count, setCount] = useState(() => isReducedMotion ? endValue : 0)
  const objRef = useRef({ val: 0 })

  useEffect(() => {
    if (isReducedMotion) {
      const frameId = requestAnimationFrame(() => {
        setCount(endValue)
      })
      return () => cancelAnimationFrame(frameId)
    }

    const ctx = gsap.context(() => {
      gsap.to(objRef.current, {
        val: endValue,
        duration: duration,
        ease: "power2.out",
        onUpdate: () => {
          setCount(Math.floor(objRef.current.val))
        },
      })
    })

    return () => ctx.revert()
  }, [endValue, duration, isReducedMotion])

  return count
}
