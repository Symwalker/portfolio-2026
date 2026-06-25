import { useState, Suspense, lazy } from "react"
import { motion } from "framer-motion"
import { HeroText } from "./HeroText"
import { HeroStats } from "./HeroStats"
import { DecorativeMotifs } from "@/components/decorations/DecorativeMotifs"
import { ThreeBackground } from "@/components/three/ThreeBackground"

// Lazy load the video component for better Lighthouse scores
const HeroVideo = lazy(() => import("./HeroVideo"))

/**
 * HeroSection coordinates the full-screen layout stack of the introductory section.
 */
export function HeroSection() {
  const [isVideoFinished, setIsVideoFinished] = useState(false)

  const handleVideoEnded = () => {
    setIsVideoFinished(true)
    window.dispatchEvent(new CustomEvent("hero-video-ended"))
  }

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#09090F]">
      {/* z-0: 3D Canvas Layer */}
      <ThreeBackground />

      {/* z-10: Hero Video (full screen on mobile, comfortable capsule frame on desktop) */}
      <Suspense fallback={
        <div className="absolute inset-0 md:top-20 md:bottom-[68px] md:inset-x-6 md:rounded-2xl bg-zinc-900/10 border border-white/5 animate-pulse z-10" />
      }>
        <HeroVideo 
          src="/videos/intro-video.mp4" 
          onVideoEnded={handleVideoEnded}
          className="absolute inset-0 md:top-20 md:bottom-[68px] md:inset-x-0 z-10"
        />
      </Suspense>

      {/* z-15: SVG/CSS Motifs Layer */}
      <DecorativeMotifs className="z-15" />

      {/* z-18: Smooth top and bottom vignettes to prevent sharp cutting of background objects */}
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#09090F] to-transparent pointer-events-none z-18" />
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#09090F] to-transparent pointer-events-none z-18" />

      {/* z-30: Foreground Content Column Overlays */}
      <HeroText isVideoFinished={isVideoFinished} className="z-30" />

      {/* z-40: Bottom Statistics & Scroll Indicators */}
      <HeroStats isVideoFinished={isVideoFinished} className="z-40" />
    </section>
  )
}

export default HeroSection
