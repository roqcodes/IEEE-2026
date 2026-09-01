import { type ReactNode } from "react";

interface AccentPanelProps {
  children: ReactNode;
  className?: string;
  /** "full" = membership gradient; "soft" = light blue tint; "mid" = subtle blue wash */
  tone?: "full" | "soft" | "mid";
}

export default function AccentPanel({
  children,
  className = "",
  tone = "full",
}: AccentPanelProps) {
  const isFull = tone === "full";
  const isMid = tone === "mid";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isFull ? (
        <div className="absolute inset-0 ieee-gradient-membership" aria-hidden="true" />
      ) : isMid ? (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, color-mix(in srgb, var(--color-ieee-blue) 7%, transparent), var(--color-ieee-sky), color-mix(in srgb, var(--color-ieee-blue-light) 8%, transparent))`,
          }}
          aria-hidden="true"
        />
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-ieee-sky via-ieee-sky-muted to-white"
          aria-hidden="true"
        />
      )}
      <div
        className={`absolute inset-0 ${isFull ? "opacity-[0.08]" : isMid ? "opacity-[0.35]" : "opacity-[0.5]"}`}
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: isFull ? "40px 40px" : "32px 32px",
          color: isFull ? "white" : "var(--color-ieee-border)",
        }}
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
