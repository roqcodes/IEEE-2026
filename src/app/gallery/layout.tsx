/**
 * Gallery section layout — provides metadata for the /gallery route.
 * The page is a Client Component (lightbox + filters), so metadata lives here.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photo gallery of IEEE CUSAT Student Branch events, workshops, and activities.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
