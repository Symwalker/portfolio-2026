import { cn } from "@/lib/utils"

/**
 * SectionLabel renders a styled, premium badge labeled with a small pulse dot.
 * Typically used at the top of a page section.
 * @param {object} props
 * @param {string} props.text - The text to display in the label.
 * @param {string} [props.className] - Extra Tailwind classes.
 */
export function SectionLabel({ text, className }) {
  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-amber-400 backdrop-blur-md", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
      {text}
    </div>
  )
}
