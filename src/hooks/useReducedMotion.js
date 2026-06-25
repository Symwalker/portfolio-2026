import { useState, useEffect } from "react"

/**
 * Detects if the user has requested reduced motion at the OS/browser level for accessibility.
 * @returns {boolean} - True if reduced motion is preferred.
 */
export function useReducedMotion() {
  const [isReduced, setIsReduced] = useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    
    const listener = (event) => {
      setIsReduced(event.matches)
    }

    mediaQuery.addEventListener("change", listener)

    return () => {
      mediaQuery.removeEventListener("change", listener)
    }
  }, [])

  return isReduced
}
