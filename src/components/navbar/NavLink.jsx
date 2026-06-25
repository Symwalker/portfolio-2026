import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

/**
 * NavLink renders a styled navigation link that highlights when active.
 * @param {object} props
 * @param {string} props.href - Target path.
 * @param {string} props.label - Nav label.
 * @param {string} [props.className] - Extra Tailwind classes.
 * @param {Function} [props.onClick] - Optional click handler.
 */
export function NavLink({
  href,
  label,
  className,
  onClick
}) {
  const location = useLocation()
  const isActive = location.pathname === href

  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "relative py-1 text-sm font-medium transition-colors duration-200",
        isActive ? "text-amber-400" : "text-zinc-400 hover:text-zinc-100",
        className
      )}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-[1.5px] rounded-full bg-amber-400" />
      )}
    </Link>
  )
}
