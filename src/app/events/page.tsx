"use client";

import { useState } from "react";
import EventCard from "@/components/EventCard";
import PageHeader from "@/components/PageHeader";
import PageSection from "@/components/home/PageSection";
import FilterTabs from "@/components/home/FilterTabs";
import PremiumCard from "@/components/home/PremiumCard";
import { Stagger, StaggerItem } from "@/components/home/motion";
import { events } from "@/data/events";

type Filter = "upcoming" | "past" | "all" | "live";

export default function EventsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = events.filter((e) => {
    if (filter === "all") return true;
    return e.status === filter;
  });

  const tabs: { label: string; value: Filter }[] = [
    { label: "Live Now", value: "live" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Past Events", value: "past" },
    { label: "All Events", value: "all" },
  ];

  return (
    <div className="site-page">
      <PageHeader
        breadcrumb="Activities"
        title="Events"
        subtitle="Explore the workshops, competitions, seminars, and student activities through which IEEE CUSAT Student Branch brings learning, collaboration, and innovation to campus."
      />

      <PageSection aria-label="Events listing" sideGlow="left">
        <FilterTabs tabs={tabs} value={filter} onChange={setFilter} ariaLabel="Filter events" />

        {filtered.length > 0 ? (
          <Stagger
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            stagger={0.08}
          >
            {filtered.map((event) => (
              <StaggerItem key={event.slug}>
                <EventCard event={event} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <PremiumCard className="text-center py-20 px-8">
            <p className="text-card-title mb-2">No events found</p>
            <p className="text-body">Check back soon for upcoming IEEE CUSAT activities.</p>
          </PremiumCard>
        )}
      </PageSection>
    </div>
  );
}
