import React from "react";

interface PageHeaderProps {
  breadcrumb?: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ breadcrumb, title, subtitle }: PageHeaderProps) {
  return (
    <section className="py-16 sm:py-24 bg-white relative border-t border-gray-200">
      <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
