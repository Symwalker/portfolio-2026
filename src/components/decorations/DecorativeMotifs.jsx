import React from "react"
import { cn } from "@/lib/utils"

/**
 * DecorativeMotifs renders premium, static SVG background decorations.
 * It is positioned above the video overlay but below the content layer.
 * @param {object} props
 * @param {string} [props.className] - Additional CSS class names.
 */
export function DecorativeMotifs({ className }) {
  return (
    <div className={cn("absolute inset-0 z-15 pointer-events-none overflow-hidden select-none", className)}>
      {/* Top-Right: Three concentric circles */}
      <svg
        className="absolute top-0 right-0 w-[400px] h-[400px] translate-x-1/4 -translate-y-1/4"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="300" cy="100" r="140" stroke="rgba(197, 255, 60, 0.08)" strokeWidth="1" />
        <circle cx="300" cy="100" r="90" stroke="rgba(197, 255, 60, 0.12)" strokeWidth="1" />
        <circle cx="300" cy="100" r="40" stroke="rgba(197, 255, 60, 0.2)" strokeWidth="1" />
      </svg>

      {/* Bottom-Left: 5x3 Dot Grid (with fading opacity from left to right) */}
      <div className="absolute bottom-24 left-12 flex flex-col gap-3">
        {[...Array(3)].map((_, rIndex) => (
          <div key={rIndex} className="flex gap-4">
            {[...Array(5)].map((_, cIndex) => {
              // opacity fades from left (cIndex = 0) to right (cIndex = 4)
              const opacities = [0.4, 0.28, 0.18, 0.1, 0.04];
              return (
                <div
                  key={cIndex}
                  className="w-[3px] h-[3px] rounded-full bg-brand-lime"
                  style={{ opacity: opacities[cIndex] }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom-Center Area: Two rotated square outlines */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center justify-center">
        <div 
          className="absolute w-[180px] h-[180px] border border-brand-cream/6 rounded-2xl rotate-12 transition-transform duration-1000 hover:rotate-45"
          style={{ opacity: 0.06 }} 
        />
        <div 
          className="absolute w-[140px] h-[140px] border border-brand-cream/8 rounded-xl -rotate-12 transition-transform duration-1000 hover:-rotate-45"
          style={{ opacity: 0.08 }} 
        />
      </div>
    </div>
  )
}

export default DecorativeMotifs
