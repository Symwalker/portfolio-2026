import { motion, AnimatePresence } from "framer-motion"
import { NavLink } from "./NavLink"
import { NAV_LINKS } from "@/lib/constants"
import { NavCTA } from "./NavCTA"

/**
 * MobileNav renders the mobile-friendly navigation drawer.
 * @param {object} props
 * @param {boolean} props.isOpen - Visibility status of the drawer.
 * @param {Function} props.onClose - Drawer closure callback.
 */
export function MobileNav({
  isOpen,
  onClose
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-zinc-950/80 backdrop-blur-md md:hidden"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-[280px] border-l border-white/5 bg-zinc-950/95 p-6 shadow-2xl md:hidden"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between pb-8 border-b border-white/5">
                <span className="text-base font-bold tracking-tight text-white">
                  SHAYAN<span className="text-amber-400">.AI</span>
                </span>
                <button
                  onClick={onClose}
                  className="rounded-full p-1.5 text-zinc-400 hover:bg-white/5 hover:text-white"
                  aria-label="Close Menu"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col gap-6 mt-8">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    className="text-lg py-1"
                    onClick={onClose}
                  />
                ))}
              </nav>

              <div className="mt-auto pt-6 border-t border-white/5">
                <NavCTA
                  href="https://calendly.com/shayanhanif50/30min"
                  label="Let's Talk"
                  className="w-full text-center"
                  onClick={onClose}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
