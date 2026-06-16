"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { MagneticButton } from "./MagneticButton";
import { SplitText } from "./SplitText";

const STORAGE_KEY = "portfolio-entered";

type IntroGateProps = {
  onEnter: () => void;
};

export function IntroGate({ onEnter }: IntroGateProps) {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(reduced ? 100 : 0);
  const [loaded, setLoaded] = useState(reduced);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (reduced) return;

    let frame = 0;
    const start = performance.now();
    const duration = 2200;

    const tick = (now: number) => {
      const p = Math.min(100, Math.round(((now - start) / duration) * 100));
      setProgress(p);
      if (p < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setLoaded(true);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  const handleEnter = () => {
    setExiting(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
    window.setTimeout(onEnter, 900);
  };

  const handleSkip = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    onEnter();
  };

  const [first, ...rest] = profile.name.split(" ");

  return (
    <div
      className={`intro-gate fixed inset-0 z-[300] flex flex-col items-center justify-center bg-bg transition-all duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        exiting ? "pointer-events-none -translate-y-full opacity-0" : ""
      }`}
      aria-hidden={exiting}
    >
      <div className="absolute left-6 top-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
        Chargement
      </div>

      <div className="absolute right-6 top-6 font-[family-name:var(--font-syne)] text-2xl font-extrabold tabular-nums">
        {progress}
        <span className="text-sm text-muted">/100</span>
      </div>

      <div className="mb-16 h-[3px] w-[min(320px,70vw)] overflow-hidden brutal-border bg-surface">
        <div
          className="h-full bg-accent transition-[width] duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-center">
        <p className="mb-2 font-[family-name:var(--font-syne)] text-[clamp(3.5rem,14vw,9rem)] font-extrabold uppercase leading-[0.85] tracking-tighter">
          <SplitText text={first} active={loaded} />
        </p>
        <p className="font-[family-name:var(--font-syne)] text-[clamp(3.5rem,14vw,9rem)] font-extrabold uppercase leading-[0.85] tracking-tighter text-muted">
          <SplitText text={rest.join(" ")} active={loaded} delay={200} />
        </p>
      </div>

      <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.35em] text-muted">
        <SplitText text={profile.role} active={loaded} delay={500} />
      </p>

      <div
        className={`mt-14 transition-all duration-700 ${
          loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <MagneticButton
          onClick={handleEnter}
          className="brutal-border brutal-shadow bg-fg px-10 py-4 text-xs font-bold uppercase tracking-[0.3em] text-bg transition-shadow hover:shadow-[10px_10px_0_var(--border)]"
        >
          Découvrir
        </MagneticButton>
        <button
          type="button"
          onClick={handleSkip}
          className="mt-4 block w-full text-center text-[10px] uppercase tracking-widest text-muted transition-colors hover:text-fg"
          data-cursor="hover"
        >
          Entrer sans animation
        </button>
      </div>
    </div>
  );
}

export function useIntroGate() {
  const reduced = usePrefersReducedMotion();
  const [showIntro, setShowIntro] = useState(!reduced);
  const [entered, setEntered] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    const done = sessionStorage.getItem(STORAGE_KEY);
    if (done) {
      setShowIntro(false);
      setEntered(true);
    }
  }, [reduced]);

  return {
    showIntro,
    entered,
    onEnter: () => {
      setShowIntro(false);
      setEntered(true);
    },
  };
}
