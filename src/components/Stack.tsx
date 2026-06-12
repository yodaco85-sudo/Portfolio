import { learning, skills } from "@/data/portfolio";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

export function Stack() {
  return (
    <section id="stack" className="border-y-[3px] border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <ScrollReveal>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
            02 — Outils
          </p>
          <h2 className="font-[family-name:var(--font-syne)] text-5xl font-extrabold uppercase md:text-6xl">
            Stack
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, i) => (
            <ScrollReveal key={group.category} delay={i * 100}>
              <div
                className="brutal-border p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--border)]"
                data-cursor="hover"
              >
                <p className="mb-4 font-[family-name:var(--font-syne)] text-xl font-extrabold">
                  {group.category}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="brutal-border bg-bg px-2 py-1 text-[11px] font-semibold uppercase transition-colors hover:bg-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <div className="mt-8 brutal-border border-dashed p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
              En cours
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {learning.map((tool) => (
                <span
                  key={tool}
                  className="border-[2px] border-dashed border-border px-2 py-1 text-[11px] font-medium uppercase text-muted"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
