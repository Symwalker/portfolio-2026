import React, { useState, useEffect, useRef } from "react";
import { projects } from "./projects.data";
import ProjectCard from "./ProjectCard";
import ProjectProgress from "./ProjectProgress";
import { useStackAnimation } from "./hooks/useStackAnimation";

export const FeaturedProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize cardRefs array size
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, projects.length);
  }, []);

  // Monitor screen width to set mobile flag for layout styling
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize GSAP scroll animations
  useStackAnimation({
    containerRef,
    cardRefs,
    projects,
    isMobile,
    setActiveIndex,
    setScrollProgress,
  });

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative w-full bg-[#0a0a0b] py-16 flex flex-col items-center select-none"
    >
      {/* ── 1. STICKY PROGRESS INDICATOR ── */}
      <ProjectProgress
        activeIndex={activeIndex}
        total={projects.length}
        scrollProgress={scrollProgress}
      />

      {/* ── 2. CARDS STACK TRACK ── */}
      {/* All cards are direct siblings in one parent container for perfect sticky stacking */}
      <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center mt-12 px-6 md:px-12">
        {projects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            project={project}
            index={idx}
            isMobile={isMobile}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
