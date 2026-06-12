"use client";

import { useRef } from "react";
import { projects } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ProjectStrip() {
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const items = [...projects, ...projects, ...projects];

  const setSpeed = (speed: "slow" | "fast" | "paused") => {
    const el = trackRef.current;
    if (!el) return;
    el.dataset.speed = speed;
  };

  return (
    <section
      className="project-strip overflow-hidden border-y-[3px] border-border bg-fg py-6 text-bg"
      aria-label="Liste des projets"
    >
      <div
        ref={trackRef}
        className={`project-strip__track flex w-max gap-0 ${reduced ? "" : "animate-strip"}`}
        data-speed="slow"
        onMouseEnter={() => !reduced && setSpeed("paused")}
        onMouseLeave={() => !reduced && setSpeed("slow")}
      >
        {items.map((project, i) => (
          <a
            key={`${project.id}-${i}`}
            href={project.url ?? "#projets"}
            target={project.url ? "_blank" : undefined}
            rel={project.url ? "noopener noreferrer" : undefined}
            className="project-strip__item group flex shrink-0 items-center gap-6 px-10 transition-opacity hover:opacity-100"
            data-cursor="hover"
          >
            <span className="font-[family-name:var(--font-syne)] text-[clamp(2rem,5vw,4rem)] font-extrabold uppercase tracking-tight transition-transform duration-300 group-hover:-skew-x-3 group-hover:text-accent">
              {project.title}
            </span>
            <span className="text-accent opacity-60" aria-hidden="true">
              ◆
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
