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
      <style>{`
        @keyframes slideDownBar {
          from { transform: scaleY(0); transform-origin: top; opacity: 0; }
          to { transform: scaleY(1); transform-origin: top; opacity: 1; }
        }
        @keyframes slideRightLine {
          from { transform: scaleX(0); transform-origin: left; opacity: 0; }
          to { transform: scaleX(1); transform-origin: left; opacity: 1; }
        }
        .animate-bar-down { animation: slideDownBar 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .animate-line-right { animation: slideRightLine 3.5s cubic-bezier(0.22, 1, 0.36, 1) 0.6s forwards; opacity: 0; }
      `}</style>
      <div className="relative">
        <div 
          className="absolute top-20 left-0 bottom-0 w-6 md:w-8 lg:w-12 bg-[#00A97E] z-40 shadow-[4px_0_15px_rgba(0,0,0,0.1)] animate-bar-down"
          style={{ borderBottomRightRadius: '16px' }}
          aria-hidden="true"
        />
        <div 
          className="absolute top-20 left-0 w-full h-[6px] bg-[#00A97E] z-40 animate-line-right"
          aria-hidden="true"
        />
        <PageHeader
          breadcrumb="Activities"
          title="Events"
          subtitle="Workshops, competitions, seminars, and more — there's always something happening at IEEE CUSAT."
        />
      </div>

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
