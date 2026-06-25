import { cn } from "@/lib/utils"

/**
 * RotatedSquares renders subtle, geometric background square frames rotated to generate visual interest.
 * @param {object} props
 * @param {string} [props.className] - Additional classes.
 */
export function RotatedSquares({ className }) {
  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden pointer-events-none flex items-center justify-center", className)}>
      <div className="absolute h-[50vw] w-[50vw] rounded-[4rem] border border-white/[0.02] rotate-[45deg]" />
      <div className="absolute h-[65vw] w-[65vw] rounded-[6rem] border border-white/[0.01] rotate-[15deg]" />
    </div>
  )
}
