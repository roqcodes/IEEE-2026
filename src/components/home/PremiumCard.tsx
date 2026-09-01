"use client";

import { type ReactNode } from "react";
import { CARD_HOVER_CLASS, CARD_HOVER_LIFT_CLASS } from "@/components/home/cardMotion";

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
}

export default function PremiumCard({
  children,
  className = "",
  as: Tag = "div",
}: PremiumCardProps) {
  return (
    <Tag
      className={[
        "group relative h-full overflow-hidden",
        "bg-gradient-to-br from-white via-white to-ieee-sky-muted/80",
        "border border-ieee-border/90",
        "shadow-[0_1px_3px_rgba(0,98,155,0.06)]",
        "hover:border-ieee-blue/35 hover:shadow-[0_20px_48px_rgba(0,98,155,0.1)]",
        "hover:from-ieee-sky-muted/30 hover:to-white",
        CARD_HOVER_LIFT_CLASS,
        CARD_HOVER_CLASS,
        className,
      ].join(" ")}
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ieee-blue/25 to-transparent group-hover:via-ieee-blue/50 transition-all duration-200 ease-linear delay-0"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-linear delay-0 bg-gradient-to-br from-ieee-blue/[0.02] to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </Tag>
  );
}
