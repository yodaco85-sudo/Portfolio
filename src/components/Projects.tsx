"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { projects, typeLabels } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const typeAccent: Record<string, string> = {
  web: "bg-accent",
  ia: "bg-fg text-bg",
  auto: "bg-accent-2 text-bg",
  nocode: "bg-surface",
};

function gridClass(span?: string) {
  if (span === "wide") return "md:col-span-2";
  if (span === "tall") return "md:row-span-2";
  return "";
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const reduced = usePrefersReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  
  // Physics springs for smooth 3D tracking
  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(y, [-200, 200], [15, -15]);
  const rotateY = useTransform(x, [-200, 200], [-15, 15]);

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
    
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--mouse-x", `${px}%`);
    cardRef.current.style.setProperty("--mouse-y", `${py}%`);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <ScrollReveal delay={index * 80}>
      <motion.article
        ref={cardRef as any}
        className={`project-card brutal-border relative flex flex-col bg-surface p-6 transition-[box-shadow] duration-300 ${gridClass(project.span)}`}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={!reduced ? { scale: 1.05, zIndex: 20 } : {}}
        style={{ 
          rotateX: reduced ? 0 : rotateX, 
          rotateY: reduced ? 0 : rotateY, 
          transformPerspective: 1000 
        }}
        data-cursor="hover"
      >
        <div className="project-card__shine pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300" aria-hidden="true" />

        <div className="relative z-10 mb-4 flex items-start justify-between gap-3">
          <span
            className={`brutal-border px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${typeAccent[project.type]}`}
          >
            {typeLabels[project.type]}
          </span>
          <span className="text-right text-[10px] font-medium uppercase tracking-wider text-muted">
            {project.stack}
          </span>
        </div>

        <h3 className="relative z-10 font-[family-name:var(--font-syne)] text-2xl font-extrabold uppercase leading-tight transition-transform duration-300 group-hover:translate-x-1">
          {project.title}
        </h3>
        <p className="relative z-10 mt-1 text-xs font-semibold uppercase tracking-wider text-muted">
          {project.client}
        </p>

        <p className="relative z-10 mt-4 flex-1 text-sm leading-relaxed">{project.hook}</p>

        <div className="relative z-10 mt-6 border-t-[2px] border-border pt-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Résultat
          </p>
          <p className="mt-1 text-sm">{project.result}</p>
        </div>

        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-accent-2"
            data-magnetic="true"
          >
            Voir le site →
          </a>
        ) : (
          <p className="relative z-10 mt-4 text-xs italic text-muted">Démo sur demande</p>
        )}
      </motion.article>
    </ScrollReveal>
  );
}

export function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  
  // Parallax effect for the grid
  const yGrid = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="projets" ref={containerRef} className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <ScrollReveal>
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
              01 — Réalisations
            </p>
            <h2 className="font-[family-name:var(--font-syne)] text-5xl font-extrabold uppercase md:text-6xl">
              Projets
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted">
            Sites, automatisations et agents IA — des livrables concrets pour des besoins réels.
          </p>
        </div>
      </ScrollReveal>

      <motion.div style={{ y: yGrid }} className="grid gap-4 md:grid-cols-3 md:auto-rows-fr">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
