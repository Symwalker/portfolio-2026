/**
 * Framer Motion transition & animation variants for the portfolio.
 * To ensure high accessibility, these animations should be disabled
 * if the user has useReducedMotion active.
 */

export const transitionSlow = {
  type: "spring",
  duration: 1.2,
  bounce: 0.15,
}

export const transitionMedium = {
  type: "spring",
  duration: 0.8,
  bounce: 0.1,
}

export const transitionFast = {
  duration: 0.3,
  ease: "easeOut",
}

// Stagger parent container
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// Fade in and up
export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionSlow,
  },
}

// Fade in and down
export const fadeInDown = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionSlow,
  },
}

// Fade in and left (moves right to left)
export const fadeInLeft = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitionSlow,
  },
}

// Fade in and right (moves left to right)
export const fadeInRight = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitionSlow,
  },
}

// Scale up and fade in
export const scaleUp = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitionMedium,
  },
}

// Simple fade
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}
