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

const sampleImages: Record<Event["category"], string> = {
  workshop:    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
  seminar:     "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
  competition: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  social:      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
  other:       "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
};

interface EventCardProps {
  event: Event;
  compact?: boolean;
}

function formatDateStr(iso: string) {
  const date = new Date(iso);
  const month = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const day = date.toLocaleDateString("en-US", { day: "2-digit" });
  return { month, day };
}

export default function EventCard({ event, compact = false }: EventCardProps) {
  const accentColor = categoryColors[event.category];
  const { month, day } = formatDateStr(event.date);

  return (
    <article className="group flex flex-col shadow-sm hover:shadow-xl transition-shadow bg-white border border-[--color-border] h-full rounded-[32px] overflow-hidden">
      {/* ── Event Image ── */}
      <div
        className="w-full relative overflow-hidden flex-shrink-0 bg-gray-100"
        style={{ height: compact ? "160px" : "220px" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={sampleImages[event.category]}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay gradient for styling */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-row flex-1 p-6 lg:p-8 bg-white gap-6">
        {/* Left: Date */}
        <div className="flex flex-col items-center justify-start pt-1">
          <span className="text-[--color-navy] font-bold text-sm uppercase tracking-widest">{month}</span>
          <span className="text-[--color-navy] font-bold text-4xl mt-1">{day}</span>
        </div>

        {/* Right: Content */}
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-1 text-[--color-muted] text-xs font-bold uppercase tracking-widest mb-3">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </div>

          <h3 className={`text-[--color-navy] font-bold leading-tight line-clamp-2 mb-3 ${compact ? "text-xl" : "text-2xl"}`}>
            {event.title}
          </h3>

          <p className="text-[--color-muted] text-sm line-clamp-2 leading-relaxed flex-1 mb-4">
            {event.description}
          </p>

          <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[--color-navy]">
              <svg className="w-4 h-4 text-[--color-gold]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {event.status === "live" ? "Live Now" : event.status === "upcoming" ? "Upcoming Event" : "Past Event"}
            </div>
            
            <Link
              href={`/events/${event.slug}`}
              className="inline-flex items-center justify-center text-[--color-navy] font-bold text-xs tracking-widest uppercase hover:text-[--color-gold] transition-colors"
              aria-label={`View details for ${event.title}`}
            >
              DETAILS &rarr;
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
