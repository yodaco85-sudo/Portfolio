"use client";

import { useState } from "react";
import { navLinks, profile } from "@/data/portfolio";
import { MagneticButton } from "@/components/effects/MagneticButton";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-border bg-bg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <a
          href="#top"
          className="font-[family-name:var(--font-syne)] text-sm font-extrabold uppercase tracking-tight md:text-base"
        >
          {profile.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation">
          {navLinks.map((link) => (
            <MagneticButton
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent-2"
            >
              {link.label}
            </MagneticButton>
          ))}
        </nav>

        <MagneticButton
          href="#contact"
          className="hidden brutal-border brutal-shadow-sm bg-accent px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_var(--border)] md:inline-flex"
        >
          Alternance
        </MagneticButton>

        <button
          type="button"
          className="brutal-border px-3 py-2 text-xs font-bold uppercase md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Fermer" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="border-t-[3px] border-border bg-surface px-4 py-4 md:hidden"
          aria-label="Navigation mobile"
        >
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 text-sm font-semibold uppercase tracking-widest"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="brutal-border inline-block bg-accent px-4 py-2 text-xs font-bold uppercase"
                onClick={() => setOpen(false)}
              >
                Alternance
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
