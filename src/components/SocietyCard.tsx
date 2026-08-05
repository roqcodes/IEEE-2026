import React from "react";
import Link from "next/link";
import type { Society } from "@/data/societies";

const sampleImages: Record<string, string> = {
  cs: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  ras: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
  wie: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  pes: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
  comm: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  sight: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80",
};

const societyShortCodes: Record<string, string> = {
  cs: "CS",
  ras: "RAS",
  wie: "WIE",
  pes: "PES",
  comm: "COM",
  sight: "SIGHT",
};

interface SocietyCardProps {
  society: Society;
}

export default function SocietyCard({ society }: SocietyCardProps) {
  const imageUrl = sampleImages[society.id] || sampleImages.cs;
  const shortCode = societyShortCodes[society.id] || society.id.toUpperCase();

  return (
    <article className="group flex flex-col shadow-sm hover:shadow-xl transition-shadow bg-white border border-[--color-border] h-full overflow-hidden">
      {/* ── 1. Top of Card: Prominent Society Name ── */}
      <div className="p-6 lg:p-7 bg-white border-b border-[--color-border] flex flex-col justify-between min-h-[110px]">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 inline-block shrink-0"
              style={{ backgroundColor: society.color }}
            />
            <span className="text-xs font-bold uppercase tracking-widest text-[--color-muted]">
              {society.name}
            </span>
          </div>

          <span
            className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 border"
            style={{
              borderColor: `${society.color}40`,
              color: society.color,
              backgroundColor: `${society.color}10`,
            }}
          >
            {shortCode}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-[--color-navy] leading-tight line-clamp-2 group-hover:text-[--color-gold] transition-colors">
          {society.fullName}
        </h3>
      </div>

      {/* ── 2. Middle: Picture / Banner ── */}
      <div className="w-full relative overflow-hidden bg-gray-100 h-[210px] flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={`${society.fullName} banner`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ── 3. Bottom: Description, Tags & Actions ── */}
      <div className="p-6 lg:p-7 flex flex-col flex-1 bg-white">
        <p className="text-[--color-muted] text-sm leading-relaxed line-clamp-3 mb-5">
          {society.description}
        </p>

        {/* Technical Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {society.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-gray-50 text-[--color-navy] border border-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer Action Bar */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[--color-navy]">
            <span
              className="w-2 h-2 inline-block shrink-0"
              style={{ backgroundColor: society.color }}
            />
            <span>Official Chapter</span>
          </div>

          {society.link ? (
            <a
              href={society.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-[--color-navy] font-bold text-xs tracking-widest uppercase hover:text-[--color-gold] transition-colors gap-1 group/link"
              aria-label={`Explore ${society.fullName}`}
            >
              <span>EXPLORE</span>
              <span className="transition-transform group-hover/link:translate-x-1">&rarr;</span>
            </a>
          ) : (
            <Link
              href="/contact"
              className="inline-flex items-center justify-center text-[--color-navy] font-bold text-xs tracking-widest uppercase hover:text-[--color-gold] transition-colors gap-1 group/link"
            >
              <span>JOIN</span>
              <span className="transition-transform group-hover/link:translate-x-1">&rarr;</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
