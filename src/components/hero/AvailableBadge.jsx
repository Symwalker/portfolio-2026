import { cn } from "@/lib/utils"

/**
 * AvailableBadge displays a small, premium status badge with a green pulsing indicator.
 * @param {object} props
 * @param {string} [props.text] - Badge label.
 * @param {string} [props.className] - Extra Tailwind styling.
 */
export function AvailableBadge({
  text = "Available for new opportunities",
  className
}) {
  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-medium tracking-wide text-emerald-400 backdrop-blur-md", className)}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      {text}
    </div>
  )
}
