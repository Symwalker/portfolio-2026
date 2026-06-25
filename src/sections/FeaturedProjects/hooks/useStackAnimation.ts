import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "../projects.data";

gsap.registerPlugin(ScrollTrigger);

interface UseStackAnimationProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  projects: Project[];
  isMobile: boolean;
  setActiveIndex: (index: number) => void;
  setScrollProgress: (progress: number) => void;
}

export const useStackAnimation = ({
  containerRef,
  cardRefs,
  projects,
  isMobile,
  setActiveIndex,
  setScrollProgress,
}: UseStackAnimationProps) => {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter((c): c is HTMLDivElement => c !== null);
      const totalCards = cards.length;

      const mm = gsap.matchMedia();

      // 1. DESKTOP STACKING CARDS TIMELINES (>= 768px)
      mm.add("(min-width: 768px)", () => {
        // Create ScrollTriggers for each card's cover depth effect (Scale + Dim + Blur)
        for (let i = 0; i < totalCards - 1; i++) {
          const cardCurrent = cards[i];
          const cardNext = cards[i + 1];
          const stickyTopOffset = 80 + (i + 1) * 18;

          gsap.fromTo(
            cardCurrent,
            {
              scale: 1,
              filter: "brightness(1) blur(0px)",
            },
            {
              scale: 0.94,
              filter: "brightness(0.5) blur(6px)",
              ease: "none",
              scrollTrigger: {
                trigger: cardNext,
                start: "top bottom", // Starts when next card enters viewport from bottom
                end: () => `top ${stickyTopOffset}px`, // Ends when next card hits its sticky top offset
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );

          // Animate first card's screenshot frame (index 0) if it exists
          if (i === 0) {
            const frame = cardCurrent.querySelector(".project-card-frame");
            if (frame) {
              gsap.fromTo(
                frame,
                {
                  transform: "perspective(900px) rotateY(-4deg) rotateX(2deg) scale(1.03)",
                },
                {
                  transform: "perspective(900px) rotateY(-10deg) rotateX(5deg) scale(1)",
                  ease: "none",
                  scrollTrigger: {
                    trigger: cardNext,
                    start: "top bottom",
                    end: () => `top ${stickyTopOffset}px`,
                    scrub: true,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }
          }

          // Animate second card's composed cover image (index 1) if it exists
          if (i === 1) {
            const coverImg = cardCurrent.querySelector(".project-contain-cover");
            if (coverImg) {
              gsap.fromTo(
                coverImg,
                {
                  transform: "scale(1.04) translateY(-6px)",
                },
                {
                  transform: "scale(1) translateY(0px)",
                  ease: "none",
                  scrollTrigger: {
                    trigger: cardNext,
                    start: "top bottom",
                    end: () => `top ${stickyTopOffset}px`,
                    scrub: true,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }
          }

          // Animate third card's SaaS browser frame (index 2) if it exists
          if (i === 2) {
            const saasFrame = cardCurrent.querySelector(".project-saas-frame");
            if (saasFrame) {
              gsap.fromTo(
                saasFrame,
                {
                  transform: "perspective(1000px) rotateY(-2deg) rotateX(1deg) scale(1.03) translateY(-6px)",
                },
                {
                  transform: "perspective(1000px) rotateY(-6deg) rotateX(3deg) scale(1) translateY(0px)",
                  ease: "none",
                  scrollTrigger: {
                    trigger: cardNext,
                    start: "top bottom",
                    end: () => `top ${stickyTopOffset}px`,
                    scrub: true,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }
          }

          // Animate fourth card's composed cover image (index 3) if it exists
          if (i === 3) {
            const coverImg = cardCurrent.querySelector(".project-contain-cover");
            if (coverImg) {
              gsap.fromTo(
                coverImg,
                {
                  transform: "scale(1.04) translateY(-6px)",
                },
                {
                  transform: "scale(1) translateY(0px)",
                  ease: "none",
                  scrollTrigger: {
                    trigger: cardNext,
                    start: "top bottom",
                    end: () => `top ${stickyTopOffset}px`,
                    scrub: true,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }

            // Animate fifth card's composed cover image (index 4) as it covers the fourth card (i === 3)
            const nextCoverImg = cardNext.querySelector(".project-contain-cover");
            if (nextCoverImg) {
              gsap.fromTo(
                nextCoverImg,
                {
                  transform: "scale(1) translateY(0px)",
                },
                {
                  transform: "scale(1.04) translateY(-6px)",
                  ease: "power1.out",
                  scrollTrigger: {
                    trigger: cardNext,
                    start: "top bottom",
                    end: () => `top ${stickyTopOffset}px`,
                    scrub: 0.4,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }
          }
        }

        // Master ScrollTrigger to track overall progress and active index
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            // Update horizontal progress bar (0 to 100)
            setScrollProgress(self.progress * 100);

            // Calculate active card index based on physical card positions relative to sticky top
            let active = 0;
            cards.forEach((card, idx) => {
              if (!card) return;
              const rect = card.getBoundingClientRect();
              const stickyTop = 80 + idx * 18;
              
              if (rect.top <= stickyTop + 10) {
                active = idx;
              }
            });

            setActiveIndex(active);
          },
        });
      });

      // 2. MOBILE SIMPLE FADE-UP LAYOUT (< 768px)
      mm.add("(max-width: 767px)", () => {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              y: 50,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%", // Triggers when the top of the card enters 88% of viewport
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // Reset progress defaults for mobile
        setScrollProgress(0);
        setActiveIndex(0);
      });
    }, container);

    // Refresh scroll triggers after document fonts are loaded to avoid layout jumps
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);
    document.fonts?.ready?.then(handleLoad);

    return () => {
      ctx.revert();
      window.removeEventListener("load", handleLoad);
    };
  }, [containerRef, cardRefs, projects, isMobile, setActiveIndex, setScrollProgress]);
};
