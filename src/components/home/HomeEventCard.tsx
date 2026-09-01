"use client";

import Link from "next/link";
import type { Event } from "@/data/events";
import PremiumCard from "@/components/home/PremiumCard";
import { CARD_HOVER_CLASS } from "@/components/home/cardMotion";

const categoryLabels: Record<Event["category"], string> = {
  workshop: "Workshop",
  seminar: "Seminar",
  competition: "Competition",
  social: "Social",
  other: "Event",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString("en-IN", { day: "2-digit" }),
    month: d.toLocaleDateString("en-IN", { month: "short" }),
  };
}

export default function HomeEventCard({ event }: { event: Event }) {
  const date = formatDate(event.date);

  return (
    <PremiumCard as="article">
      <div className="flex items-stretch border-b border-ieee-border">
        <div className={`flex flex-col items-center justify-center px-5 py-6 min-w-[76px] bg-gradient-to-b from-ieee-sky to-ieee-sky-muted border-r border-ieee-border group-hover:from-ieee-blue/10 group-hover:to-ieee-sky ${CARD_HOVER_CLASS}`}>
          <span className="text-caption">{date.month}</span>
          <span className="font-serif text-3xl font-semibold text-ieee-navy tabular-nums leading-none mt-1 group-hover:text-ieee-blue transition-colors duration-200 ease-linear delay-0">
            {date.day}
          </span>
        </div>
        <div className="flex-1 px-5 py-5 flex flex-col justify-center">
          <span className="text-caption mb-2">
            {categoryLabels[event.category]}
            {event.status === "upcoming" && " · Upcoming"}
          </span>
          <h3 className="font-semibold text-ieee-navy leading-snug line-clamp-2 group-hover:text-ieee-blue transition-colors duration-200 ease-linear delay-0">
            {event.title}
          </h3>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <p className="text-body line-clamp-2 flex-1">{event.description}</p>
        <div className="flex items-center justify-between mt-5 pt-5 border-t border-ieee-border/80">
          <span className="text-[11px] text-stone flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-ieee-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </span>
          <Link
            href={`/events/${event.slug}`}
            className="text-caption inline-flex items-center gap-1 hover:text-ieee-blue-dark transition-colors duration-200 ease-linear delay-0"
          >
            Details
            <svg className="w-3 h-3 transition-transform duration-200 ease-linear delay-0 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </PremiumCard>
  );
}
