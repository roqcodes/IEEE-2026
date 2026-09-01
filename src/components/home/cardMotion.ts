/** Instant, linear hover — no delay, straight easing curve */
export const CARD_HOVER_TRANSITION = {
  type: "tween" as const,
  duration: 0.2,
  ease: "linear" as const,
};

export const CARD_HOVER_LIFT = { y: -4 };

export const CARD_HOVER_LIFT_CLASS =
  "hover:-translate-y-1 transition-transform duration-200 ease-linear delay-0";

export const CARD_HOVER_CLASS =
  "transition-[border,box-shadow,background,color,opacity] duration-200 ease-linear delay-0";
