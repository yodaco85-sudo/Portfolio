"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { CustomCursor } from "./CustomCursor";
import { GrainOverlay } from "./GrainOverlay";
import { FearfulSmoke } from "./FearfulSmoke";
import { GooeyFilter } from "./GooeyFilter";
import { IntroGate, useIntroGate } from "./IntroGate";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  const { showIntro, entered, onEnter } = useIntroGate();

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <FearfulSmoke />
      <GooeyFilter />
      <GrainOverlay />
      {showIntro && <IntroGate onEnter={onEnter} />}
      <div
        className={`transition-opacity duration-700 ${entered ? "opacity-100" : "opacity-0"}`}
      >
        {children}
      </div>
    </>
  );
}
