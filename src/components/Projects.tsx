"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

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
        },
      });
    });

    return () => mm.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="projets"
      className="project-strip-section overflow-hidden bg-black py-32 text-white"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-8 mb-20 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-[family-name:var(--font-syne)] text-8xl uppercase tracking-tighter text-accent">
            PROJETS
          </h2>
        </div>
        <p className="max-w-sm font-mono text-sm leading-relaxed opacity-60 md:text-right">
          UNE SÉLECTION D&apos;EXPÉRIENCES RÉCENTES — DU SITE VITRINE AUX PIPELINES IA MULTI-AGENTS.
        </p>
      </div>

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
    </section>
  );
}
