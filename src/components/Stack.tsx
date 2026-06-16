"use client";

import { motion } from "framer-motion";
import { skills, profile } from "@/data/portfolio";

function Sticker({
  children,
  rotate,
  color,
  className = "",
}: {
  children: React.ReactNode;
  rotate: number;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`sticker ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        backgroundColor: color || "white",
      }}
    >
      {children}
    </div>
  );
}

export function Stack() {
  const autoSkills = skills.find((s) => s.category === "AUTO")?.items || [];
  const iaSkills = skills.find((s) => s.category === "IA")?.items || [];
  const webSkills = skills.find((s) => s.category === "WEB")?.items || [];
  const dataSkills = skills.find((s) => s.category === "DATA")?.items || [];

  return (
    <section id="stack" className="mx-auto min-h-screen max-w-[1440px] px-8 py-32">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-20 flex items-center gap-4"
      >
        <div className="h-1.5 w-24 bg-black"></div>
        <h2 className="font-[family-name:var(--font-syne)] text-7xl uppercase tracking-tighter">
          / LE LABO
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="brutal-border brutal-shadow-lg relative group bg-white p-12 lg:col-span-7"
        >
          <div className="brutal-border absolute -left-8 -top-8 bg-black px-6 py-2 font-bold text-accent">
            STATUS@SEA:~#
          </div>

          <p className="font-mono text-3xl leading-relaxed bio-text">
            {profile.pitch.split(" — ").map((part, i) => (
              <span key={i} className={i === 1 ? "bg-accent px-1 font-bold" : ""}>
                {part}
                {i === 0 ? " — " : ""}
              </span>
            ))}
          </p>

          <div className="mt-12 flex items-center justify-between border-t-2 border-black/10 pt-8">
            <div className="flex gap-6">
              <a href="https://github.com/yodaco85-sudo" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent-2">
                <i className="ti ti-brand-github text-4xl"></i>
              </a>
              <a href={`mailto:${profile.contact.email}`} className="transition-colors hover:text-accent-2">
                <i className="ti ti-mail text-4xl"></i>
              </a>
              <a href="https://www.linkedin.com/in/besmaracontact" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent-2">
                <i className="ti ti-brand-linkedin text-4xl"></i>
              </a>
            </div>
            <a href="/contact" className="font-bold border-b-4 border-black text-lg uppercase transition-colors hover:text-accent-2">
              PROJET_INITIATION.EXE
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap content-start gap-4 pt-10 lg:col-span-5"
        >
          <div className="mb-4 w-full text-xs font-bold uppercase opacity-40">
            AUTOMATION & IA
          </div>
          {[...autoSkills, ...iaSkills].map((item, i) => (
            <Sticker
              key={item}
              rotate={((i * 13) % 16) - 8}
              color={i === 0 ? "var(--accent)" : "white"}
            >
              {item}
            </Sticker>
          ))}

          <div className="mb-4 mt-8 w-full text-xs font-bold uppercase opacity-40">
            WEB & NOCODE
          </div>
          {[...webSkills, ...dataSkills].map((item, i) => (
            <Sticker
              key={item}
              rotate={((i * 17) % 16) - 8}
              color={item === "Next.js" ? "var(--accent-2)" : "white"}
              className={item === "Next.js" ? "text-white" : ""}
            >
              {item}
            </Sticker>
          ))}

        </motion.div>
      </div>
    </section>
  );
}
