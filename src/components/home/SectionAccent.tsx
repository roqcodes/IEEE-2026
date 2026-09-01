/** Thin gradient rule — subtle IEEE blue trace at section edges */
export function SectionAccent({ position = "top" }: { position?: "top" | "bottom" }) {
  const pos = position === "top" ? "top-0" : "bottom-0";
  return (
    <div
      className={`absolute ${pos} inset-x-0 h-px bg-gradient-to-r from-transparent via-ieee-blue/30 to-transparent pointer-events-none`}
      aria-hidden="true"
    />
  );
}

/** Soft vertical blue wash on one side of a section */
export function SectionSideGlow({ side = "right" }: { side?: "left" | "right" }) {
  const pos = side === "right" ? "right-0" : "left-0";
  return (
    <div
      className={`absolute top-1/4 ${pos} w-[min(36vw,280px)] h-[min(45vh,360px)] rounded-full bg-ieee-blue/[0.04] blur-2xl pointer-events-none`}
      aria-hidden="true"
    />
  );
}
