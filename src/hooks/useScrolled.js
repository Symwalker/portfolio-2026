import { useState, useEffect } from "react"

/**
 * Returns true if the window scroll position is past a specified threshold.
 * Useful for toggling glassmorphism styling on navbars.
 * @param {number} threshold - Scroll distance in pixels to trigger state change.
 * @returns {boolean} - True if scroll position is past threshold.
 */
export function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [threshold])

  return scrolled
}
