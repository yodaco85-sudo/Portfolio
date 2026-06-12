"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Springs for smooth trailing
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    document.body.classList.add("custom-cursor-active");
    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [data-cursor='hover'], [data-magnetic='true'], .project-strip__item")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [reduced, cursorX, cursorY]);

  if (reduced || !isVisible) return null;

  return (
    <>
      {/* Main fluorescent dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-[#39ff14] md:block"
        style={{
          boxShadow: "0 0 10px #39ff14, 0 0 20px #39ff14",
          x: mousePosition.x - 4, // Center the 8px dot
          y: mousePosition.y - 4,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      />
      
      {/* Trailing luminous ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border-2 border-[#39ff14] md:block"
        style={{
          boxShadow: "0 0 15px rgba(57, 255, 20, 0.4), inset 0 0 10px rgba(57, 255, 20, 0.2)",
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ width: 36, height: 36 }}
        animate={{
          width: isHovering ? 64 : 36,
          height: isHovering ? 64 : 36,
          backgroundColor: isHovering ? "rgba(57, 255, 20, 0.15)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        aria-hidden="true"
      />
    </>
  );
}
