"use client";

import { useRef, type ReactNode, type MouseEvent, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  dataCursor?: string;
};

export function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  dataCursor = "hover",
}: MagneticButtonProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (reduced || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Magnetic pull (the smaller the divisor, the stronger the pull)
    setPosition({ x: middleX * 0.4, y: middleY * 0.4 });
  };

  const handleLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  const motionProps: any = {
    ref: ref,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick,
    animate: { x, y },
    transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
    className: `magnetic-btn inline-block ${className}`,
    "data-cursor": dataCursor,
    "data-magnetic": "true",
  };

  if (href) {
    return (
      <motion.a href={href} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" {...motionProps}>
      {children}
    </motion.button>
  );
}
