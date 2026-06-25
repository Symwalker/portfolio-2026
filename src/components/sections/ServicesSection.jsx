import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Link } from "react-router-dom"
import { 
  IconArrowUpRight, 
  IconCode, 
  IconDeviceMobile, 
  IconRobot, 
  IconBrain, 
  IconRoute, 
  IconPalette 
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"

// Variants for rocket entrance animation
const tagVariants = {
  hidden: (rocket) => ({
    x: rocket.x,
    y: rocket.y,
    rotate: rocket.tilt,
    opacity: 0,
    scale: 0.5
  }),
  visible: (rocket) => ({
    x: 0,
    y: 0,
    rotate: rocket.tilt,
    opacity: 1,
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 80, 
      damping: 15, 
      mass: 1,
      delay: rocket.delay 
    }
  })
}

// A subcomponent that wraps the tags to prevent React re-render lag during spring settles
function ServiceTag({ tag, index, side, isInView }) {
  // Calculate rocket initial position (comes from a smaller distance to avoid browser raster lag)
  const getRocketInitial = (angle, side) => {
    const rad = (angle * Math.PI) / 180
    const distance = 250 // small distance for buttery smooth render
    let x = Math.cos(rad) * distance
    let y = Math.sin(rad) * distance
    
    // Ensure the left tags start off-screen on the left, right tags on the right
    if (Math.abs(x) < 10) {
      x = side === "left" ? -150 : 150
    } else {
      if (side === "left" && x > 0) x = -x
      if (side === "right" && x < 0) x = -x
    }
    return { x, y }
  }

  const rocket = getRocketInitial(tag.angle, side)
  const customParams = {
    x: rocket.x,
    y: rocket.y,
    tilt: tag.tilt,
    delay: index * 0.15
  }

  return (
    <motion.div
      custom={customParams}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={tagVariants}
      className="pointer-events-auto w-fit"
      style={{
        transformOrigin: "center center"
      }}
    >
      <div
        className={cn(
          "service-tag-wrapper flex items-center gap-4 pl-3.5 pr-8 py-3.5 rounded-full border border-[#C5FF3C]/20 bg-[#C5FF3C]/8 text-[#C5FF3C] font-space-grotesk text-[15px] md:text-[17px] uppercase tracking-wider select-none hover:border-[#C5FF3C]/50 hover:bg-[#C5FF3C]/15 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(197,255,60,0.08)]",
          isInView ? tag.idleClass : ""
        )}
        style={{
          transformOrigin: "center center"
        }}
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#C5FF3C]/15 border border-[#C5FF3C]/30 text-[#C5FF3C] shrink-0">
          {tag.icon}
        </div>
        <span className="font-bold tracking-wide whitespace-nowrap">{tag.label}</span>
      </div>
    </motion.div>
  )
}

/**
 * ServicesSection renders technical specialties and process cards.
 * Symmetrical flanking service tag columns meet suspended hanging cards on an animated rope.
 */
export function ServicesSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  // Left tags with specific niche-related icons, angles, and tilt values
  const leftTags = [
    { 
      label: "Web Development", 
      icon: <IconCode size={18} stroke={2.5} />,
      angle: 870,
      tilt: -3.5,
      idleClass: "tag-idle-1"
    },
    { 
      label: "App Development", 
      icon: <IconDeviceMobile size={18} stroke={2.5} />,
      angle: 930,
      tilt: 2.5,
      idleClass: "tag-idle-2"
    },
    { 
      label: "AI Agent Services", 
      icon: <IconRobot size={18} stroke={2.5} />,
      angle: 990,
      tilt: -2,
      idleClass: "tag-idle-3"
    },
  ]

  // Right tags with specific niche-related icons, angles, and tilt values
  const rightTags = [
    { 
      label: "AI Solutions", 
      icon: <IconBrain size={18} stroke={2.5} />,
      angle: 120,
      tilt: 3,
      idleClass: "tag-idle-4"
    },
    { 
      label: "AI Workflows", 
      icon: <IconRoute size={18} stroke={2.5} />,
      angle: 180,
      tilt: -2.5,
      idleClass: "tag-idle-5"
    },
    { 
      label: "Brand Designing", 
      icon: <IconPalette size={18} stroke={2.5} />,
      angle: 240,
      tilt: 2,
      idleClass: "tag-idle-6"
    },
  ]

  // Hanging process cards mirroring the layout and hook spots of the reference image
  const processSteps = [
    {
      id: "discover",
      num: "01",
      title: "Discover",
      dotColor: "bg-[#38BDF8] shadow-[0_0_10px_rgba(56,189,248,0.4)]",
      desc: "Understanding your goals, users, and challenges through research and strategy.",
      styleClass: "hanging-card-1",
      leftPercent: "2%",
      topPx: "80px",
      delayIdx: 0,
      grommets: [
        { side: "right", posClass: "top-[30px]" } // Grommet at top-right
      ]
    },
    {
      id: "design",
      num: "02",
      title: "Design",
      dotColor: "bg-[#C9A84C] shadow-[0_0_10px_rgba(201,168,76,0.4)]",
      desc: "Transforming insights into intuitive, beautiful, and functional product experiences.",
      styleClass: "hanging-card-2",
      leftPercent: "27%",
      topPx: "30px",
      delayIdx: 1,
      grommets: [
        { side: "left", posClass: "top-[30px]" },    // Grommet at top-left
        { side: "right", posClass: "bottom-[30px]" } // Grommet at bottom-right
      ]
    },
    {
      id: "build",
      num: "03",
      title: "Build",
      dotColor: "bg-[#A855F7] shadow-[0_0_10px_rgba(168,85,247,0.4)]",
      desc: "Developing high-performance, responsive applications with clean and optimized code.",
      styleClass: "hanging-card-3",
      leftPercent: "52%",
      topPx: "100px",
      delayIdx: 2,
      grommets: [
        { side: "left", posClass: "top-[30px]" },    // Grommet at top-left
        { side: "right", posClass: "bottom-[30px]" } // Grommet at bottom-right
      ]
    },
    {
      id: "ship",
      num: "04",
      title: "Ship",
      dotColor: "bg-[#C5FF3C] shadow-[0_0_10px_rgba(197,255,60,0.4)]",
      desc: "Deploying and scaling your products globally with speed and SEO best practices.",
      styleClass: "hanging-card-4",
      leftPercent: "77%",
      topPx: "50px",
      delayIdx: 3,
      grommets: [
        { side: "left", posClass: "top-[30px]" } // Grommet at top-left
      ]
    },
  ]

  // Framer Motion card dropping spring physics
  const cardVariants = {
    hidden: { y: -160, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 11,
        delay: 0.3 + i * 0.22
      }
    })
  }

  return (
    <section id="services" ref={sectionRef} className="relative py-28 overflow-hidden bg-[#09090F]">
      
      {/* ── SECTION MAIN HEADER ── */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-[95vw] px-4 md:px-8 lg:px-12 mb-20 text-left relative z-10"
      >
        <h2 className="font-syne font-extrabold text-[32px] sm:text-[42px] md:text-[48px] uppercase tracking-tight text-[#F5F0E8] leading-none mb-1">
          Services that
        </h2>
        <h2 className="font-syne font-extrabold text-[32px] sm:text-[42px] md:text-[48px] uppercase tracking-tight text-[#C5FF3C] leading-none">
          actually ship
        </h2>
      </motion.div>

      {/* ── PART 1: Floating Service Tags & Central Statement ── */}
      <div className="mx-auto max-w-[95vw] px-4 md:px-8 lg:px-12 mb-28 relative">
        
        {/* Subtle Background Glow Blob */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#C5FF3C]/5 blur-[100px] pointer-events-none z-0" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center z-10 relative">
          
          {/* Left Column Services (Rocket slide-in from left angles) */}
          <div className="col-span-1 lg:col-span-3 flex flex-col gap-6 items-center lg:items-start w-full">
            {leftTags.map((tag, idx) => (
              <ServiceTag 
                key={tag.label} 
                tag={tag} 
                index={idx} 
                side="left" 
                isInView={isInView}
              />
            ))}
          </div>

          {/* Center Column Statement (Fades up) */}
          <motion.div
            initial={{ y: 35, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="col-span-1 lg:col-span-6 text-center"
          >
            <span className="font-dm-sans font-light italic text-[14px] text-[#F5F0E8]/35 mb-4 block tracking-[3px] uppercase">
              Hallo!
            </span>
            <p className="font-syne text-[22px] sm:text-[26px] md:text-[32px] lg:text-[36px] leading-[1.5] text-[#F5F0E8]/55 uppercase tracking-tight max-w-4xl mx-auto">
              focus is on building high-performance <span className="text-[#F5F0E8] font-extrabold">web & mobile apps</span>, integrating custom <span className="text-[#C5FF3C] font-extrabold">ai agents & workflows</span>, and crafting premium <span className="text-[#F5F0E8] font-extrabold">brand designs</span> that solve real challenges
            </p>
          </motion.div>

          {/* Right Column Services (Rocket slide-in from right angles) */}
          <div className="col-span-1 lg:col-span-3 flex flex-col gap-6 items-center lg:items-end w-full">
            {rightTags.map((tag, idx) => (
              <ServiceTag 
                key={tag.label} 
                tag={tag} 
                index={idx} 
                side="right" 
                isInView={isInView}
              />
            ))}
          </div>

        </div>
      </div>

      {/* ── PART 2: Hanging Process Cards ── */}
      <div className="relative w-full">
        
        {/* Section Heading */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[95vw] px-4 md:px-8 lg:px-12 mb-16 text-center z-10 relative"
        >
          <span className="font-space-grotesk text-[12px] md:text-[13px] tracking-[4px] text-[#C5FF3C] uppercase mb-1 font-bold block">
            / How it works
          </span>
        </motion.div>

        {/* ── Desktop Suspended Cards Grid (With Chained Rope) ── */}
        <div className="hidden md:block relative w-full h-[520px] max-w-[95vw] mx-auto px-4 md:px-8 lg:px-12 z-10">
          
          {/* Animated Solid Lime Green Rope Path (Zigzag Corner to Corner) */}
          <svg
            className="absolute top-0 left-0 w-full h-[520px] pointer-events-none overflow-visible z-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 520"
            preserveAspectRatio="none"
          >
            {/* Background shadow path for depth */}
            <motion.path
              d="M 0,140 C 70,145 150,130 225,110 C 240,135 255,80 270,60 L 475,370 C 490,400 505,170 520,130 L 725,440 C 740,470 755,120 770,80 C 840,110 920,55 1000,60"
              fill="none"
              stroke="rgba(0,0,0,0.6)"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="blur-[3px]"
            />
            {/* Main Animated Solid Path */}
            <motion.path
              d="M 0,140 C 70,145 150,130 225,110 C 240,135 255,80 270,60 L 475,370 C 490,400 505,170 520,130 L 725,440 C 740,470 755,120 770,80 C 840,110 920,55 1000,60"
              fill="none"
              stroke="#C5FF3C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1800"
              initial={{ strokeDashoffset: 1800 }}
              whileInView={{ strokeDashoffset: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 2.2, ease: "easeOut" }}
            />
          </svg>

          {/* Render Cards absolutely along the rope curve */}
          {processSteps.map((card) => (
            <motion.div
              key={card.id}
              custom={card.delayIdx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={cardVariants}
              className="absolute w-[20.5%] h-[370px] pointer-events-auto z-10"
              style={{
                left: card.leftPercent,
                top: card.topPx,
                transformOrigin: "top center",
              }}
            >
              <div
                className={cn(
                  "group w-full h-full rounded-3xl border border-white/10 bg-[#12121A] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between hanging-card relative",
                  card.styleClass
                )}
                style={{
                  transformOrigin: "top center",
                  animationDelay: `${1.2 + card.delayIdx * 0.22}s`,
                }}
              >
                
                {/* Grommet Hooks (Positioned exactly at connection bounds) */}
                {card.grommets.map((grommet, gIdx) => (
                  <div
                    key={gIdx}
                    className={cn(
                      "absolute w-3.5 h-3.5 rounded-full border-2 border-[#C5FF3C]/40 bg-[#09090F] flex items-center justify-center z-20 shadow-md transition-colors duration-300 group-hover:border-[#09090F]/20 group-hover:bg-[#C5FF3C]",
                      grommet.side === "left" ? "left-[-7px]" : "right-[-7px]",
                      grommet.posClass
                    )}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5FF3C] transition-colors duration-300 group-hover:bg-[#09090F]" />
                  </div>
                ))}

                {/* Card Top: Large Index Number */}
                <div className="flex justify-between items-start">
                  <div className="font-space-grotesk font-extrabold text-[56px] md:text-[64px] leading-none text-[#F5F0E8]/90 select-none transition-colors duration-300 group-hover:text-[#09090F]">
                    {card.num}
                  </div>
                </div>

                {/* Card Bottom: Title & Description Stack */}
                <div className="flex flex-col text-left">
                  <h4 className="font-syne font-extrabold text-xl md:text-2xl uppercase tracking-tight text-white mb-2 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#09090F]">
                    {card.title}
                    <span className={cn("w-2 h-2 rounded-full transition-colors duration-300 group-hover:bg-[#09090F]", card.dotColor)} />
                  </h4>
                  <p className="font-space-grotesk text-[14px] md:text-[15px] leading-relaxed text-[#F5F0E8]/60 transition-colors duration-300 group-hover:text-[#09090F]/85">
                    {card.desc}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Mobile Responsive Stack (Without Rope) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 md:hidden px-6">
          {processSteps.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group w-full rounded-3xl border border-white/10 bg-[#12121A] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.8)] relative flex flex-col justify-between h-[320px] hanging-card"
            >
              <div className="font-space-grotesk font-extrabold text-[48px] md:text-[56px] leading-none text-[#F5F0E8]/90 transition-colors duration-300 group-hover:text-[#09090F]">
                {card.num}
              </div>
              <div className="flex flex-col text-left">
                <h4 className="font-syne font-extrabold text-xl md:text-2xl uppercase tracking-tight text-white mb-2 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#09090F]">
                  {card.title}
                  <span className={cn("w-2 h-2 rounded-full transition-colors duration-300 group-hover:bg-[#09090F]", card.dotColor)} />
                </h4>
                <p className="font-space-grotesk text-[14px] md:text-[15px] leading-relaxed text-[#F5F0E8]/60 transition-colors duration-300 group-hover:text-[#09090F]/85">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  )
}

export default ServicesSection
