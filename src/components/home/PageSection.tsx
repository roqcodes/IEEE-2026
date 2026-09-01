import { type ReactNode } from "react";
import SectionBackdrop from "@/components/home/SectionBackdrop";
import { SectionAccent, SectionSideGlow } from "@/components/home/SectionAccent";

interface PageSectionProps {
  children: ReactNode;
  className?: string;
  variant?: "sky" | "white" | "accent";
  sideGlow?: "left" | "right";
  borderTop?: boolean;
  py?: string;
  id?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
  interactiveGrid?: boolean;
}

export default function PageSection({
  children,
  className = "",
  variant = "sky",
  sideGlow,
  borderTop = true,
  py = "py-24 lg:py-32",
  interactiveGrid = false,
  ...aria
}: PageSectionProps) {
  return (
    <section
      className={`relative ${py} overflow-hidden ${borderTop ? "border-t border-ieee-border" : ""} ${className}`}
      {...aria}
    >
      <SectionBackdrop variant={variant} interactiveGrid={interactiveGrid} />
      <SectionAccent />
      {sideGlow && <SectionSideGlow side={sideGlow} />}
      <div className="relative container-editorial">{children}</div>
    </section>
  );
}
