"use client";
/**
 * Events Listing Page — /events
 * Client Component to support upcoming/past filter tabs interactively.
 *
 * Uses data from /data/events.ts.
 * Dynamic routes (/events/[slug]) handled in a separate file.
 */

import { useState } from "react";
import EventCard from "@/components/EventCard";
import PageHeader from "@/components/PageHeader";
import { events } from "@/data/events";

type Filter = "upcoming" | "past" | "all";

export default function EventsPage() {
  const [filter, setFilter] = useState<Filter>("upcoming");

  const filtered = events.filter((e) => {
    if (filter === "all") return true;
    return e.status === filter;
  });

  const tabs: { label: string; value: Filter }[] = [
    { label: "Upcoming", value: "upcoming" },
    { label: "Past Events", value: "past" },
    { label: "All Events", value: "all" },
  ];

  return (
    <>
      <PageHeader
        breadcrumb="Activities"
        title="Events"
        subtitle="Workshops, competitions, seminars, and more — there's always something happening at IEEE CUSAT."
      />

      <section className="py-16 bg-white" aria-label="Events listing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Filter Tabs ── */}
          <div
            className="flex items-center gap-1 mb-10 p-1 bg-[--color-surface] rounded-xl border border-[--color-border] w-fit"
            role="tablist"
            aria-label="Filter events"
          >
            {tabs.map((tab) => (
              <button
                key={tab.value}
                role="tab"
                aria-selected={filter === tab.value}
                id={`tab-${tab.value}`}
                onClick={() => setFilter(tab.value)}
                className={[
                  "px-5 py-2 rounded-lg text-sm font-semibold transition-all",
                  filter === tab.value
                    ? "text-white shadow-sm"
                    : "text-[--color-slate] hover:text-[--color-ieee-blue]",
                ].join(" ")}
                style={
                  filter === tab.value
                    ? { background: "var(--color-ieee-blue)" }
                    : {}
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── Events Grid ── */}
          {filtered.length > 0 ? (
            <div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              role="tabpanel"
              aria-labelledby={`tab-${filter}`}
            >
              {filtered.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-[--color-muted]">
              <p className="text-5xl mb-4">📅</p>
              <p className="text-lg font-medium">No events found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
