"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function FloatingOrbs() {
  const reduced = usePrefersReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      setOffset({ x, y });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -right-20 top-1/4 h-64 w-64 rounded-full bg-accent opacity-30 blur-3xl"
        style={{
          transform: `translate(${offset.x * 1.5}px, ${offset.y * 1.5}px)`,
          transition: "transform 0.4s ease-out",
        }}
      />
      <div
        className="absolute -left-16 bottom-1/4 h-48 w-48 rounded-full bg-accent-2 opacity-20 blur-3xl"
        style={{
          transform: `translate(${offset.x * -1}px, ${offset.y * -1}px)`,
          transition: "transform 0.5s ease-out",
        }}
      />
    </div>
  );
}
