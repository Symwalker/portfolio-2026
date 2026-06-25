import { useState, useCallback, useRef, useEffect, memo } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { 
  IconBrandReact, 
  IconBrandJavascript, 
  IconBrandTypescript, 
  IconBrandNextjs, 
  IconBrandAws, 
  IconBrandDocker, 
  IconGitBranch, 
  IconGitMerge, 
  IconBrain, 
  IconRobot, 
  IconBrandPython, 
  IconCpu, 
  IconBrandFigma, 
  IconPalette, 
  IconBox,
  IconMapPin,
  IconCalendar,
  IconVolume,
  IconVolumeOff,
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandInstagram,
  IconMail,
  IconBrush
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"

// 3D Keycap subcomponent representing a mechanical keyboard key
const Keycap = memo(function Keycap({ skill, onHoverStart, onHoverEnd }) {
  return (
    <div 
      className="relative w-20 h-20 sm:w-24 sm:h-24 group cursor-pointer transform-style-3d pointer-events-auto"
      onMouseEnter={() => onHoverStart(skill)}
      onMouseLeave={onHoverEnd}
    >
      {/* 1. Ground guide shadow/footprint (flat on floor, Z=0) */}
      <div className="absolute inset-0 rounded-2xl border border-white/5 bg-white/2 group-hover:border-[#C5FF3C]/40 group-hover:bg-[#C5FF3C]/5 group-hover:shadow-[0_0_20px_rgba(197,255,60,0.15)] transition-all duration-300 transform-gpu" />

      {/* 2. Dotted vertical projection line (connects footprint to raised keycap) */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-20 border-l border-dashed border-[#C5FF3C]/0 group-hover:border-[#C5FF3C]/20 transition-all duration-300"
        style={{
          transform: "rotateX(90deg) translateZ(-12px)",
          transformOrigin: "center center"
        }}
      />

      {/* 3. 3D Keycap Body (moves up on hover along Z-axis) */}
      <div 
        className="absolute inset-0 transform-style-3d transition-transform duration-300 ease-out group-hover:translate-z-[28px]"
        style={{
          transform: "translateZ(12px)"
        }}
      >
        {/* Top Face */}
        <div className="absolute inset-0 bg-[#181824] border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-1.5 text-[#F5F0E8] select-none transition-colors duration-300 group-hover:border-[#C5FF3C]/30 transform-style-3d">
          <div className="text-white/80 group-hover:text-[#C5FF3C] transition-colors duration-300 scale-105 sm:scale-110">
            {skill.icon}
          </div>
          <span className="font-space-grotesk font-extrabold text-[9px] sm:text-[10px] tracking-widest text-[#F5F0E8]/50 group-hover:text-[#C5FF3C] transition-colors duration-300 uppercase">
            {skill.label}
          </span>
        </div>

        {/* Bottom Face shadow cap */}
        <div className="absolute inset-0 bg-[#09090F] rounded-2xl" style={{ transform: "translateZ(-12px)" }} />

        {/* Front/Bottom-Right Side Face */}
        <div 
          className="absolute bottom-0 left-[2px] right-[2px] h-[14px] origin-bottom bg-[#12121A] border-t border-white/5 group-hover:bg-[#C5FF3C] group-hover:border-[#C5FF3C] group-hover:shadow-[0_4px_10px_rgba(197,255,60,0.3)] transition-all duration-300"
          style={{
            transform: "rotateX(-90deg)",
            borderRadius: "0 0 8px 8px"
          }}
        />

        {/* Back/Top-Left Side Face */}
        <div 
          className="absolute top-0 left-[2px] right-[2px] h-[14px] origin-top bg-[#12121A] border-b border-white/5 group-hover:bg-[#C5FF3C] group-hover:border-[#C5FF3C] group-hover:shadow-[0_-4px_10px_rgba(197,255,60,0.3)] transition-all duration-300"
          style={{
            transform: "rotateX(90deg)",
            borderRadius: "8px 8px 0 0"
          }}
        />

        {/* Left/Top-Right Side Face */}
        <div 
          className="absolute top-[2px] bottom-[2px] left-0 w-[14px] origin-left bg-[#12121A] border-r border-white/5 group-hover:bg-[#C5FF3C] group-hover:border-[#C5FF3C] group-hover:shadow-[-4px_0_10px_rgba(197,255,60,0.3)] transition-all duration-300"
          style={{
            transform: "rotateY(90deg)",
            borderRadius: "8px 0 0 8px"
          }}
        />

        {/* Right/Bottom-Left Side Face */}
        <div 
          className="absolute top-[2px] bottom-[2px] right-0 w-[14px] origin-right bg-[#12121A] border-l border-white/5 group-hover:bg-[#C5FF3C] group-hover:border-[#C5FF3C] group-hover:shadow-[4px_0_10px_rgba(197,255,60,0.3)] transition-all duration-300"
          style={{
            transform: "rotateY(-90deg)",
            borderRadius: "0 8px 8px 0"
          }}
        />
      </div>
    </div>
  )
})

/**
 * AboutSection details Shayan's bio, education, and technical skills.
 * Left profile panel remains sticky on desktop, right panel scrolls naturally.
 */
export function AboutSection() {
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [isSoundEnabled, setIsSoundEnabled] = useState(true)
  const soundEnabledRef = useRef(true)
  const timeoutRef = useRef(null)

  // Keep ref in sync to keep handleHoverStart dependency array clean
  useEffect(() => {
    soundEnabledRef.current = isSoundEnabled
  }, [isSoundEnabled])

  // Synthesize realistic mechanical key click haptics using browser Web Audio API
  const playKeyboardSound = () => {
    if (!soundEnabledRef.current) return
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return
      
      const audioCtx = new AudioCtx()
      
      // High-pass filter for a crisp plastic sound
      const filter = audioCtx.createBiquadFilter()
      filter.type = "highpass"
      filter.frequency.value = 1000

      const osc = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()

      // Randomize frequency slightly (1800Hz to 2400Hz) to represent keycap size differences
      const freq = 1800 + Math.random() * 600
      osc.type = "sine"
      osc.frequency.value = freq

      // Volume envelope to simulate key click impact decay
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.002)
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.03)

      osc.connect(gainNode)
      gainNode.connect(filter)
      filter.connect(audioCtx.destination)

      osc.start()
      osc.stop(audioCtx.currentTime + 0.04)
    } catch (e) {
      console.log("AudioContext click play blocked:", e)
    }
  }

  // Stagger/Debounce hover bridging to prevent layout re-render spikes
  const handleHoverStart = useCallback((skill) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setHoveredSkill(skill)
    playKeyboardSound()
  }, [])

  const handleHoverEnd = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setHoveredSkill(null)
    }, 80) // 80ms bridging window
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Socials list
  const socialPills = [
    { label: "GitHub", url: "https://github.com/symwalker", icon: <IconBrandGithub size={14} /> },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/shayan-hanif-developer/", icon: <IconBrandLinkedin size={14} /> },
    { label: "Instagram", url: "https://www.instagram.com/shayan.builds.ai/", icon: <IconBrandInstagram size={14} /> },
    { label: "Email", url: "mailto:contact@example.com", icon: <IconMail size={14} /> },
  ]

  // Experience timeline data
  const experiences = [
    {
      company: "360Xpert Solutions",
      role: "Product Manager",
      period: "2026 - Present",
      colorClass: "text-[#C5FF3C]",
      achievements: [
        "Drive product for Perpetua Foundry, a multi-tenant AI-powered LMS, from discovery and PRDs to shipped features.",
        "Own product strategy, roadmap, and prioritization, working closely with engineering and design.",
        "Bridge product and engineering, translating business needs into clear specs, then into working interfaces."
      ]
    },
    {
      company: "360Xpert Solutions",
      role: "AI Engineer",
      period: "2025 - Present",
      colorClass: "text-[#38BDF8]",
      achievements: [
        "Build AI-powered features and automations in Python, integrating LLMs via the Claude API and building multi-agent systems with CrewAI.",
        "Develop AI voice and calling agents (Vapi, Twilio) and conversational workflows for client outreach and support use cases.",
        "Design and deploy automation workflows with n8n and Make, connecting APIs, webhooks, CRMs, and messaging channels (WhatsApp, email) into end-to-end pipelines.",
        "Build backend services and APIs with FastAPI, plus RAG pipelines and data workflows in Python.",
        "Turn AI capabilities into production features across Perpetua's AI modules — token governance, AI cost intelligence."
      ]
    },
    {
      company: "360Xpert Solutions",
      role: "Full-Stack Developer",
      period: "2022 - 2024",
      colorClass: "text-[#A855F7]",
      achievements: [
        "Built and shipped full-stack web and mobile apps end-to-end: attendance systems, creator marketplaces, research-to-audio apps, and more.",
        "Developed responsive frontends in React, Next.js, and TypeScript, paired with Node.js, Express, and REST APIs.",
        "Designed and managed databases (PostgreSQL, MongoDB), handled auth, and integrated third-party services.",
        "Owned the full cycle: UI/UX, frontend, backend, and deployment (Vercel, Docker)."
      ]
    }
  ]

  // Studies list
  const studies = [
    {
      title: "University of Karachi — Software Engineering (2022 – 2026)",
      desc: "Focus on software systems, distributed and parallel computing, and web engineering."
    },
    {
      title: "Self-Directed — Product & AI Engineering",
      desc: "Continuously building skill in product management (discovery frameworks, PRDs, prioritization) and applied AI, most recently a multi-agent cold-outreach system (Zara) using CrewAI, FastAPI, and the Claude API."
    }
  ]

  // Skills divided isometrically (Product, AI & Automation, Frontend, Backend & Tools)
  const skillsData = [
    // Product (Row 1)
    { label: "PRD", icon: <IconPalette size={28} />, category: "Product Management", desc: "Writing PRDs, product strategy, and defining feature specifications." },
    { label: "DISCOV", icon: <IconBrain size={28} />, category: "Product Management", desc: "User research, product discovery frameworks, and problem validation." },
    { label: "PRIOR", icon: <IconGitMerge size={28} />, category: "Product Management", desc: "Roadmap planning, backlog prioritization, and release coordination." },
    { label: "FIGMA", icon: <IconBrandFigma size={28} />, category: "Product & Tools", desc: "Designing high-fidelity user layouts and interactive prototypes." },
    
    // AI & Automation (Row 2)
    { label: "PYTHON", icon: <IconBrandPython size={28} />, category: "AI & Automation", desc: "Writing data pipelines, agents, backend APIs, and custom integrations." },
    { label: "CREWAI", icon: <IconRobot size={28} />, category: "AI & Automation", desc: "Orchestrating multi-agent networks, CrewAI setups, and autonomous pipelines." },
    { label: "N8N", icon: <IconGitBranch size={28} />, category: "AI & Automation", desc: "Building workflow automations in n8n and Make with webhooks and APIs." },
    { label: "FASTAPI", icon: <IconCpu size={28} />, category: "AI & Automation", desc: "Developing high-performance backend services and microservices." },
    
    // Frontend (Row 3)
    { label: "REACT", icon: <IconBrandReact size={28} />, category: "Frontend", desc: "Building fast, reactive frontend apps with modern React and hooks." },
    { label: "NEXT", icon: <IconBrandNextjs size={28} />, category: "Frontend", desc: "Architecting server-side rendered (SSR) web apps with Next.js App Router." },
    { label: "TS", icon: <IconBrandTypescript size={28} />, category: "Frontend", desc: "Structuring scaleable frontends with type-safe TypeScript interfaces." },
    { label: "GSAP", icon: <IconBox size={28} />, category: "Frontend & Animation", desc: "Creating high-performance animations and interactive 3D WebGL layouts." },
    
    // Backend & Tools (Row 4)
    { label: "NODE", icon: <IconBrandJavascript size={28} />, category: "Backend & Tools", desc: "Developing secure REST APIs and servers with Node.js and Express." },
    { label: "DB", icon: <IconCpu size={28} />, category: "Backend & Tools", desc: "Modeling and managing databases with PostgreSQL and MongoDB." },
    { label: "DOCKER", icon: <IconBrandDocker size={28} />, category: "Backend & Tools", desc: "Containerizing web services for robust, unified deployment." },
    { label: "GIT", icon: <IconGitMerge size={28} />, category: "Backend & Tools", desc: "Managing clean version control, branching, and pull request workflows." }
  ]

  return (
    <section id="about" className="relative py-32 bg-[#09090F] border-t border-white/5">
      
      {/* Background Glow Ring */}
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] rounded-full bg-[#C5FF3C]/2 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 md:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start relative">
          
          {/* ── LEFT COLUMN: STICKY PROFILE PANEL ── */}
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-32 self-start flex flex-col items-center lg:items-start gap-6 text-center lg:text-left z-10">
            
            {/* Circle Avatar */}
            <div className="w-44 h-44 rounded-full overflow-hidden border-2 border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6)] relative group">
              <img 
                src="/images/head-shot/head-shot.png" 
                alt="Shayan" 
                className="w-full h-full object-cover transition-all duration-500 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-[#C5FF3C]/10 opacity-10 group-hover:opacity-0 transition-opacity duration-500" />
            </div>

            {/* Location Badge */}
            <div className="flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-white/5 bg-white/2 backdrop-blur-sm shadow-sm select-none">
              <IconMapPin size={15} className="text-[#C5FF3C]" />
              <span className="font-space-grotesk text-xs tracking-wider text-[#F5F0E8]/70 uppercase">
                Asia/Karachi
              </span>
            </div>

            {/* Language Badges */}
            <div className="flex gap-2.5 select-none">
              <div className="px-4 py-1.5 rounded-lg border border-white/10 bg-[#12121A] text-xs font-space-grotesk text-[#F5F0E8]/50">
                English
              </div>
              <div className="px-4 py-1.5 rounded-lg border border-white/10 bg-[#12121A] text-xs font-space-grotesk text-[#F5F0E8]/50">
                Urdu
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: SCROLLABLE CORE CONTENT ── */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-24 z-10">
            
            {/* Section 1: Intro Header Block */}
            <div className="flex flex-col items-start text-left relative">
              
              {/* Call Schedule Button pill */}
              <div className="mb-6">
                <a
                  href="https://calendly.com/shayanhanif50/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#C5FF3C]/40 bg-[#C5FF3C]/5 hover:bg-[#C5FF3C] text-[#C5FF3C] hover:text-[#09090F] font-space-grotesk font-semibold text-[11px] uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_15px_rgba(197,255,60,0.3)] hover:scale-105"
                >
                  <IconCalendar size={13} /> Schedule a call
                </a>
              </div>

              {/* Name & Title */}
              <h2 className="font-syne font-extrabold text-[64px] sm:text-[80px] md:text-[92px] uppercase leading-none tracking-tight text-[#F5F0E8]">
                Shayan
              </h2>
              <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-[#C5FF3C] mt-3 select-none">
                AI Engineer & Product Manager
              </h3>

              {/* Social Pills */}
              <div className="flex flex-wrap gap-3 mt-6">
                {socialPills.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/8 bg-white/3 hover:border-[#C5FF3C]/50 hover:bg-[#C5FF3C]/5 text-xs font-space-grotesk text-[#F5F0E8]/70 hover:text-white transition-all duration-300 shadow-sm"
                  >
                    {social.icon}
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>

              {/* Bio Paragraph */}
              <p className="font-space-grotesk font-normal text-[17px] md:text-[19px] leading-relaxed text-[#F5F0E8]/75 mt-8 max-w-3xl">
                Hi, I'm Shayan, a Karachi-based product manager and AI engineer. I make sense of complex problems and ship clean, usable products. My work spans the full stack, from writing PRDs and shaping product strategy to building AI agents, automations, and multi-tenant platforms. What drives me is simple: AI-powered tools that real businesses actually use.
              </p>
            </div>

            {/* Section 2: Work Experience */}
            <div className="flex flex-col items-start text-left">
              <h3 className="font-syne font-extrabold text-4xl uppercase tracking-tight text-[#F5F0E8] mb-12">
                Work Experience
              </h3>
              
              <div className="flex flex-col gap-12 w-full">
                {experiences.map((exp) => (
                  <div key={exp.company} className="border-l-2 border-white/5 pl-6 flex flex-col gap-4">
                    
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                      <div className="flex flex-col">
                        <h4 className="font-syne font-extrabold text-2xl sm:text-3xl text-white">
                          {exp.company}
                        </h4>
                        <span className={cn("font-space-grotesk text-sm sm:text-base font-bold tracking-wider uppercase mt-1", exp.colorClass)}>
                          {exp.role}
                        </span>
                      </div>
                      <span className="font-space-grotesk text-sm text-[#F5F0E8]/40 mt-1 sm:mt-0">
                        {exp.period}
                      </span>
                    </div>

                    {/* Bullet Achievements */}
                    <ul className="list-disc pl-5 flex flex-col gap-3">
                      {exp.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="font-space-grotesk text-[15px] md:text-[16px] leading-relaxed text-[#F5F0E8]/70">
                          {ach}
                        </li>
                      ))}
                    </ul>

                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Studies */}
            <div className="flex flex-col items-start text-left">
              <h3 className="font-syne font-extrabold text-4xl uppercase tracking-tight text-[#F5F0E8] mb-12">
                Studies
              </h3>

              <div className="flex flex-col gap-8 w-full">
                {studies.map((std) => (
                  <div key={std.title} className="flex flex-col items-start gap-1">
                    <h4 className="font-syne font-extrabold text-xl sm:text-2xl text-white">
                      {std.title}
                    </h4>
                    <p className="font-space-grotesk text-[15px] md:text-[16px] text-[#F5F0E8]/70">
                      {std.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Technical Skills (3D Keyboard) */}
            <div className="flex flex-col items-start text-left overflow-visible">
              <h3 className="font-syne font-extrabold text-4xl uppercase tracking-tight text-[#F5F0E8] mb-2">
                Technical Skills
              </h3>
              <p className="font-space-grotesk text-base text-[#F5F0E8]/50 mb-10">
                An interactive 3D mechanical keyboard layout representing my primary tech platforms.
              </p>

              {/* OLED Telemetry Console Display */}
              <div className="w-full max-w-2xl select-none">
                <div className="mb-10 p-6 rounded-2xl border border-white/5 bg-[#12121A] relative overflow-hidden shadow-inner">
                  {/* CRT/OLED Scanline Scan Grid Effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,26,0)_95%,rgba(0,0,0,0.35)_95%)] bg-[size:100%_4px] pointer-events-none opacity-20" />
                  <div className="absolute inset-0 bg-[#C5FF3C]/2 blur-[60px] pointer-events-none" />
                  
                  {/* Console Content */}
                  <div className="relative z-10 flex flex-col gap-1.5 min-h-[90px] justify-center text-left">
                    <div className="flex items-center justify-between">
                      {hoveredSkill ? (
                        <span className="font-space-grotesk text-[10px] tracking-[2.5px] text-[#C5FF3C] uppercase font-bold">
                          [ {hoveredSkill.category} ]
                        </span>
                      ) : (
                        <span className="font-space-grotesk text-[10px] tracking-[2.5px] text-white/30 uppercase font-bold">
                          [ SYSTEM_CONSOLE ]
                        </span>
                      )}
                      
                      {/* Audio Haptics mute/unmute controller */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsSoundEnabled(!isSoundEnabled)
                        }}
                        className={cn(
                          "px-2.5 py-1 rounded-md border text-[9px] font-space-grotesk uppercase tracking-wider transition-all duration-300 pointer-events-auto cursor-pointer flex items-center gap-1 select-none",
                          isSoundEnabled 
                            ? "border-[#C5FF3C]/30 bg-[#C5FF3C]/10 text-[#C5FF3C]" 
                            : "border-white/10 bg-transparent text-white/30 hover:text-white"
                        )}
                        title="Toggle mechanical keyboard click sound haptics"
                      >
                        {isSoundEnabled ? <IconVolume size={11} /> : <IconVolumeOff size={11} />}
                        <span>Haptics: {isSoundEnabled ? "ON" : "OFF"}</span>
                      </button>
                    </div>

                    {hoveredSkill ? (
                      <>
                        <h5 className="font-syne font-extrabold text-2xl uppercase tracking-tight text-white mt-1">
                          {hoveredSkill.label}
                        </h5>
                        <p className="font-space-grotesk text-[13px] leading-relaxed text-[#F5F0E8]/70 mt-1">
                          {hoveredSkill.desc}
                        </p>
                      </>
                    ) : (
                      <>
                        <h5 className="font-syne font-extrabold text-xl uppercase tracking-tight text-white/40 mt-1">
                          INTELLIGENCE_PAD
                        </h5>
                        <p className="font-space-grotesk text-[13px] leading-relaxed text-[#F5F0E8]/35 mt-1">
                          Hover over any mechanical keycap on the matrix to check connection status, detail telemetry, and platform documentation.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* 3D Keyboard Scene Wrapper */}
              <div className="w-full flex justify-center items-center py-10 overflow-visible">
                <div className="perspective-scene w-full max-w-2xl flex justify-center items-center overflow-visible">
                  <div className="isometric-grid grid grid-cols-4 gap-6 sm:gap-8 p-8 sm:p-12 bg-[#09090F]/80 border border-white/5 rounded-3xl transform-style-3d shadow-[0_30px_70px_rgba(0,0,0,0.85)]">
                    {skillsData.map((skill) => (
                      <Keycap
                        key={skill.label}
                        skill={skill}
                        onHoverStart={handleHoverStart}
                        onHoverEnd={handleHoverEnd}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  )
}

export default AboutSection;
