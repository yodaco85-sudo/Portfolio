import { traits } from "@/data/portfolio";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

export function Profile() {
  return (
    <section id="profil" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <ScrollReveal direction="left">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
              03 — Parcours
            </p>
            <h2 className="font-[family-name:var(--font-syne)] text-5xl font-extrabold uppercase leading-[0.95] md:text-6xl">
              Mer
              <br />
              → Tech
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={150}>
          <div className="brutal-border brutal-shadow bg-surface p-8">
            <p className="text-sm leading-relaxed md:text-base">
              Chef mécanicien, patron de pêche, centres de profit en haute mer —{" "}
              <strong>22 ans</strong> à gérer des systèmes critiques sous pression.
              Aujourd&apos;hui : sites web, workflows n8n et agents IA pour les PME.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Ce que la mer m&apos;a appris — résilience, leadership, rigueur — je le
              transpose directement dans la construction de produits digitaux.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {traits.map((trait, i) => (
          <ScrollReveal key={trait} delay={i * 60}>
            <div
              className={`brutal-border p-4 text-center text-xs font-bold uppercase tracking-wider transition-transform duration-300 hover:scale-105 ${
                i % 2 === 0 ? "bg-accent" : "bg-bg"
              }`}
              data-cursor="hover"
            >
              {trait}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
