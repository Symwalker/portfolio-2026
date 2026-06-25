import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { IconArrowUpRight } from "@tabler/icons-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { projects } from "@/data/projects"
import { cn } from "@/lib/utils"
import { WebGLDistortedImage } from "@/components/ui/WebGLDistortedImage"

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

/**
 * Helper to calculate card coordinates relative to the viewport based on current translate X.
 */
function getCardPositions(currentX) {
  const w = window.innerWidth
  let cardW, gapW, padL
  
  if (w < 640) {
    cardW = w * 0.82       // Mobile width 82vw
    gapW = w * 0.04        // Gap 4vw
    padL = w * 0.08        // Padding left 8vw
  } else if (w < 768) {
    cardW = w * 0.45       // Tablet width 45vw
    gapW = w * 0.04        // Gap 4vw
    padL = w * 0.10        // Padding left 10vw
  } else {
    cardW = w * 0.32       // Desktop width 32vw
    gapW = w * 0.035       // Gap 3.5vw
    padL = w * 0.10        // Padding left 10vw
  }

  return projects.map((_, idx) => {
    const left = padL + idx * (cardW + gapW) + currentX
    const right = left + cardW
    return { left, right }
  })
}

/**
 * WorkSection displays projects using a cinematic Horizontal Scroll Pinning layout.
 * Features:
 * - Left-Aligned Start: Cards align with the main container margin initially.
 * - Multi-Card Focus: All cards currently visible inside the viewport are fully focused (active).
 * - Aspect Ratio Centering: Screenshots fit completely (object-contain) inside a padded viewport
 *   above the description text. A blurred background copy of the image fills the card, creating 
 *   a premium bleed layout without cropping or stretching original mockups.
 * - Glassmorphic Text Boxes: Enhances legibility over background visuals.
 */
export function WorkSection() {
  const sectionRef = useRef(null)
  const sliderRef = useRef(null)
  const activeIndexRef = useRef(0)
  
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleIndices, setVisibleIndices] = useState([0, 1, 2]) // Default first three active
  const [scrollVelo, setScrollVelo] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Track viewport state
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Setup GSAP Pinning and Horizontal translation timeline
  useEffect(() => {
    const slider = sliderRef.current
    const section = sectionRef.current
    if (!slider || !section) return

    const totalProjects = projects.length
    let veloTimeout

    const ctx = gsap.context(() => {
      // Calculate amount to scroll horizontally
      const getScrollAmount = () => slider.scrollWidth - window.innerWidth

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 0.15, // Heavy physics overshoot control
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress
            const scrollAmount = getScrollAmount()
            const currentX = -progress * scrollAmount

            // Track active centered index for background tinting
            const index = Math.round(progress * (totalProjects - 1))
            if (index !== activeIndexRef.current) {
              activeIndexRef.current = index
              setActiveIndex(index)
            }

            // Track scroll velocity
            const rawVelo = self.getVelocity()
            const normVelo = rawVelo / 2500
            const clamped = Math.max(-1.5, Math.min(1.5, normVelo))
            setScrollVelo(clamped)

            // Compute visible cards in viewport
            const positions = getCardPositions(currentX)
            const visible = []
            positions.forEach((pos, idx) => {
              const cardWidth = pos.right - pos.left
              const threshold = cardWidth * 0.15 // 15% overlap threshold
              if (pos.right > threshold && pos.left < window.innerWidth - threshold) {
                visible.push(idx)
              }
            })
            setVisibleIndices(visible)

            // Reset velocity decay
            clearTimeout(veloTimeout)
            veloTimeout = setTimeout(() => {
              setScrollVelo(0)
            }, 100)
          }
        }
      })

      // Animate slider horizontally
      tl.to(slider, {
        x: () => -getScrollAmount(),
        ease: "none"
      })
    })

    return () => {
      ctx.revert()
      clearTimeout(veloTimeout)
    }
  }, [])

  const activeProject = projects[activeIndex]

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden select-none bg-[#09090F] flex flex-col justify-center"
    >
      
      {/* ── 1. AMBIENT BACKGROUND ACCENT TINT ── */}
      <div 
        className="absolute inset-0 transition-colors duration-1000 ease-out pointer-events-none -z-10"
        style={{
          backgroundColor: activeProject?.accent ? `${activeProject.accent}0a` : "transparent" // Hex 0a is exactly 4% opacity (extremely subtle)
        }}
      />
      <div className="absolute right-1/4 top-1/4 w-[500px] h-[500px] rounded-full transition-colors duration-1000 ease-out blur-[120px] pointer-events-none -z-10"
        style={{
          backgroundColor: activeProject?.accent ? `${activeProject.accent}05` : "transparent" // Hex 05 is ~2% opacity ambient glow
        }}
      />

      {/* vignettes to blend the color tint edges seamlessly into the #09090F base of adjacent sections */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#09090F] to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#09090F] to-transparent pointer-events-none z-20" />

      {/* ── 2. FLOATING SECTION HEADER ── */}
      <div className="absolute top-8 left-6 md:top-12 md:left-16 z-20 max-w-6xl w-[calc(100%-3rem)] md:w-[calc(100%-8rem)]">
        <div className="flex justify-between items-end w-full border-b border-white/5 pb-4">
          <div className="flex flex-col">
            <span className="font-space-grotesk text-[10px] tracking-[2.5px] text-[#C5FF3C] uppercase mb-1 font-bold">
              Portfolio
            </span>
            <h2 className="font-syne font-extrabold text-xl sm:text-2xl md:text-3xl leading-none uppercase tracking-tight text-[#F5F0E8]">
              Projects that <span className="text-[#C5FF3C]">ship & scale</span>
            </h2>
          </div>
          
          <Link
            to="/work"
            className="font-space-grotesk text-[10px] sm:text-xs tracking-wider uppercase text-[#F5F0E8]/40 hover:text-[#C5FF3C] transition-colors duration-300 flex items-center gap-1 pb-0.5"
          >
            View all <IconArrowUpRight size={12} />
          </Link>
        </div>
      </div>

      {/* ── 3. HORIZONTAL SLIDER CANVAS TRACK ── */}
      <div 
        ref={sliderRef}
        className="flex flex-row flex-nowrap items-center gap-[3.5vw] h-[60vh] md:h-[65vh] will-change-transform"
        style={{
          paddingLeft: isMobile ? "8vw" : "10vw", // Standard left margins for neat alignment
          paddingRight: isMobile ? "8vw" : "10vw"
        }}
      >
        {projects.map((project, idx) => {
          // Card is active/focused if it is visible on the screen
          const isFocused = visibleIndices.includes(idx)
          
          return (
            <div
              key={project.id}
              className={cn(
                "relative shrink-0 w-[82vw] sm:w-[45vw] md:w-[32vw] h-full rounded-[32px] border bg-[#12121A] overflow-hidden select-none shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-700 ease-out origin-center flex flex-col justify-between p-6 sm:p-8",
                isFocused 
                  ? "scale-100 opacity-100 shadow-[0_25px_60px_rgba(0,0,0,0.85)]" 
                  : "scale-88 opacity-35 border-white/5"
              )}
              style={{
                borderColor: isFocused ? `${project.accent}25` : "rgba(255,255,255,0.05)"
              }}
            >
              {/* ── Background decoration layer inside the card ── */}
              <div 
                className="absolute inset-0 transition-colors duration-1000 -z-10 pointer-events-none"
                style={{
                  background: isFocused 
                    ? `radial-gradient(circle at 50% 30%, ${project.accent}14 0%, transparent 70%)`
                    : "none"
                }}
              />

              {/* ── 1. Blurred background copy to fill bleed area nicely ── */}
              <div className="absolute inset-0 z-0 opacity-25 blur-xl scale-105 pointer-events-none">
                <img
                  src={project.image}
                  alt=""
                  className="w-full h-full object-cover select-none"
                />
              </div>

              {/* Top Row: Index and Glassmorphic Category badge */}
              <div className="flex justify-between items-center w-full relative z-10">
                <span className="font-space-grotesk text-lg sm:text-xl font-extrabold text-[#C5FF3C] bg-[#09090F] px-4 py-1 rounded-2xl border border-white/10 shadow-md">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="font-space-grotesk text-[8px] sm:text-[9px] tracking-[1.5px] text-[#F5F0E8] uppercase font-bold bg-white/5 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md">
                  {project.category.split('&')[0].trim()}
                </span>
              </div>

              {/* ── 2. Sharp foreground WebGLDistortedImage centered with padding ── */}
              <div className="absolute inset-x-4 top-16 bottom-[170px] sm:bottom-[195px] flex items-center justify-center z-0">
                <WebGLDistortedImage
                  src={project.image}
                  alt={project.title}
                  className={cn(
                    "w-full h-full rounded-2xl transition-all duration-700 select-none shadow-2xl",
                    isFocused ? "saturate-100 brightness-[0.85] md:brightness-[0.9]" : "saturate-[0.15] brightness-[0.25]"
                  )}
                  scrollVelocity={scrollVelo}
                  objectFit="contain" // Fits the whole photo completely without cropping/stretching!
                />
              </div>

              {/* Large Watermark Title in Background */}
              <div className="absolute top-16 left-6 right-6 font-syne font-black text-[12vw] sm:text-[8vw] md:text-[5.5vw] leading-none uppercase text-white/5 opacity-5 select-none tracking-wider pointer-events-none break-all">
                {project.title.split(' ')[0]}
              </div>

              {/* Bottom Row: Glassmorphic Light Text Box Overlay */}
              <div 
                className={cn(
                  "flex flex-col text-left gap-1.5 z-10 mt-auto p-4 sm:p-5 rounded-2xl border backdrop-blur-md transition-all duration-700 ease-out w-full select-text",
                  isFocused 
                    ? "bg-white/12 border-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.05)]" 
                    : "bg-white/5 border-white/5 opacity-50"
                )}
              >
                <h3 className="font-syne font-extrabold text-base sm:text-lg leading-tight text-white uppercase tracking-tight">
                  {project.title}
                </h3>
                <p className="font-dm-sans font-normal text-white/90 text-[10px] sm:text-[11px] leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                
                {/* View Project & Source links */}
                <div className="flex items-center gap-4 mt-2.5 border-t border-white/10 pt-2 w-full justify-between select-none">
                  <div className="flex items-center gap-1 font-space-grotesk text-[9px] sm:text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors duration-200 hover:text-white"
                    style={{ color: isFocused ? project.accent : '#F5F0E8' }}
                    onClick={() => window.open(project.demoUrl, '_blank')}
                  >
                    <span>View Project</span>
                    <IconArrowUpRight size={10} stroke={3} />
                  </div>
                  <div className="flex items-center gap-1 font-space-grotesk text-[9px] sm:text-[10px] font-medium uppercase tracking-wider cursor-pointer text-white/60 hover:text-white transition-colors duration-200"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <span>Source</span>
                    <IconArrowUpRight size={10} stroke={2} />
                  </div>
                </div>
              </div>

            </div>
          )
        })}
      </div>

      {/* ── 4. SCROLL PROGRESS DIAL INDICATOR ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 h-[2px] bg-white/10 rounded-full overflow-hidden z-20">
        <div 
          className="h-full transition-all duration-500 ease-out rounded-full"
          style={{
            width: `${((activeIndex + 0.5) / projects.length) * 100}%`,
            backgroundColor: activeProject?.accent || "#C5FF3C"
          }}
        />
      </div>

    </section>
  )
}

export default WorkSection;
