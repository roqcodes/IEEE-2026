"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

interface PremiumButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  fullWidth?: boolean;
  external?: boolean;
  onClick?: () => void;
}

const variants: Record<Variant, string> = {
  primary:
    "text-white border border-ieee-blue-light/25 bg-gradient-to-br from-ieee-blue via-[#0074b0] to-ieee-navy shadow-[0_2px_14px_rgba(0,98,155,0.28)] hover:border-ieee-blue-light/45 hover:shadow-[0_10px_32px_rgba(0,98,155,0.38)]",
  secondary:
    "bg-white text-ieee-blue border border-ieee-border hover:border-ieee-blue hover:bg-ieee-sky shadow-[0_1px_2px_rgba(0,98,155,0.08)] hover:shadow-[0_6px_20px_rgba(0,98,155,0.12)]",
  ghost:
    "bg-transparent text-ieee-blue border border-transparent hover:bg-ieee-sky hover:border-ieee-border",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[10px] tracking-[0.12em] gap-2",
  md: "px-7 py-3.5 text-[13px] tracking-[0.08em] gap-2.5",
};

export default function PremiumButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  fullWidth = false,
  external,
  onClick,
}: PremiumButtonProps) {
  const reduce = useReducedMotion();

  const classes = cn(
    "group relative inline-flex items-center justify-center overflow-hidden",
    "font-semibold uppercase",
    "transition-[color,background,border,box-shadow,transform] duration-300 ease-out",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ieee-blue",
    sizes[size],
    variants[variant],
    fullWidth && "w-full",
    className
  );

  const inner = (
    <>
      {variant === "primary" && (
        <>
          <span
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
            aria-hidden="true"
          />
          <span
            className="absolute bottom-0 inset-x-0 h-px bg-gold/55 pointer-events-none"
            aria-hidden="true"
          />
        </>
      )}
      <span className="relative">{children}</span>
      <svg
        className="relative w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </>
  );

  const linkProps = external
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : { href, onClick };

  const link = external ? (
    <a {...linkProps} className={classes}>
      {inner}
    </a>
  ) : (
    <Link {...linkProps} className={classes}>
      {inner}
    </Link>
  );

  if (reduce) {
    return <div className={cn(fullWidth && "w-full")}>{link}</div>;
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(fullWidth ? "block w-full" : "inline-block")}
    >
      {link}
    </motion.div>
  );
}
