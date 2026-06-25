import React from "react";

interface ProjectProgressProps {
  activeIndex: number;
  total: number;
  scrollProgress: number; // 0 to 100 representing percentage
}

export const ProjectProgress: React.FC<ProjectProgressProps> = ({
  activeIndex,
  total,
  scrollProgress,
}) => {
  const currentNum = String(activeIndex + 1).padStart(2, "0");
  const totalNum = String(total).padStart(2, "0");

  return (
    <div className="sticky top-0 left-0 right-0 w-full z-40 bg-[#0a0a0b]/80 backdrop-blur-md border-b border-white/5 py-4">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col gap-2">
        <div className="flex justify-between items-center w-full">
          <span className="font-space-grotesk text-xs sm:text-sm tracking-wider text-[#C5FF3C] uppercase font-bold">
            Featured work
          </span>
          <span className="font-space-grotesk text-xs sm:text-sm font-bold text-white tracking-widest tabular-nums">
            {currentNum} / {totalNum}
          </span>
        </div>
        {/* 2px progress bar background */}
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C5FF3C] transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectProgress;
