import { cn } from "@/lib/utils"

/**
 * GradientText renders text styled with a premium background gradient clipped to text.
 * @param {object} props
 * @param {React.ReactNode} props.children - The text content to display.
 * @param {string} [props.className] - Additional classes to merge.
 * @param {string} [props.gradient] - Tailwind gradient color classes.
 */
export function GradientText({
  children,
  className,
  gradient = "from-amber-200 via-yellow-400 to-amber-500"
}) {
  return (
    <span className={cn("bg-gradient-to-r bg-clip-text text-transparent", gradient, className)}>
      {children}
    </span>
  )
}
