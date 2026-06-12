"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/data/portfolio";
import { FloatingOrbs } from "@/components/effects/FloatingOrbs";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SplitText } from "@/components/effects/SplitText";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end start"] 
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yAside = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative mx-auto grid max-w-7xl gap-8 overflow-hidden px-4 py-16 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:py-24"
    >
      <FloatingOrbs />

      <motion.div className="relative z-10" style={{ y: yText }}>
        <ScrollReveal>
          <p className="mb-6 inline-block brutal-border bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
            {profile.alternance.status} — {profile.alternance.school}
          </p>
        </ScrollReveal>

        <h1 className="font-[family-name:var(--font-syne)] text-[clamp(3rem,10vw,7rem)] font-extrabold uppercase leading-[0.9] tracking-tighter">
          <SplitText text="De la" className="block" as="span" delay={100} />
          <SplitText text="mer" className="block" as="span" delay={300} />
          <span className="mt-1 inline-block bg-fg px-2 text-bg">
            <SplitText text="à l'IA" as="span" delay={500} />
          </span>
        </h1>

        <ScrollReveal delay={700}>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            {profile.pitch}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={850} className="mt-10 flex flex-wrap gap-4">
          <MagneticButton
            href="#projets"
            className="brutal-border brutal-shadow bg-fg px-6 py-3 text-xs font-bold uppercase tracking-widest text-bg transition-shadow hover:shadow-[8px_8px_0_var(--border)]"
          >
            Voir les projets
          </MagneticButton>
          <MagneticButton
            href={`mailto:${profile.contact.email}`}
            className="brutal-border px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-surface"
          >
            Me contacter
          </MagneticButton>
        </ScrollReveal>
      </motion.div>

      <motion.aside className="relative z-10 flex flex-col gap-4" style={{ y: yAside }}>
        <ScrollReveal delay={200} direction="right">
          <div className="brutal-border brutal-shadow bg-surface p-6 transition-transform duration-500 hover:-rotate-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
              Product Builder
            </p>
            <p className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-extrabold uppercase">
              {profile.tagline}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={350} direction="right">
          <div className="brutal-border bg-accent-2 p-6 text-bg transition-transform duration-500 hover:rotate-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em]">
              Disponible
            </p>
            <p className="mt-2 font-[family-name:var(--font-syne)] text-2xl font-extrabold uppercase leading-tight">
              Alternance
              <br />
              2026
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={500} direction="right">
          <div className="brutal-border p-6 transition-transform duration-500 hover:-rotate-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
              Localisation
            </p>
            <p className="mt-2 text-sm font-semibold">{profile.location}</p>
          </div>
        </ScrollReveal>
      </motion.aside>
    </section>
  );
}
