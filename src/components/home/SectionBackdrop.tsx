import CursorGrid from "@/components/home/CursorGrid";

interface SectionBackdropProps {
  variant?: "sky" | "white" | "accent";
  interactiveGrid?: boolean;
}

/** Subtle grid + gradient ambient layer (membership-section language) */
export default function SectionBackdrop({
  variant = "sky",
  interactiveGrid = true,
}: SectionBackdropProps) {
  const gradients = {
    sky: "from-ieee-sky-muted via-ieee-sky/50 to-ieee-sky-muted",
    white:
      "from-ieee-sky-muted/80 via-white to-ieee-sky/35",
    accent:
      "from-ieee-sky/60 via-ieee-sky-muted to-ieee-blue/[0.07]",
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" data-decorative aria-hidden="true">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[variant]}`} />
      {interactiveGrid ? (
        <CursorGrid
          cellSize={56}
          baseOpacity={12}
          highlightOpacity={28}
          spotlightRadius={150}
          className="opacity-[0.55]"
          fadeMask="radial-gradient(ellipse 85% 75% at 50% 45%, black 15%, transparent 100%)"
        />
      ) : (
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in srgb, var(--color-ieee-blue) 12%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-ieee-blue) 12%, transparent) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 85% 75% at 50% 45%, black 15%, transparent 100%)",
          }}
          aria-hidden="true"
        />
      )}
      <div className="absolute -top-24 right-0 w-[320px] h-[320px] rounded-full bg-ieee-blue/[0.06] blur-2xl" />
      <div className="absolute -bottom-32 left-0 w-[280px] h-[280px] rounded-full bg-ieee-blue-light/[0.07] blur-2xl" />
    </div>
  );
}
