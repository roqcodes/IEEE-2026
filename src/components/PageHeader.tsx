import React from "react";

interface PageHeaderProps {
  breadcrumb?: string;
  title: string;
  subtitle?: string;
  accentColor?: string;
}

export default function PageHeader({
  breadcrumb,
  title,
  subtitle,
  accentColor = "#00629B",
}: PageHeaderProps) {
  return (
    <section className="relative bg-white pt-32 sm:pt-36 pb-16 sm:pb-24 border-t border-gray-200 overflow-hidden">
      {/* Decorative Top Line below fixed navbar */}
      <div
        className="absolute top-20 left-0 w-full h-[6px] z-20 animate-line-right pointer-events-none"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />

      {/* Decorative Left Sharp Accent Bar */}
      <div
        className="absolute top-20 left-0 bottom-0 w-3 md:w-5 lg:w-6 z-20 shadow-[4px_0_15px_rgba(0,0,0,0.06)] animate-bar-down pointer-events-none"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />

      {/* Section Divider Top Center Notch */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10" />

      {/* Content Container - generous padding ensuring text never collides with the left bar */}
      <div className="max-w-7xl mx-auto px-8 sm:px-12 md:px-16 lg:px-20 relative z-30">
        {breadcrumb && (
          <p className="text-sm text-[--color-gold] uppercase tracking-widest font-bold mb-4">
            {breadcrumb}
          </p>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[--color-navy] font-serif leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg text-[--color-charcoal] max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
