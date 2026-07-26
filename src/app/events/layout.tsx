/**
 * Events section layout — provides metadata for the /events route group.
 * The listing page itself is a Client Component (for filter tabs), so
 * metadata is exported here from this Server Component layout instead.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Browse all IEEE CUSAT Student Branch events — workshops, seminars, hackathons, and more.",
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
