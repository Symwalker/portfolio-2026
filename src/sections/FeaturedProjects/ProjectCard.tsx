import React, { useState } from "react";
import { Project } from "./projects.data";
import { IconArrowUpRight } from "@tabler/icons-react";

interface BrowserFrameProps {
  src: string;
  index: number;
}

const BrowserFrame: React.FC<BrowserFrameProps> = ({ src, index }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null;
  }

  return (
    <>
      {index === 0 && <link rel="preload" href={src} as="image" />}
      <div
        className="project-card-frame w-full h-full max-h-[85%] rounded-[10px] border border-white/12 bg-[#121216] shadow-[0_20px_40px_-16px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col"
        style={{
          transform: "perspective(900px) rotateY(-10deg) rotateX(5deg)",
          transformOrigin: "center",
          willChange: "transform",
        }}
      >
        {/* Chrome Top Bar */}
        <div className="h-[22px] bg-[#1a1a24] border-b border-white/5 px-3 flex items-center gap-1.5 shrink-0 select-none">
          <span className="w-2 h-2 rounded-full bg-[#ef4444]/80" />
          <span className="w-2 h-2 rounded-full bg-[#eab308]/80" />
          <span className="w-2 h-2 rounded-full bg-[#22c55e]/80" />
        </div>
        {/* Screenshot Image */}
        <div className="flex-1 w-full overflow-hidden bg-zinc-950">
          <img
            src={src}
            alt="Project Screenshot"
            loading="lazy"
            decoding="async"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover object-left-top"
          />
        </div>
      </div>
    </>
  );
};

interface ContainCoverProps {
  src: string;
  index: number;
}

const ContainCover: React.FC<ContainCoverProps> = ({ src, index }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null;
  }

  return (
    <>
      {index === 0 && <link rel="preload" href={src} as="image" />}
      <img
        src={src}
        alt="Project Composed Cover"
        loading="lazy"
        decoding="async"
        onError={() => setHasError(true)}
        className="project-contain-cover w-full h-full object-contain object-center animate-gpu"
        style={{
          willChange: "transform",
        }}
      />
    </>
  );
};

const SaasBrowserFrame: React.FC<{ src: string; accent: string }> = ({ src, accent }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null;
  }

  return (
    <div
      className="project-saas-frame w-full h-full max-h-[85%] rounded-[10px] border border-white/12 bg-[#121216] shadow-[0_20px_40px_-16px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col relative"
      style={{
        transform: "perspective(1000px) rotateY(-6deg) rotateX(3deg)",
        transformOrigin: "center",
        willChange: "transform",
      }}
    >
      {/* Chrome Top Bar */}
      <div className="h-[22px] bg-[#1a1a24] border-b border-white/5 px-3 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#ef4444]/80" />
          <span className="w-2 h-2 rounded-full bg-[#eab308]/80" />
          <span className="w-2 h-2 rounded-full bg-[#22c55e]/80" />
        </div>
        {/* URL Pill */}
        <div className="w-[45%] h-[12px] bg-white/5 border border-white/8 rounded-[4px] text-[7px] text-white/30 flex items-center justify-center font-space-grotesk tracking-wide lowercase">
          kloudboard.com
        </div>
        <div className="w-[30px]" />
      </div>

      {/* Screenshot Container */}
      <div className="flex-1 w-full overflow-hidden bg-zinc-950 relative">
        <img
          src={src}
          alt="Saas Screenshot"
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover object-top"
        />
        
        {/* Bottom Fade Gradient Overlay */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, ${accent} 100%)`,
          }}
        />
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  isMobile: boolean;
}

export const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project, index, isMobile }, ref) => {
    // Calculate sticky top offset (e.g. Card 0 = 80px, Card 1 = 98px, Card 2 = 116px...)
    const topOffset = isMobile ? "0px" : `${80 + index * 18}px`;
    const zIndex = index + 1;

    return (
      <div
        ref={ref}
        data-index={index}
        className="project-card relative flex flex-col md:flex-row w-full h-[68vh] md:h-[78vh] rounded-[18px] overflow-hidden shadow-[0_24px_50px_-20px_rgba(0,0,0,0.6)] border border-white/8 select-none"
        style={{
          position: isMobile ? "relative" : "sticky",
          top: topOffset,
          zIndex: zIndex,
          transformOrigin: "center top",
          willChange: "transform, filter",
          marginBottom: isMobile ? "24px" : "28vh", // Spacer drives scroll pacing
        }}
      >
        {/* ── Left Column: Magazine Cover ── */}
        <div
          className="relative w-full md:w-[44%] h-[24vh] md:h-full overflow-hidden flex flex-col justify-between p-8 md:p-12"
          style={{
            background: project.id === "menu-ocr"
              ? `radial-gradient(circle at center, rgba(124, 58, 237, 0.12) 0%, ${project.accent} 70%)`
              : `linear-gradient(135deg, ${project.accent}ee 0%, ${project.accent}88 100%)`,
          }}
        >
          {/* Faint Huge Index Number (Magazine Style) */}
          <span className={`absolute top-[-30px] left-[-20px] font-display text-[12rem] sm:text-[18rem] md:text-[22rem] font-black select-none leading-none tracking-tight z-0 ${project.coverFit === "contain" ? (project.accent === "#ffffff" ? "text-black/[0.02]" : "text-white/[0.02]") : project.coverFit === "cover" && index === 2 ? "text-white/[0.02]" : "text-white/5"}`}>
            {project.index}
          </span>
          
          {project.cover ? (
            <>
              {project.coverFit === "contain" ? (
                // Composed Contain Cover (Card 2 & Card 4)
                <div className="absolute inset-0 p-3.5 md:p-4 z-10 flex items-center justify-center overflow-hidden">
                  <ContainCover src={project.cover} index={index} />
                </div>
              ) : index === 2 ? (
                // SaaS Browser Frame Cover with Bottom Fade (Card 3)
                <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8 z-10 pointer-events-none">
                  <SaasBrowserFrame src={project.cover} accent={project.accent} />
                </div>
              ) : (
                // Browser Frame Cover (Card 1)
                <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8 z-10 pointer-events-none">
                  <BrowserFrame src={project.cover} index={index} />
                </div>
              )}

              {/* Title overlay at the bottom */}
              <div className="relative z-20 mt-auto">
                <span className={`font-space-grotesk text-[10px] tracking-[2.5px] uppercase font-bold mb-2 block ${project.accent === "#ffffff" ? "text-neutral-500" : "text-white/60"}`}>
                  Case study
                </span>
                <h4 className={`font-syne font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight uppercase tracking-tight ${project.accent === "#ffffff" ? "text-neutral-900" : "text-white"}`}>
                  {project.title.split(' ')[0]}
                </h4>
              </div>
            </>
          ) : (
            <div className="relative z-20 mt-auto">
              <span className={`font-space-grotesk text-[10px] tracking-[2.5px] uppercase font-bold mb-2 block ${project.accent === "#ffffff" ? "text-neutral-500" : "text-white/60"}`}>
                Case study
              </span>
              <h4 className={`font-syne font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight uppercase tracking-tight ${project.accent === "#ffffff" ? "text-neutral-900" : "text-white"}`}>
                {project.title.split(' ')[0]}
              </h4>
            </div>
          )}
        </div>

        {/* ── Right Column: Dark Panel ── */}
        <div className="w-full md:w-[56%] h-full bg-[#141416] p-8 md:p-12 flex flex-col justify-between text-left">
          <div className="flex flex-col gap-6">
            {/* Header section */}
            <div>
              <span className="font-space-grotesk text-[10px] sm:text-xs font-bold border border-white/10 text-white/40 px-3 py-1 rounded-full w-fit block mb-4 uppercase tracking-wider">
                Project {project.index}
              </span>
              <h3 className="font-syne font-extrabold text-2xl sm:text-3xl md:text-5xl text-white uppercase leading-none tracking-tight">
                {project.title}
              </h3>
            </div>

            {/* Meta Row: Client • Year */}
            <div className="flex items-center gap-2 text-white/40 font-space-grotesk text-xs sm:text-sm border-b border-white/5 pb-4">
              <span className="font-semibold text-white/60">{project.client}</span>
              <span>•</span>
              <span>{project.year}</span>
            </div>

            {/* Role detail */}
            <div className="flex flex-col gap-1">
              <span className="font-space-grotesk text-[10px] text-white/30 uppercase tracking-widest">
                My role
              </span>
              <p className="font-dm-sans font-light text-white/80 text-sm sm:text-base leading-relaxed">
                {project.role}
              </p>
            </div>

            {/* Stack Tags */}
            <div className="flex flex-col gap-2 pt-2">
              <span className="font-space-grotesk text-[10px] text-white/30 uppercase tracking-widest">
                Technologies
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/8 text-[10px] font-space-grotesk text-white/70 tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-8 md:mt-0 select-none">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full border text-xs font-space-grotesk font-semibold uppercase tracking-wider transition-all duration-300 hover:text-[#141416] cursor-pointer"
              style={{
                borderColor: `${project.accent}60`,
                color: project.accent,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = project.accent;
                e.currentTarget.style.color = "#141416";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = project.accent;
              }}
            >
              View project <IconArrowUpRight size={13} stroke={2.5} />
            </a>
          </div>
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";
export default ProjectCard;
