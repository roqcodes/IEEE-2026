import SectionHeader from "@/components/home/SectionHeader";
import SectionBackdrop from "@/components/home/SectionBackdrop";
import { SectionAccent, SectionSideGlow } from "@/components/home/SectionAccent";
import HomeEventCard from "@/components/home/HomeEventCard";
import { Stagger, StaggerItem } from "@/components/home/motion";
import { getUpcomingEvents, getPastEvents } from "@/data/events";

export default function HomeEvents() {
  const upcoming = getUpcomingEvents();
  const displayEvents = upcoming.length > 0 ? upcoming.slice(0, 3) : getPastEvents().slice(0, 3);
  const isUpcoming = upcoming.length > 0;

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden border-t border-ieee-border"
      aria-labelledby="events-heading"
    >
      <SectionBackdrop variant="sky" />
      <SectionAccent />
      <SectionSideGlow side="right" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 lg:mb-16">
          <SectionHeader
            eyebrow="Activities"
            titleId="events-heading"
            title={isUpcoming ? "Upcoming Events" : "Recent Events"}
            subtitle="Explore the workshops, competitions, seminars, and student activities through which IEEE CUSAT Student Branch brings learning, collaboration, and innovation to campus."
            href="/events"
            linkLabel="View all events"
          />
        </div>

        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.1}>
          {displayEvents.map((event) => (
            <StaggerItem key={event.slug}>
              <HomeEventCard event={event} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
