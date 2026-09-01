"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

function gridImage(lineOpacity: number) {
  const color = `color-mix(in srgb, var(--color-ieee-blue) ${lineOpacity}%, transparent)`;
  return `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`;
}

type GridInstance = {
  root: HTMLDivElement;
  highlight: HTMLDivElement;
  spotlightRadius: number;
};

const instances = new Set<GridInstance>();
let frame = 0;
let listening = false;
let scrollPaused = false;
let scrollTimer: ReturnType<typeof setTimeout> | undefined;

function onScroll() {
  scrollPaused = true;
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    scrollPaused = false;
  }, 120);
}

function onMove(event: MouseEvent) {
  if (scrollPaused || instances.size === 0) return;

  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    for (const inst of instances) {
      const rect = inst.root.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const { spotlightRadius } = inst;
      const inside =
        x >= -spotlightRadius &&
        y >= -spotlightRadius &&
        x <= rect.width + spotlightRadius &&
        y <= rect.height + spotlightRadius;

      if (inside) {
        const mask = `radial-gradient(circle ${spotlightRadius}px at ${x}px ${y}px, black 0%, transparent 100%)`;
        inst.highlight.style.opacity = "1";
        inst.highlight.style.maskImage = mask;
        (inst.highlight.style as CSSStyleDeclaration & { webkitMaskImage: string }).webkitMaskImage = mask;
      } else {
        inst.highlight.style.opacity = "0";
      }
    }
  });
}

function onLeave() {
  for (const inst of instances) {
    inst.highlight.style.opacity = "0";
  }
}

function ensureListener() {
  if (listening) return;
  listening = true;
  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("mouseleave", onLeave);
  window.addEventListener("scroll", onScroll, { passive: true });
}

function releaseListener() {
  if (instances.size > 0 || !listening) return;
  listening = false;
  window.removeEventListener("mousemove", onMove);
  window.removeEventListener("mouseleave", onLeave);
  window.removeEventListener("scroll", onScroll);
  cancelAnimationFrame(frame);
  clearTimeout(scrollTimer);
}

interface CursorGridProps {
  cellSize?: number;
  baseOpacity?: number;
  highlightOpacity?: number;
  spotlightRadius?: number;
  fadeMask?: string;
  className?: string;
}

export default function CursorGrid({
  cellSize = 56,
  baseOpacity = 12,
  highlightOpacity = 26,
  spotlightRadius = 160,
  fadeMask,
  className = "",
}: CursorGridProps) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;

    const root = rootRef.current;
    const highlight = highlightRef.current;
    if (!root || !highlight) return;

    const inst: GridInstance = { root, highlight, spotlightRadius };
    instances.add(inst);
    ensureListener();

    return () => {
      instances.delete(inst);
      releaseListener();
    };
  }, [reduce, spotlightRadius]);

  const size = `${cellSize}px ${cellSize}px`;
  const wrapperMask = fadeMask ? { maskImage: fadeMask, WebkitMaskImage: fadeMask } : undefined;

  return (
    <div
      ref={rootRef}
      className={`absolute inset-0 ${className}`}
      style={wrapperMask}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: gridImage(baseOpacity),
          backgroundSize: size,
        }}
      />
      {!reduce && (
        <div
          ref={highlightRef}
          className="absolute inset-0 opacity-0 will-change-[mask-image,opacity]"
          style={{
            backgroundImage: gridImage(highlightOpacity),
            backgroundSize: size,
          }}
        />
      )}
    </div>
  );
}
