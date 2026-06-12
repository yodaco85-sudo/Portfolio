"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import gsap from "gsap";

type Particle = { x: number; y: number; age: number; maxAge: number };

export function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (reduced) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    setIsVisible(true);
    document.body.classList.add("custom-cursor-active");

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    // Quick setters for performance
    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");
    
    // Spring for smooth ring lag
    const ringX = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      const target = e.target as HTMLElement;
      const isHoverable = target.closest("a, button, .project-card, .sticker, [data-cursor='hover']");
      
      if (isHoverable) {
        gsap.to(ring, { 
          width: 64, 
          height: 64, 
          backgroundColor: 'rgba(57, 255, 20, 0.15)', 
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(dot, { scale: 0, duration: 0.2 });
      } else {
        gsap.to(ring, { 
          width: 36, 
          height: 36, 
          backgroundColor: 'transparent', 
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(dot, { scale: 1, duration: 0.2 });
      }
    };

    // Particle trail
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const particles: Particle[] = [];
    let rafId: number;

    if (canvas && ctx) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const onResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      window.addEventListener("resize", onResize);

      const tick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.age++;
          if (p.age >= p.maxAge) { particles.splice(i, 1); continue; }
          const progress = p.age / p.maxAge;
          const alpha = (1 - progress) * 0.7;
          const radius = (1 - progress) * 3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(57, 255, 20, ${alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#39ff14";
          ctx.fill();
        }
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);

      const origOnMouseMove = onMouseMove;
      const onMouseMoveWithParticle = (e: MouseEvent) => {
        origOnMouseMove(e);
        particles.push({ x: e.clientX, y: e.clientY, age: 0, maxAge: 22 });
      };

      const onMouseLeave = () => setIsVisible(false);
      const onMouseEnter = () => setIsVisible(true);

      window.addEventListener("mousemove", onMouseMoveWithParticle);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mouseenter", onMouseEnter);

      return () => {
        document.body.classList.remove("custom-cursor-active");
        window.removeEventListener("mousemove", onMouseMoveWithParticle);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("mouseleave", onMouseLeave);
        document.removeEventListener("mouseenter", onMouseEnter);
        cancelAnimationFrame(rafId);
      };
    }

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9998]"
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        id="cursor-dot"
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#39ff14] transition-opacity duration-300"
        style={{
          boxShadow: "0 0 10px #39ff14, 0 0 20px #39ff14",
          opacity: isVisible ? 1 : 0,
        }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        id="cursor-ring"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#39ff14] transition-opacity duration-300"
        style={{
          boxShadow: "0 0 15px rgba(57, 255, 20, 0.4), inset 0 0 10px rgba(57, 255, 20, 0.2)",
          opacity: isVisible ? 1 : 0,
        }}
        aria-hidden="true"
      />
    </>
  );
}
