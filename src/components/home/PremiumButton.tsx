"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface PremiumButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-ieee-blue text-white border border-ieee-blue hover:bg-ieee-blue-dark hover:border-ieee-blue-dark shadow-[0_1px_2px_rgba(0,98,155,0.12)] hover:shadow-[0_8px_24px_rgba(0,98,155,0.22)]",
  secondary:
    "bg-white text-ieee-blue border border-ieee-border hover:border-ieee-blue hover:bg-ieee-sky",
  ghost:
    "bg-transparent text-ieee-blue border border-transparent hover:bg-ieee-sky hover:border-ieee-border",
};

export default function PremiumButton({
  href,
  children,
  variant = "primary",
  className = "",
  external,
}: PremiumButtonProps) {
  const reduce = useReducedMotion();

  const classes = [
    "group relative inline-flex items-center justify-center gap-2.5",
    "px-7 py-3.5 text-[13px] font-semibold tracking-[0.08em] uppercase",
    "transition-[color,background,border,box-shadow] duration-300",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ieee-blue",
    variants[variant],
    className,
  ].join(" ");

  const inner = (
    <>
      <span>{children}</span>
      <svg
        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
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

  if (reduce) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={classes}>
          {inner}
        </Link>
      )}
    </motion.div>
  );
}
