import { useRef } from "react"
import { motion, useInView } from "framer-motion"

/**
 * Footer renders a signature footer:
 * - Massive centered cursive "SHAYAN" signature SVG that draws itself on scroll.
 * - Underline flourish that strikes right after the name finishes writing.
 * - Bottom row with social text links, back to top trigger, and copyright label.
 */
export function Footer() {
  const containerRef = useRef(null)
  // Trigger animation when 20% of the footer is in view
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Name writing path variant (continuous cursive flow)
  const nameVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.8, ease: "easeInOut" },
        opacity: { duration: 0.2 }
      }
    }
  }

  // Underline strike flourish variant
  const flourishVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.8, delay: 1.6, ease: "easeOut" },
        opacity: { duration: 0.1, delay: 1.6 }
      }
    }
  }

  return (
    <footer 
      ref={containerRef}
      className="relative bg-[#09090F] border-t border-white/5 py-12 overflow-hidden select-none"
    >
      {/* Background radial glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] rounded-full bg-[#C5FF3C]/1 blur-[110px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10 flex flex-col items-center">
        
        {/* ── MASSIVE SIGNATURE WRITING CANVAS ── */}
        <div className="w-full py-8 md:py-14 flex justify-center items-center overflow-hidden">
          <svg 
            viewBox="0 0 1000 320" 
            className="w-full max-w-[95vw] md:max-w-5xl h-auto text-[#C5FF3C] filter drop-shadow-[0_0_25px_rgba(197,255,60,0.18)]"
          >
            {/* Cursive Name "SHAYAN" */}
            <motion.path
              d="M 90,180 
                 C 40,120 80,30 150,60 
                 C 200,80 90,240 190,200 
                 C 220,180 240,10 245,50 
                 C 250,90 225,220 245,200 
                 C 265,180 290,110 310,130 
                 C 330,150 305,220 330,220 
                 C 355,220 375,110 370,130 
                 C 365,150 370,220 390,220 
                 C 410,220 435,110 450,130 
                 C 465,150 455,220 455,245 
                 C 455,295 425,310 415,280 
                 C 405,250 480,120 505,150 
                 C 530,180 510,220 530,220 
                 C 550,220 575,110 590,130 
                 C 605,150 590,220 610,220 
                 C 630,220 660,110 680,130 
                 C 700,150 680,220 700,220 
                 C 720,220 745,110 760,130 
                 C 775,150 755,220 780,220 
                 C 810,220 870,160 930,100"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={nameVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />

            {/* Signature Underline Flourish */}
            <motion.path
              d="M 80,250 
                 C 280,270 540,260 900,220 
                 C 920,215 930,205 915,210 
                 C 870,225 740,240 620,245"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={flourishVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />
          </svg>
        </div>

        {/* ── BOTTOM LINKS & COPYRIGHT ROW ── */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full mt-6 pt-8 border-t border-white/5 font-space-grotesk text-[10px] md:text-xs tracking-widest text-white/45 gap-6">
          
          {/* Left Side: Social Text Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-semibold uppercase">
            <a 
              href="https://www.linkedin.com/in/shayan-hanif-developer/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#C5FF3C] transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/symwalker" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#C5FF3C] transition-colors duration-300"
            >
              GitHub
            </a>
            <a 
              href="https://www.instagram.com/shayan.builds.ai/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#C5FF3C] transition-colors duration-300"
            >
              Instagram
            </a>
            <a 
              href="https://www.figma.com/design/N1XXuKIbi9GvvkuB7ZFiOD/Hey_Nico?node-id=0-1&p=f&t=ZFg0BXPRaRIkLVxT-0" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#C5FF3C] transition-colors duration-300"
            >
              Dribbble
            </a>
          </div>

          {/* Center: Back to Top Trigger */}
          <button 
            onClick={scrollToTop}
            className="hover:text-[#C5FF3C] cursor-pointer flex items-center gap-1.5 transition-colors duration-300 group font-bold uppercase"
          >
            Back to Top 
            <span className="group-hover:-translate-y-1 transition-transform duration-300 font-sans text-sm">↑</span>
          </button>

          {/* Right Side: Copyright Statement */}
          <div className="font-semibold uppercase tracking-[0.15em]">
            © 2026 SHAYAN. ALL RIGHTS RESERVED.
          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer;
