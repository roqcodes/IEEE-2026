import HomeEventCard from "@/components/home/HomeEventCard";
import type { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
  compact?: boolean;
}

export default function EventCard({ event }: EventCardProps) {
  return <HomeEventCard event={event} />;
}
