"use client";

import { type ReactNode } from "react";
import { CustomCursor } from "./CustomCursor";
import { GrainOverlay } from "./GrainOverlay";
import { IntroGate, useIntroGate } from "./IntroGate";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  const { showIntro, entered, onEnter } = useIntroGate();

  return (
    <>
      <CustomCursor />
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
