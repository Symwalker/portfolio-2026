import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Magnetic } from "@/components/ui/Magnetic"
import { 
  IconBrandFacebook, 
  IconBrandInstagram, 
  IconBrandLinkedin, 
  IconBrandBehance, 
  IconBrandTwitter, 
  IconCalendar,
  IconCheck
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"

/**
 * ContactSection renders a visual split dashboard card:
 * - Left Panel: Vibrant Lime Green gradient with developer avatar, details, and socials.
 * - Right Panel: Dark form panel with interactive selectable interest tags and underline inputs.
 */
export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })
  const [selectedServices, setSelectedServices] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // Service options list
  const servicesOptions = [
    "UI/UX Design",
    "Website",
    "Brand Identity",
    "Content Production",
    "Illustration",
    "Other"
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service))
    } else {
      setSelectedServices([...selectedServices, service])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      services: selectedServices.join(", ")
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/shayanhanif50@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: "", email: "", phone: "", message: "" })
        setSelectedServices([])
        setTimeout(() => {
          setSubmitted(false)
        }, 5000) // Reset back to form after 5 seconds
      } else {
        const errData = await response.json()
        setSubmitError(errData.message || "Submission failed. Please try again.")
      }
    } catch (err) {
      setSubmitError("Network error. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    { name: "Facebook", icon: <IconBrandFacebook size={18} />, url: "https://facebook.com" },
    { name: "Instagram", icon: <IconBrandInstagram size={18} />, url: "https://www.instagram.com/shayan.builds.ai/" },
    { name: "LinkedIn", icon: <IconBrandLinkedin size={18} />, url: "https://www.linkedin.com/in/shayan-hanif-developer/" },
    { name: "Behance", icon: <IconBrandBehance size={18} />, url: "https://behance.net" },
    { name: "Twitter", icon: <IconBrandTwitter size={18} />, url: "https://twitter.com" },
  ]

  return (
    <section id="contact" className="relative py-20 bg-[#09090F] border-t border-white/5 overflow-hidden">
      
      {/* Background glow shadow */}
      <div className="absolute left-1/4 bottom-0 w-[300px] h-[300px] rounded-full bg-[#C5FF3C]/2 blur-[90px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        
        {/* Unified Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] rounded-3xl border border-white/5 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.85)] min-h-[500px]">
          
          {/* ── LEFT PANEL: LIME GREEN GRADIENT PANEL ── */}
          <div className="bg-gradient-to-br from-[#C5FF3C] via-[#D4FF70] to-[#E3EBD3] p-8 flex flex-col justify-between text-[#09090F] text-left relative min-h-[350px] lg:min-h-none">
            
            {/* Top row: Avatar & details */}
            <div className="flex flex-col gap-6 items-start w-full">
              
              {/* Row with Avatar & Quick Action Pills */}
              <div className="flex items-start justify-between w-full gap-4">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full overflow-hidden border border-[#09090F]/10 shadow-md shrink-0">
                  <img 
                    src="/images/head-shot/head-shot.png" 
                    alt="Shayan" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Quick Action Pills */}
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2">
                  <a 
                    href="mailto:shayanhanif50@gmail.com" 
                    className="px-4 py-2 rounded-lg bg-[#09090F] text-[#C5FF3C] font-space-grotesk text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center shadow-md select-none"
                  >
                    shayanhanif50@gmail.com
                  </a>
                  <div className="px-4 py-2 rounded-lg border border-[#09090F] bg-transparent text-[#09090F] font-space-grotesk text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider flex items-center justify-center select-none">
                    Send Message
                  </div>
                </div>
              </div>

              {/* Bio Detail Text */}
              <p className="font-space-grotesk font-semibold text-base sm:text-lg md:text-xl leading-relaxed text-[#09090F]/80 max-w-xl mt-4">
                Shayan - AI Engineer & Product Manager, can guide your project's initial steps.
              </p>
            </div>

            {/* Bottom row: Giant heading & Socials */}
            <div className="flex flex-col gap-6 items-start w-full mt-10 lg:mt-0">
              <h2 className="font-syne font-extrabold text-[36px] sm:text-[44px] md:text-[48px] uppercase leading-[1.1] tracking-tight text-[#09090F]">
                Every project starts with a plan.
              </h2>

              {/* Social Icon Pills */}
              <div className="flex gap-2.5">
                {socialLinks.map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#09090F] text-white hover:text-[#C5FF3C] hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-md"
                    title={soc.name}
                  >
                    {soc.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT PANEL: DARK COLLABORATION FORM ── */}
          <div className="bg-[#0C0C14] p-8 flex flex-col justify-center text-left text-white min-h-[420px] lg:min-h-none">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center gap-4 py-12"
              >
                <div className="w-16 h-16 rounded-full bg-[#C5FF3C]/10 border border-[#C5FF3C]/30 flex items-center justify-center text-[#C5FF3C] mb-4">
                  <IconCheck size={32} stroke={2.5} />
                </div>
                <h4 className="font-syne font-extrabold text-3xl uppercase tracking-tight text-white">
                  Message Transmitted!
                </h4>
                <p className="font-space-grotesk text-base text-[#F5F0E8]/60 max-w-md leading-relaxed">
                  Thank you. Shayan will review your details and contact you shortly regarding your selected services.
                </p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col gap-5"
              >
                
                {/* Heading */}
                <div>
                  <h3 className="font-syne text-[26px] sm:text-[32px] font-extrabold uppercase leading-tight tracking-tight text-white">
                    What services <span className="text-white/40">we can support you with?</span>
                  </h3>
                </div>

                {/* Service Selectable Interest Pills */}
                <div className="flex flex-col gap-2.5">
                  <span className="font-space-grotesk text-xs tracking-wider uppercase text-white/50 font-bold">
                    I'm interested in
                  </span>
                  <div className="flex flex-wrap gap-2.5 mt-1">
                    {servicesOptions.map((service) => {
                      const isSelected = selectedServices.includes(service)
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={cn(
                            "px-5 py-2 rounded-full border text-xs sm:text-sm font-space-grotesk tracking-wide transition-all duration-300 hover:scale-105 select-none cursor-pointer",
                            isSelected 
                              ? "bg-[#C5FF3C] border-[#C5FF3C] text-[#09090F] font-bold shadow-[0_4px_15px_rgba(197,255,60,0.25)]" 
                              : "border-white/10 bg-transparent text-white/70 hover:border-white/40 hover:text-white"
                          )}
                        >
                          {service}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Underline Input Fields */}
                <div className="flex flex-col gap-4 mt-1">
                  
                  {/* Name Input */}
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-[11px] uppercase font-bold tracking-wider text-white/40 font-space-grotesk">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-white/15 py-1.5 text-sm text-white focus:border-[#C5FF3C] focus:outline-none transition-colors duration-300"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-[11px] uppercase font-bold tracking-wider text-white/40 font-space-grotesk">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-white/15 py-1.5 text-sm text-white focus:border-[#C5FF3C] focus:outline-none transition-colors duration-300"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-[11px] uppercase font-bold tracking-wider text-white/40 font-space-grotesk">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/15 py-1.5 text-sm text-white focus:border-[#C5FF3C] focus:outline-none transition-colors duration-300"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-[11px] uppercase font-bold tracking-wider text-white/40 font-space-grotesk">
                      Message
                    </label>
                    <input
                      type="text"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-white/15 py-1.5 text-sm text-white focus:border-[#C5FF3C] focus:outline-none transition-colors duration-300"
                    />
                  </div>

                </div>

                {/* Submit Button */}
                <Magnetic className="w-full">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#C5FF3C] text-[#09090F] font-space-grotesk font-extrabold text-sm uppercase tracking-wider rounded-xl hover:bg-[#D4FF70] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_4px_25px_rgba(197,255,60,0.35)] cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Submit"}
                  </button>
                </Magnetic>

                {submitError && (
                  <p className="text-red-500 font-space-grotesk text-xs mt-1 text-center">
                    {submitError}
                  </p>
                )}

              </motion.form>
            )}
          </div>

        </div>

      </div>

    </section>
  )
}

export default ContactSection;
