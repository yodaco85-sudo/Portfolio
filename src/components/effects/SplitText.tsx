"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type SplitTextProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  delay?: number;
  active?: boolean;
};

export function SplitText({
  text,
  className = "",
  as: Tag = "span",
  delay = 0,
  active = true,
}: SplitTextProps) {
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(reduced);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduced) {
      setShown(true);
      return;
    }
    if (!active) return;
    const t = window.setTimeout(() => setShown(true), delay);
    return () => window.clearTimeout(t);
  }, [active, delay, reduced]);

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={ref as never} className={`split-text ${className}`} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="split-text__char"
          style={{
            transitionDelay: shown ? `${i * 35 + delay}ms` : "0ms",
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0) rotate(0deg)" : "translateY(110%) rotate(4deg)",
          }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}
