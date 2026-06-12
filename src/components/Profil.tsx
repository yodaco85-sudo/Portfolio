"use client";

import { profile, stats, traits } from "@/data/portfolio";

export function Profil() {
  return (
    <section id="profil" className="bg-black text-white py-32 px-8">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="font-[family-name:var(--font-syne)] text-8xl uppercase tracking-tighter text-accent mb-20">
          PROFIL
        </h2>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="flex flex-col gap-8">
            <p className="font-mono text-base leading-relaxed opacity-80 max-w-lg">
              {profile.pitch}
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="brutal-border border-white p-6">
                  <span className="font-[family-name:var(--font-syne)] block text-5xl font-extrabold text-accent">
                    {s.value}
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-50 mt-1 block">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-40 block mb-4">
                Traits
              </span>
              <div className="flex flex-wrap gap-3">
                {traits.map((t) => (
                  <span
                    key={t}
                    className="brutal-border border-white font-mono text-xs font-bold uppercase tracking-widest px-4 py-2"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="brutal-border border-accent p-6 mt-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-40 block mb-3">
                Alternance recherchée
              </span>
              <p className="font-[family-name:var(--font-syne)] text-xl font-bold uppercase">
                {profile.alternance.program}
              </p>
              <p className="font-mono text-xs opacity-60 mt-2">{profile.alternance.rncp}</p>
              <p className="font-mono text-xs text-accent mt-1">{profile.alternance.school}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
