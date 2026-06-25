import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { IconArrowUpRight, IconMenu2, IconX } from "@tabler/icons-react"
import { Magnetic } from "@/components/ui/Magnetic"

/**
 * Navbar renders the global header as a premium floating capsule.
 */
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const links = [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ]

  return (
    <>
      <motion.header
        initial={{ y: -50, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ left: "50%" }}
        className="fixed top-3 sm:top-6 z-50 w-[94vw] sm:w-[90vw] max-w-5xl pointer-events-none"
      >
        {/* Floating Capsule */}
        <div
          className="relative w-full rounded-full flex items-center justify-between px-4 py-2 sm:px-6 sm:py-2.5 border border-white/8 bg-[#09090F]/65 backdrop-blur-xl backdrop-saturate-180 shadow-[0_10px_30px_rgba(0,0,0,0.5)] pointer-events-auto"
        >
          {/* Left: Wordmark */}
          <Link to="/" className="flex items-center font-syne font-bold text-[11px] xs:text-[13px] tracking-[1px] uppercase">
            <span className="text-[#F5F0E8]">shayan</span>
            <span className="text-[#C5FF3C]">.builds.ai</span>
          </Link>

          {/* Center: Nav links (Desktop) */}
          <nav className="hidden md:flex items-center gap-4">
            {links.map((link, idx) => {
              const isActive = location.pathname === link.href
              return (
                <div key={link.href} className="flex items-center gap-4">
                  <Link
                    to={link.href}
                    className="relative group overflow-hidden block h-[18px] tracking-wide pointer-events-auto"
                  >
                    {/* Sliding container */}
                    <div className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
                      {/* Normal state text */}
                      <span className={cn(
                        "font-space-grotesk text-[13px] h-[18px] flex items-center uppercase transition-colors duration-200",
                        isActive ? "text-[#C5FF3C] font-semibold" : "text-[#F5F0E8]/50 group-hover:text-[#C5FF3C]"
                      )}>
                        {link.label}
                      </span>
                      {/* Active/Hover state text (slides in from bottom) */}
                      <span className="font-space-grotesk text-[13px] font-semibold text-[#C5FF3C] h-[18px] flex items-center uppercase">
                        {link.label}
                      </span>
                    </div>
                  </Link>
                  {idx < links.length - 1 && (
                    <span className="text-[#F5F0E8]/20 text-[10px] select-none pointer-events-none">·</span>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Right: CTA button + Mobile toggle */}
          <div className="flex items-center gap-4">
            <Magnetic>
              <a
                href="https://calendly.com/shayanhanif50/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#C5FF3C] text-[#09090F] font-space-grotesk font-semibold text-[12px] uppercase tracking-wide transition-all duration-300 hover:opacity-90 hover:scale-[1.02] shadow-[0_4px_12px_rgba(197,255,60,0.2)]"
              >
                Let's Talk <IconArrowUpRight size={13} stroke={2.5} />
              </a>
            </Magnetic>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <IconX size={16} /> : <IconMenu2 size={16} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-zinc-950/80 backdrop-blur-md md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-[280px] border-l border-white/5 bg-[#09090F]/95 p-6 shadow-2xl md:hidden"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between pb-6 border-b border-white/5">
                  <span className="font-syne font-bold text-[13px] tracking-[1px] uppercase text-[#F5F0E8]">
                    shayan<span className="text-[#C5FF3C]">.builds.ai</span>
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-full p-1.5 text-zinc-400 hover:bg-white/5 hover:text-white"
                  >
                    <IconX size={18} />
                  </button>
                </div>

                <nav className="flex flex-col gap-6 mt-8">
                  {links.map((link) => {
                    const isActive = location.pathname === link.href
                    return (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "font-space-grotesk text-[15px] uppercase tracking-wide py-1",
                          isActive ? "text-[#C9A84C]" : "text-[#F5F0E8]/60 hover:text-[#F5F0E8]"
                        )}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </nav>

                <div className="mt-auto pt-6 border-t border-white/5">
                  <a
                    href="https://calendly.com/shayanhanif50/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-1 px-5 py-3 rounded-lg bg-[#C5FF3C] text-[#09090F] font-space-grotesk font-semibold text-[13px] uppercase tracking-wider transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
                  >
                    Let's Talk <IconArrowUpRight size={14} stroke={2.5} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
