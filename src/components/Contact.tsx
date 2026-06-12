import { profile } from "@/data/portfolio";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

export function Contact() {
  const { alternance, contact } = profile;

  return (
    <section id="contact" className="border-t-[3px] border-border bg-fg text-bg">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 md:grid-cols-2 md:px-8">
        <ScrollReveal direction="left">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-bg/60">
              04 — Contact
            </p>
            <h2 className="font-[family-name:var(--font-syne)] text-5xl font-extrabold uppercase md:text-6xl">
              Parlons
              <br />
              <span className="text-accent">projet</span>
            </h2>
            <p className="mt-6 max-w-md text-sm text-bg/70">
              Recruteur, entreprise ou client — disponible pour une alternance ou une
              mission. Réponse rapide.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              <MagneticButton
                href={`mailto:${contact.email}`}
                className="brutal-border inline-flex w-fit bg-accent px-5 py-3 text-xs font-bold uppercase tracking-widest text-fg"
              >
                {contact.email}
              </MagneticButton>
              <a
                href={contact.phoneHref}
                className="text-sm font-semibold uppercase tracking-wider hover:text-accent"
                data-cursor="hover"
              >
                {contact.phone}
              </a>
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold uppercase tracking-wider hover:text-accent"
                data-cursor="hover"
              >
                besmara.fr →
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={150}>
          <div className="brutal-border bg-bg p-8 text-fg">
            <p className="inline-block bg-accent-2 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-bg">
              {alternance.status}
            </p>
            <p className="mt-6 font-[family-name:var(--font-syne)] text-3xl font-extrabold uppercase">
              {alternance.school}
            </p>
            <p className="mt-3 text-sm font-semibold">{alternance.program}</p>
            <p className="mt-4 text-xs text-muted">{alternance.rncp}</p>

            <MagneticButton
              href={`mailto:${contact.email}?subject=Alternance%20Alegria%20—%20Yoann%20Dos%20Santos%20da%20Costa`}
              className="mt-8 brutal-border brutal-shadow-sm bg-fg px-6 py-3 text-xs font-bold uppercase tracking-widest text-bg"
            >
              Proposer une alternance
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
