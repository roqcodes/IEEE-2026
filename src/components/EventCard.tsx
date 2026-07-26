/**
 * EventCard — reusable card for displaying an event in a grid/list.
 * Used by /events and /home (featured event).
 *
 * Props:
 *   event   — Event object from /data/events
 *   compact — if true, renders a smaller card variant
 */

import Link from "next/link";
import type { Event } from "@/data/events";

const categoryColors: Record<Event["category"], string> = {
  workshop:    "#2a9d8f",
  seminar:     "#0062b1",
  competition: "#e63946",
  social:      "#f4a261",
  other:       "#718096",
};

interface EventCardProps {
  event: Event;
  compact?: boolean;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function EventCard({ event, compact = false }: EventCardProps) {
  const accentColor = categoryColors[event.category];

  return (
    <article className="group flex flex-col shadow-sm hover:shadow-xl transition-shadow bg-[--color-surface-cream] border border-[--color-border]">
      {/* ── Image placeholder ── */}
      <div
        className="w-full relative overflow-hidden flex-shrink-0"
        style={{ height: compact ? "140px" : "200px", background: "#e6f2fa" }}
      >
        {/* Decorative gradient fill */}
        <div
          className="absolute inset-0 flex items-center justify-center text-white/30"
          style={{
            background: `linear-gradient(135deg, ${accentColor}33 0%, ${accentColor}66 100%)`,
          }}
          aria-hidden="true"
        >
          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-6 lg:p-8 bg-[--color-surface-cream]">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-black font-bold text-xs uppercase tracking-widest">{event.category}</span>
          <span className="text-gray-400">|</span>
          <span className="text-black font-bold text-xs uppercase tracking-widest">
            {event.status === "upcoming" ? "UPCOMING" : "PAST"}
          </span>
        </div>

        <h3 className={`text-black font-bold leading-tight line-clamp-2 mb-4 ${compact ? "text-xl" : "text-2xl"}`}>
          {event.title}
        </h3>

        <div className="flex flex-wrap items-center gap-3 text-sm text-[--color-muted] mb-6">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(event.date)}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </span>
        </div>

        <p className="text-[--color-muted] text-sm line-clamp-3 leading-relaxed flex-1 mb-6">
          {event.description}
        </p>

        {/* CTA */}
        <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center justify-center px-6 py-2 border-2 border-[--color-navy] text-[--color-navy] font-bold text-xs tracking-widest uppercase hover:bg-[--color-navy] hover:text-white transition-colors"
            aria-label={`View details for ${event.title}`}
          >
            VIEW DETAILS
          </Link>
          {event.status === "upcoming" && event.registrationLink && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-2 bg-[--color-navy] border-2 border-[--color-navy] text-white font-bold text-xs tracking-widest uppercase hover:bg-[--color-gold] hover:border-[--color-gold] transition-colors"
            >
              REGISTER
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
