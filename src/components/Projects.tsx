"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const CARD_STEP = 514; // 450px card + 64px gap

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) return;

    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const scrollWidth = track.scrollWidth;
    const windowWidth = window.innerWidth;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.to(track, {
        x: () => -(scrollWidth - windowWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth - windowWidth}`,
          scrub: 1.2,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
        },
      });
    });

    return () => mm.revert();
  }, [reduced]);

  const scrollNext = useCallback(() => {
    if (window.innerWidth >= 768) {
      window.scrollBy({ top: CARD_STEP, behavior: "smooth" });
    } else {
      mobileScrollRef.current?.scrollBy({ left: CARD_STEP, behavior: "smooth" });
    }
  }, []);

  const scrollPrev = useCallback(() => {
    if (window.innerWidth >= 768) {
      window.scrollBy({ top: -CARD_STEP, behavior: "smooth" });
    } else {
      mobileScrollRef.current?.scrollBy({ left: -CARD_STEP, behavior: "smooth" });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projets"
      className="project-strip-section md:overflow-hidden bg-black py-32 text-white"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-8 mb-20 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-[family-name:var(--font-syne)] text-8xl uppercase tracking-tighter text-accent">
            PROJETS
          </h2>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <p className="max-w-sm font-mono text-sm leading-relaxed opacity-60 md:text-right">
            UNE SÉLECTION D&apos;EXPÉRIENCES RÉCENTES — DU SITE VITRINE AUX PIPELINES IA MULTI-AGENTS.
          </p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">naviguer</span>
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Projet précédent"
              className="brutal-border flex h-10 w-10 items-center justify-center border-white/40 text-white transition-all hover:border-white hover:bg-white hover:text-black"
            >
              ←
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Projet suivant"
              className="brutal-border flex h-10 w-10 items-center justify-center border-white/40 bg-white text-black transition-all hover:bg-accent hover:border-accent"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Mobile scroll wrapper */}
      <div ref={mobileScrollRef} className="overflow-x-auto md:overflow-visible w-full scroll-smooth">
        <div ref={trackRef} className="project-track flex w-max gap-16 px-16">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group flex w-[450px] flex-col gap-4"
              data-cursor="hover"
            >
              <div className="number-container brutal-border relative flex aspect-[16/10] items-center justify-center overflow-hidden border-white bg-[#1a1a1a] transition-all duration-500 group-hover:border-accent group-hover:bg-accent">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-80"
                  />
                ) : null}
                <span className="number-text relative font-[family-name:var(--font-syne)] px-5 text-center text-6xl uppercase opacity-10 transition-all duration-500 group-hover:scale-110 group-hover:text-black group-hover:opacity-100">
                  {project.title}
                </span>
              </div>
              <div className="flex flex-col gap-1 px-2">
                <h3 className="font-[family-name:var(--font-syne)] text-2xl uppercase tracking-tighter text-accent">
                  {project.client}
                </h3>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-40">
                  {project.stack}
                </span>
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 w-fit font-mono text-[10px] font-bold uppercase tracking-widest text-accent underline underline-offset-4 opacity-70 hover:opacity-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Voir le site →
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar — desktop only */}
      <div className="hidden md:block mx-16 mt-10 h-[2px] bg-white/10">
        <div
          className="h-full bg-accent transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </section>
  );
}
