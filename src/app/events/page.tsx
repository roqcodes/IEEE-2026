"use client";

import { useState } from "react";
import EventCard from "@/components/EventCard";
import PageHeader from "@/components/PageHeader";
import { events } from "@/data/events";

type Filter = "upcoming" | "past" | "all" | "live";

const boxColors = ['bg-red-50', 'bg-blue-50', 'bg-green-50', 'bg-yellow-50', 'bg-purple-50', 'bg-pink-50', 'bg-orange-50', 'bg-teal-50'];
export default function EventsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = events.filter((e) => {
    if (filter === "all") return true;
    return e.status === filter;
  });

  const tabs: { label: string; value: Filter }[] = [
    { label: "LIVE NOW", value: "live" },
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

      <section className="relative border-t border-gray-200 py-24" aria-label="Events listing">
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
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
                    ? "bg-[#0A2540] text-white"
                    : "bg-white text-[--color-navy] hover:bg-[#0A2540] hover:text-white"
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
              {filtered.map((event, idx) => (
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
