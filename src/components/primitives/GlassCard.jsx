import { cn } from "@/lib/utils"

/**
 * GlassCard renders a premium glassmorphic card container.
 * @param {object} props
 * @param {React.ReactNode} props.children - Content to place inside the card.
 * @param {string} [props.className] - Extra Tailwind styling.
 * @param {boolean} [props.hoverEffect] - Toggles the card's reactive hover style.
 */
export function GlassCard({
  children,
  className,
  hoverEffect = true
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/5 bg-zinc-950/40 p-6 backdrop-blur-xl transition-all duration-300",
        hoverEffect && "hover:border-amber-500/20 hover:bg-zinc-950/60 hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.1)]",
        className
      )}
    >
      {children}
    </div>
  )
}
