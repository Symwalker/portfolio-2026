import { HeroSection } from "@/components/hero/HeroSection"
import { FeaturedProjects } from "@/sections/FeaturedProjects"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { ContactSection } from "@/components/sections/ContactSection"

/**
 * Home is the landing page routing shell compiling all primary sections.
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
    </>
  )
}

