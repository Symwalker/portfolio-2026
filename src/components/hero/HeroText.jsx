import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Magnetic } from "@/components/ui/Magnetic"
import { 
  IconBrandInstagram, 
  IconBrandLinkedin, 
  IconBrandGithub, 
  IconBrandDribbble,
  IconArrowUpRight
} from "@tabler/icons-react"

export function HeroText({ isVideoFinished = false, className }) {
  const [videoFinished, setVideoFinished] = useState(isVideoFinished)
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    if (isVideoFinished) {
      setVideoFinished(true)
    }
  }, [isVideoFinished])

  useEffect(() => {
    const handleVideoEnd = () => setVideoFinished(true)
    window.addEventListener("hero-video-ended", handleVideoEnd)
    return () => window.removeEventListener("hero-video-ended", handleVideoEnd)
  }, [])

  // Social handlers with staggered slide-in from left
  const socialList = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/shayan-hanif-developer/", icon: <IconBrandLinkedin size={18} /> },
    { name: "GitHub", url: "https://github.com/symwalker", icon: <IconBrandGithub size={18} /> },
    { name: "Instagram", url: "https://www.instagram.com/shayan.builds.ai/", icon: <IconBrandInstagram size={18} /> },
    { name: "Dribbble", url: "https://www.figma.com/design/N1XXuKIbi9GvvkuB7ZFiOD/Hey_Nico?node-id=0-1&p=f&t=ZFg0BXPRaRIkLVxT-0", icon: <IconBrandDribbble size={18} /> },
  ]

  useEffect(() => {
    if (!videoFinished) return
    
    // Start highlighting the first item immediately
    setActiveIndex(0)
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % socialList.length)
    }, 1600)
    
    return () => clearInterval(interval)
  }, [videoFinished, socialList.length])

  // Staggered container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  }

  // Social handlers list moved to state/effect block

  const socialContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18, // Slower stagger
        delayChildren: 0.5
      }
    }
  }

  const socialItemVariants = {
    hidden: { x: -40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 15 } // Slower spring
    }
  }

  // Stable avatar images for the client stack
  const clientAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
  ]

  return (
    <div
      className={cn(
        "absolute inset-x-0 bottom-[100px] z-30 px-6 md:px-16 lg:px-24 flex flex-col md:flex-row md:justify-between md:items-end gap-12 pointer-events-none select-none",
        className
      )}
    >
      {/* ── Left Column: Title, Roles, & CTAs ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-start gap-5 max-w-xl pointer-events-auto"
      >
        {/* Available Badge */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-[#09090F]/50 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-space-grotesk font-light text-[10px] tracking-[1.5px] text-[#F5F0E8]/40 uppercase">
            AVAILABLE FOR PROJECTS
          </span>
        </motion.div>

        {/* Name Stack */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <span className="font-dm-sans italic font-light text-[14px] text-[#F5F0E8]/40 ml-1">
            Hi, I'm
          </span>
          <h1 className="font-syne font-extrabold text-[48px] md:text-[68px] lg:text-[86px] leading-[0.95] text-[#F5F0E8] uppercase tracking-tight flex flex-col mt-1">
            <span>I AM</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F0E8] via-[#F5F0E8] to-[#C5FF3C]/80">SHAYAN</span>
          </h1>
        </motion.div>

        {/* Roles Text */}
        <motion.p 
          variants={itemVariants} 
          className="font-space-grotesk font-light text-[13px] tracking-wide text-[#F5F0E8]/60 mt-1"
        >
          AI Engineer & Product Manager
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 pt-2">
          {/* Primary Lime Button */}
          <Magnetic>
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                to="/work"
                className="hover-shake inline-flex items-center gap-1.5 px-6 py-3 rounded-lg bg-[#C5FF3C] text-[#09090F] font-space-grotesk font-semibold text-[12px] uppercase tracking-wider transition-opacity duration-200 hover:opacity-95 shadow-[0_4px_20px_rgba(197,255,60,0.25)]"
              >
                View Work <IconArrowUpRight size={14} stroke={2.5} />
              </Link>
            </motion.div>
          </Magnetic>

          {/* Secondary Outline Button */}
          <Magnetic>
            <motion.div whileTap={{ scale: 0.98 }}>
              <a
                href="https://calendly.com/shayanhanif50/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[#F5F0E8]/20 bg-transparent text-[#F5F0E8] font-space-grotesk font-medium text-[12px] uppercase tracking-wider transition-colors duration-200 hover:bg-white/5"
              >
                Let's Talk
              </a>
            </motion.div>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* ── Right Column: Socials, Client Stack, & Info ── */}
      <div className="flex flex-col items-start md:items-end gap-7 md:text-right max-w-sm pointer-events-auto">
        {/* Social Handlers capsule list */}
        <motion.div
          variants={socialContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3.5 w-full items-start md:items-end"
        >
          {socialList.map((soc, idx) => (
            <motion.a
              key={soc.name}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={socialItemVariants}
              whileHover={{ x: 6, scale: 1.03 }}
              className={cn(
                "inline-flex items-center gap-3 px-6 py-3 rounded-full border bg-white/5 transition-all duration-300 shadow-md",
                idx === activeIndex
                  ? "text-[#F5F0E8] border-[#C5FF3C] shadow-[0_0_15px_rgba(197,255,60,0.35)] translate-x-1.5 scale-[1.03]"
                  : "border-white/8 text-[#F5F0E8]/70 hover:text-[#F5F0E8] hover:border-[#C5FF3C] hover:shadow-[0_0_15px_rgba(197,255,60,0.35)]"
              )}
            >
              {soc.icon}
              <span className="font-space-grotesk font-light text-[11px] uppercase tracking-widest">{soc.name}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Client Stack Section */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="flex items-center gap-4 mt-3"
        >
          {/* Overlapping avatars */}
          <div className="flex -space-x-4">
            {clientAvatars.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="Client avatar"
                className="w-10 h-10 rounded-full border border-[#09090F] object-cover object-center shadow-md"
              />
            ))}
          </div>
          <span className="font-space-grotesk font-light text-[13px] text-[#F5F0E8]/50 text-left leading-tight max-w-[210px]">
            Trusted by <strong className="font-bold text-[#C5FF3C]">10+ happy clients</strong> globally.
          </span>
        </motion.div>

        {/* Description Info */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9 }}
          className="font-dm-sans font-light text-[12px] leading-relaxed text-[#F5F0E8]/35 max-w-[220px]"
        >
          Creating immersive front-ends, advanced 3D visual experiences, and aesthetic digital structures.
        </motion.p>
      </div>
    </div>
  )
}

export default HeroText
