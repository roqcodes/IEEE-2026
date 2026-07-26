"use client";

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
    { label: "UPCOMING", value: "upcoming" },
    { label: "PAST EVENTS", value: "past" },
    { label: "ALL EVENTS", value: "all" },
  ];

  return (
    <>
      <PageHeader
        breadcrumb="Activities"
        title="Events"
        subtitle="Workshops, competitions, seminars, and more — there's always something happening at IEEE CUSAT."
      />

      <section className="py-24 bg-[#FAFAFA]" aria-label="Events listing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Filter Tabs ── */}
          <div
            className="flex flex-wrap items-center gap-2 mb-12"
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
                className={`px-8 py-3 border-2 border-[--color-navy] text-xs font-bold tracking-widest uppercase transition-colors ${
                  filter === tab.value
                    ? "bg-[--color-navy] text-white"
                    : "bg-white text-[--color-navy] hover:bg-[--color-navy] hover:text-white"
                }`}
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
            <div className="text-center py-32 bg-white border border-[--color-border] text-[--color-muted] shadow-sm">
              <p className="text-4xl mb-6">📅</p>
              <p className="text-xl font-bold font-serif text-[--color-navy]">No events found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
