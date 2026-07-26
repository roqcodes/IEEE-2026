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
    <article
      className={[
        "bg-white rounded-xl border border-[--color-border] overflow-hidden flex flex-col",
        "shadow-sm hover:shadow-md transition-shadow duration-200 group",
        compact ? "text-sm" : "",
      ].join(" ")}
    >
      {/* ── Image placeholder ── */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ height: compact ? "140px" : "180px", background: "#e6f2fa" }}
      >
        {/* Status badge */}
        <span
          className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold text-white z-10"
          style={{
            background:
              event.status === "upcoming" ? "var(--color-ieee-blue)" : "#718096",
          }}
        >
          {event.status === "upcoming" ? "Upcoming" : "Past"}
        </span>

        {/* Category label */}
        <span
          className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-semibold text-white z-10 capitalize"
          style={{ background: accentColor }}
        >
          {event.category}
        </span>

        {/* Decorative gradient fill (shown when no real image is loaded) */}
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
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Date + Location */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-[--color-muted]">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(event.date)}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </span>
        </div>

        {/* Title */}
        <h3
          className={[
            "font-bold text-[--color-navy] leading-snug group-hover:text-[--color-ieee-blue] transition-colors",
            compact ? "text-base" : "text-lg",
          ].join(" ")}
        >
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[--color-slate] line-clamp-2 leading-relaxed flex-1">
          {event.description}
        </p>

        {/* CTA */}
        <div className="mt-auto pt-2 flex items-center gap-3">
          <Link
            href={`/events/${event.slug}`}
            className="text-sm font-semibold text-[--color-ieee-blue] hover:underline flex items-center gap-1"
            aria-label={`View details for ${event.title}`}
          >
            View Details
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          {event.status === "upcoming" && event.registrationLink && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-white px-3 py-1 rounded transition-colors"
              style={{ background: "var(--color-ieee-blue)" }}
            >
              Register
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
