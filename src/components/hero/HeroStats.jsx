import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useCountUp } from "@/hooks/useCountUp"

function StatItem({ value, label, suffix, isLime }) {
  const displayCount = useCountUp(value, 1.5)

  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1.5">
      <div className="flex items-center">
        <span className={cn("font-syne font-extrabold text-[16px] sm:text-[18px] leading-none", isLime ? "text-[#C5FF3C]" : "text-[#F5F0E8]")}>
          {displayCount}
        </span>
        <span className={cn("font-syne font-extrabold text-[16px] sm:text-[18px] leading-none ml-0.5", isLime ? "text-[#C5FF3C]" : "text-[#F5F0E8]/70")}>
          {suffix}
        </span>
      </div>
      <span className="font-space-grotesk font-light text-[8px] sm:text-[9px] tracking-[1px] text-[#F5F0E8]/30 uppercase whitespace-nowrap">
        {label}
      </span>
    </div>
  )
}

/**
 * HeroStats displays a bottom stats board and a scroll indicator.
 * @param {object} props
 * @param {boolean} props.isVideoFinished - True if the introductory video has finished playing.
 */
export function HeroStats({ isVideoFinished }) {
  const stats = [
    { value: 3, label: "YEARS EXP", suffix: "+" },
    { value: 20, label: "PROJECTS", suffix: "+" },
    { value: 10, label: "CLIENTS", suffix: "+" },
    { value: 5, label: "RATING", suffix: "★", isLime: true }
  ]

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      className="absolute bottom-0 left-0 right-0 z-40 bg-[#09090F]/85 border-t border-white/6 px-6 md:px-16 lg:px-24 py-4.5 flex items-center justify-between pointer-events-auto"
    >
      {/* Left: Scroll Down Indicator */}
      <div className="flex items-center gap-3">
        {/* Capsule Mouse Outline */}
        <div
          className={cn(
            "w-[18px] h-[28px] rounded-full border-1.5 flex justify-center p-0.5 transition-all duration-500",
            isVideoFinished
              ? "border-[#C5FF3C] bg-[#C5FF3C]/10 shadow-[0_0_12px_rgba(197,255,60,0.4)]"
              : "border-[#C5FF3C]/30 bg-transparent"
          )}
        >
          {/* Moving Dot */}
          <motion.div
            animate={{
              y: [0, 8, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1.5 h-1.5 rounded-full bg-[#C5FF3C]"
          />
        </div>
        <span className="font-space-grotesk text-[9px] tracking-[2px] uppercase text-[#C5FF3C] font-medium">
          Scroll down
        </span>
      </div>

      {/* Right: Stats separated by vertical dividers */}
      <div className="flex items-center gap-3.5 sm:gap-6 md:gap-8">
        {stats.map((stat, idx) => (
          <React.Fragment key={idx}>
            <StatItem
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              isLime={stat.isLime}
            />
            {idx < stats.length - 1 && (
              <div className="w-[0.5px] h-3.5 bg-white/8 select-none pointer-events-none" />
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  )
}

export default HeroStats
