"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

interface SectionActionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  variant?: "solid" | "outline";
}

export default function SectionActionLink({
  href,
  children,
  className = "",
  external,
  variant = "solid",
}: SectionActionLinkProps) {
  const reduce = useReducedMotion();

  const classes = [
    "group",
    variant === "solid" ? "btn-section-action" : "btn-section-action-outline",
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

  const link = external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );

  if (reduce) return link;

  return (
    <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} className="inline-block">
      {link}
    </motion.div>
  );
}
