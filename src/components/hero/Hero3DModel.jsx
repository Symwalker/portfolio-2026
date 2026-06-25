import { cn } from "@/lib/utils"

/**
 * Hero3DModel renders a giant faded text overlay behind the hero section to establish scale and theme.
 * @param {object} props
 * @param {string} [props.className] - Extra Tailwind classes.
 */
export function Hero3DModel({ className }) {
  return (
    <div
      className={cn(
        "absolute -right-[5%] top-[15%] -z-10 select-none font-extrabold text-white/[0.015] text-[18vw] uppercase leading-none tracking-tighter filter blur-[1.5px]",
        className
      )}
    >
      SHAYAN
    </div>
  )
}
