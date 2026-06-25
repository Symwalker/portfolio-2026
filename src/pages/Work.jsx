import { FeaturedProjects } from "@/sections/FeaturedProjects"

/**
 * Work page routing shell.
 * Renders the FeaturedProjects full screen for perfect scroll pinning alignments.
 */
export default function Work() {
  return (
    <div className="w-full min-h-screen">
      <FeaturedProjects />
    </div>
  )
}

