import { useEffect, useRef } from "react"
import Lenis from "lenis"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "./useReducedMotion"

/**
 * Initializes and manages a Lenis smooth scroll instance.
 * Automatically cleans up on unmount and respects reduced motion settings.
 * @returns {Lenis | null} - The Lenis instance.
 */
export function useLenis() {
  const lenisRef = useRef(null)
  const isReducedMotion = useReducedMotion()

  useEffect(() => {
    if (isReducedMotion) {
      return
    }

    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    // Sync Lenis scroll updates with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    lenisRef.current = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [isReducedMotion])
}
