"use client";

import { profile } from "@/data/portfolio";
import { MagneticButton } from "@/components/effects/MagneticButton";

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-transparent px-8 py-48 text-center">
      <div className="mx-auto max-w-7xl">
        <div className="mb-24">
          <MagneticButton
            href="/contact"
            className="brutal-border brutal-shadow-lg active:translate-x-1 active:translate-y-1 active:shadow-none group relative bg-accent px-12 py-10 md:px-24 md:py-20"
          >
            <div className="flex flex-col items-center">
              <span className="font-[family-name:var(--font-syne)] mb-4 text-5xl uppercase leading-none tracking-tighter md:text-9xl">
                LANCEZ UN PROJET
              </span>
              <div className="flex items-center gap-4 transition-transform duration-300 group-hover:translate-x-4">
                <span className="font-mono text-xl font-bold uppercase">
                  Initiez la connexion
                </span>
                <i className="ti ti-arrow-right text-4xl"></i>
              </div>
            </div>
          </MagneticButton>
        </div>

        <div className="mt-32 flex flex-col items-center justify-between gap-8 border-t-4 border-black pt-12 font-mono text-xs font-bold uppercase opacity-60 md:flex-row">
          <div>© 2026 {profile.name} — {profile.location.toUpperCase()}</div>
          <div className="flex gap-8">
            <a href="https://www.linkedin.com/in/besmaracontact" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent-2">
              LinkedIn
            </a>
            <a href="https://github.com/yodaco85-sudo" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent-2">
              GitHub
            </a>
            <a href={`mailto:${profile.contact.email}`} className="transition-colors hover:text-accent-2">
              {profile.contact.email}
            </a>
          </div>
          <div>CONSTRUIT AVEC PRÉCISION / INSPIRÉ PAR LA MER</div>
        </div>
      </div>
    </footer>
  );
}
