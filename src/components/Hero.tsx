"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-6xl"
      >
        <h1 className="font-[family-name:var(--font-syne)] text-[clamp(2rem,8vw,7rem)] font-extrabold uppercase leading-[0.85] tracking-tight select-none">
          <span className="block">YOANN</span>
          <span className="block">DOS SANTOS</span>
          <span className="block">DA COSTA</span>
        </h1>

        <img
          src="https://cdn.jsdelivr.net/npm/game-icons-transparent@latest/svgs/lorc/bright-explosion.svg"
          className="absolute -right-8 -top-12 h-24 w-24 animate-pulse opacity-80 pointer-events-none"
          style={{ filter: "brightness(0)" }}
          alt=""
          aria-hidden="true"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16"
      >
        <div className="brutal-border brutal-shadow bg-accent inline-block -rotate-1.5 overflow-hidden whitespace-nowrap rounded-full px-10 py-3 transition-transform duration-300 hover:rotate-0 hover:scale-105">
          <div className="flex animate-marquee gap-8 px-4">
            <span className="font-mono text-lg font-bold uppercase tracking-wider md:text-xl">
              {profile.role} / {profile.tagline} / {profile.role} / {profile.tagline} /
            </span>
            <span className="font-mono text-lg font-bold uppercase tracking-wider md:text-xl" aria-hidden="true">
              {profile.role} / {profile.tagline} / {profile.role} / {profile.tagline} /
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-24 animate-bounce font-mono text-sm uppercase tracking-widest"
      >
        ( DÉCOUVREZ L&apos;ÉCOSYSTÈME )
      </motion.div>
    </section>
  );
}
