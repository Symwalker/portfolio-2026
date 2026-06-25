import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { IconVolume, IconVolumeOff } from "@tabler/icons-react"

/**
 * HeroVideo plays the main introduction video exactly once,
 * holding on the last frame when done, and fading in when ready.
 * Integrates an automatic unmuting handler on user interaction.
 * @param {object} props
 * @param {string} props.src - Video source path.
 * @param {Function} [props.onVideoEnded] - Callback when video finishes playing.
 * @param {string} [props.className] - Additional classes.
 */
export function HeroVideo({ src, onVideoEnded, className }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMuted, setIsMuted] = useState(true) // Start muted to guarantee autoplay
  const [showSoundTip, setShowSoundTip] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Autoplay muted to comply with browser policy
    video.muted = true
    setIsMuted(true)

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Muted autoplay started successfully!")
        })
        .catch((err) => {
          console.error("Muted autoplay failed:", err)
        })
    }
  }, [src])

  // Automatically unmute when the user performs any gesture anywhere on the page (using capture phase to bypass stopPropagation)
  useEffect(() => {
    const handleInteraction = () => {
      const video = videoRef.current
      if (video) {
        if (video.muted) {
          video.muted = false
          setIsMuted(false)
          setShowSoundTip(false)
        }
        // Force play request to ensure audio engine registers the user gesture
        video.play().catch((err) => {
          console.log("Audio play gesture request resolved:", err)
        })
      }
      cleanup()
    }

    const cleanup = () => {
      window.removeEventListener("click", handleInteraction, { capture: true })
      window.removeEventListener("touchstart", handleInteraction, { capture: true })
      window.removeEventListener("mousedown", handleInteraction, { capture: true })
      window.removeEventListener("pointerdown", handleInteraction, { capture: true })
      window.removeEventListener("keydown", handleInteraction, { capture: true })
    }

    window.addEventListener("click", handleInteraction, { capture: true, passive: true })
    window.addEventListener("touchstart", handleInteraction, { capture: true, passive: true })
    window.addEventListener("mousedown", handleInteraction, { capture: true, passive: true })
    window.addEventListener("pointerdown", handleInteraction, { capture: true, passive: true })
    window.addEventListener("keydown", handleInteraction, { capture: true, passive: true })

    return cleanup
  }, [])

  useEffect(() => {
    if (isLoaded && isMuted) {
      setShowSoundTip(true)
      const timer = setTimeout(() => setShowSoundTip(false), 6000)
      return () => clearTimeout(timer)
    }
  }, [isLoaded, isMuted])

  const handleEnded = () => {
    if (videoRef.current) {
      // Hold on the last frame
      videoRef.current.pause()
    }
    if (onVideoEnded) {
      onVideoEnded()
    }
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    if (videoRef.current) {
      const currentMuted = videoRef.current.muted
      videoRef.current.muted = !currentMuted
      setIsMuted(!currentMuted)
      if (currentMuted) {
        setShowSoundTip(false)
      }
    }
  }

  return (
    <div className={cn("absolute inset-0 h-full w-full overflow-hidden z-10 bg-[#09090F] flex items-center justify-center", className)}>
      <motion.video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        onCanPlay={() => setIsLoaded(true)}
        onEnded={handleEnded}
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full w-full object-cover md:object-contain object-center scale-[1.02]" // object-cover on mobile zooms the headshot, md:object-contain on desktop preserves aspect ratio
      />
      
      {/* Dark overlay to blend video into the page background */}
      <div className="absolute inset-0 bg-[#09090F]/50 md:bg-[#09090F]/30 pointer-events-none" />

      {/* Floating Speaker Control Button (displays when loaded) */}
      {isLoaded && (
        <div className="absolute bottom-6 right-6 z-25 flex items-center gap-3.5 pointer-events-auto">
          {isMuted && showSoundTip && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C5FF3C]/20 bg-[#09090F]/90 text-[#C5FF3C] font-space-grotesk text-[10px] uppercase tracking-wider shadow-[0_4px_12px_rgba(0,0,0,0.5)] select-none animate-pulse"
            >
              Click for sound
            </motion.div>
          )}
          <button
            onClick={toggleMute}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#09090F]/60 text-[#F5F0E8] backdrop-blur-md transition-all duration-300 hover:bg-[#09090F]/85 hover:scale-105 cursor-pointer shadow-lg"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? (
              <IconVolumeOff size={18} className="text-[#C5FF3C]" />
            ) : (
              <IconVolume size={18} className="text-[#C5FF3C]" />
            )}
          </button>
        </div>
      )}
    </div>
  )
}

export default HeroVideo
