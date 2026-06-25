import { Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "@/components/navbar/navbar"
import { useLenis } from "@/hooks/useLenis"
import { AmbientLightings } from "@/components/decorations/AmbientLightings"
import { GridWorld } from "@/components/decorations/GridWorld"
import { RotatedSquares } from "@/components/decorations/RotatedSquares"
import { Footer } from "@/components/sections/Footer"



// Import Page Routing Shells
import Home from "@/pages/Home"
import Work from "@/pages/Work"
import Services from "@/pages/Services"
import About from "@/pages/About"
import Contact from "@/pages/Contact"

/**
 * App is the core application container, initializing smooth scrolling, backgrounds, and routes.
 */
export function App() {
  // Initialize Lenis smooth scroll
  useLenis()

  return (
    <BrowserRouter>


      {/* Decorative premium static visuals */}
      <AmbientLightings />
      <GridWorld />
      <RotatedSquares />

      {/* Navigation Layer */}
      <Navbar />

      {/* Routing Shell Entry */}
      <main className="relative z-10 text-white min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </main>
    </BrowserRouter>
  )
}

export default App
