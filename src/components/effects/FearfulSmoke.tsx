"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import gsap from "gsap";

interface Blob {
  el: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
  size: number;
  color: string;
}

const COLORS = ["#ff3d00", "#d4ff00"];
const NUM_BLOBS = 35;
const MAX_BLOBS = 80;
const RANGE = 380;
const REPULSION = 35;
const SPLIT_THRESHOLD = 0.85;

export function FearfulSmoke() {
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<Blob[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    if (reduced) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const createBlob = (x?: number, y?: number, size?: number, color?: string) => {
      if (blobsRef.current.length >= MAX_BLOBS) return;

      const el = document.createElement("div");
      el.className = "blob";
      const c = color || COLORS[Math.floor(Math.random() * COLORS.length)];
      el.style.backgroundColor = c;
      container.appendChild(el);

      const b: Blob = {
        el,
        x: x ?? Math.random() * window.innerWidth,
        y: y ?? Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        baseSize: size ?? Math.random() * 90 + 50,
        size: size ?? Math.random() * 90 + 50,
        color: c,
      };
      blobsRef.current.push(b);
    };

    for (let i = 0; i < NUM_BLOBS; i++) createBlob();

    let animationId: number;

    const update = () => {
      const { x: mx, y: my } = mouseRef.current;
      const width = window.innerWidth;
      const height = window.innerHeight;

      for (let i = blobsRef.current.length - 1; i >= 0; i--) {
        const b = blobsRef.current[i];
        if (!b) continue;

        const dx = b.x - mx;
        const dy = b.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < RANGE) {
          const force = (RANGE - dist) / RANGE;

          // Flee rapidly
          const repulsionStrength = 25;
          b.vx += (dx / (dist || 1)) * force * repulsionStrength;
          b.vy += (dy / (dist || 1)) * force * repulsionStrength;

          // Shrink when afraid
          b.size = b.baseSize * Math.max(0.02, 1 - force * 1.95);

          // Split logic
          if (b.baseSize > 40 && force > SPLIT_THRESHOLD && blobsRef.current.length < MAX_BLOBS) {
            const splitSize = b.baseSize * 0.45;
            createBlob(b.x - 15, b.y, splitSize, b.color);
            createBlob(b.x + 15, b.y, splitSize, b.color);
            b.el.remove();
            blobsRef.current.splice(i, 1);
            continue;
          }

          // Anxiety jitter
          b.x += (Math.random() - 0.5) * force * 25;
          b.y += (Math.random() - 0.5) * force * 25;
        } else {
          // Return to normal size and natural drift
          b.size += (b.baseSize - b.size) * 0.05;
          b.vx *= 0.91;
          b.vy *= 0.91;
          b.vx += (Math.random() - 0.5) * 0.8;
          b.vy += (Math.random() - 0.5) * 0.8;
          
          // Return to center
          b.vx += (width / 2 - b.x) * 0.0004;
          b.vy += (height / 2 - b.y) * 0.0004;
        }

        // Boundary bounce
        const m = 30;
        if (b.x < m) { b.x = m; b.vx = Math.abs(b.vx) * 1.5; }
        if (b.x > width - m) { b.x = width - m; b.vx = -Math.abs(b.vx) * 1.5; }
        if (b.y < m) { b.y = m; b.vy = Math.abs(b.vy) * 1.5; }
        if (b.y > height - m) { b.y = height - m; b.vy = -Math.abs(b.vy) * 1.5; }

        b.x += b.vx;
        b.y += b.vy;

        gsap.set(b.el, {
          x: b.x,
          y: b.y,
          width: Math.max(10, b.size),
          height: Math.max(10, b.size),
        });
      }

      animationId = requestAnimationFrame(update);
    };

    animationId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
      blobsRef.current.forEach((b) => b.el.remove());
      blobsRef.current = [];
    };
  }, [reduced]);

  if (reduced) return null;

  return <div ref={containerRef} className="gooey-container fixed inset-0 pointer-events-none z-0" aria-hidden="true" />;
}
