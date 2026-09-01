import { type ReactNode } from "react";
import { CARD_HOVER_CLASS, CARD_HOVER_LIFT_CLASS } from "@/components/home/cardMotion";

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
}

/** Premium hover lift with IEEE blue trace */
export default function InteractiveCard({
  children,
  className = "",
}: InteractiveCardProps) {
  return (
    <div className={["group h-full", CARD_HOVER_LIFT_CLASS, CARD_HOVER_CLASS, className].join(" ")}>
      <div className="relative">{children}</div>
    </div>
  );
}
