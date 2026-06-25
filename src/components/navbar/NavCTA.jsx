import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

/**
 * NavCTA is the main call-to-action button in the navigation bar.
 * @param {object} props
 * @param {string} [props.href] - Link path (defaults to '/contact').
 * @param {string} [props.label] - Label (defaults to "Let's Talk").
 * @param {string} [props.className] - Extra Tailwind styling.
 */
export function NavCTA({
  href = "https://calendly.com/shayanhanif50/30min",
  label = "Let's Talk",
  className,
  ...props
}) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 px-5 py-2 text-sm font-semibold text-zinc-950 shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_0_rgba(245,158,11,0.4)] focus:outline-none focus:ring-2 focus:ring-amber-500",
          className
        )}
        {...props}
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      to={href}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 px-5 py-2 text-sm font-semibold text-zinc-950 shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_0_rgba(245,158,11,0.4)] focus:outline-none focus:ring-2 focus:ring-amber-500",
        className
      )}
      {...props}
    >
      {label}
    </Link>
  )
}
