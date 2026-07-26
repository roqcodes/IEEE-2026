/**
 * /data/gallery.ts
 * Centralized gallery data source.
 * Each album contains multiple images. New albums/photos can be added here
 * without touching any page code.
 *
 * Swap the static array for a Supabase fetch (e.g. via getGalleryAlbums())
 * when connecting to a real backend.
 */

export interface GalleryImage {
  id: string;
  src: string;      // path relative to /public or absolute URL
  alt: string;
  width: number;    // intrinsic width (used by next/image for layout)
  height: number;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  event: string;    // event name / short label shown as a filter chip
  coverImage: string;
  images: GalleryImage[];
}

export const galleryAlbums: GalleryAlbum[] = [
  {
    id: "techsprint-2024",
    title: "TechSprint 2024",
    event: "TechSprint",
    coverImage: "/images/gallery/techsprint-cover.jpg",
    images: [
      { id: "ts1", src: "/images/gallery/techsprint-1.jpg", alt: "Teams hacking at TechSprint 2024", width: 1200, height: 800 },
      { id: "ts2", src: "/images/gallery/techsprint-2.jpg", alt: "Prize ceremony at TechSprint 2024", width: 1200, height: 800 },
      { id: "ts3", src: "/images/gallery/techsprint-3.jpg", alt: "Mentors at TechSprint 2024", width: 1200, height: 900 },
    ],
  },
  {
    id: "iot-workshop-2024",
    title: "IoT Workshop 2024",
    event: "Workshop",
    coverImage: "/images/gallery/iot-cover.jpg",
    images: [
      { id: "iot1", src: "/images/gallery/iot-1.jpg", alt: "Students assembling IoT kits", width: 1200, height: 800 },
      { id: "iot2", src: "/images/gallery/iot-2.jpg", alt: "Instructor demonstrating ESP32", width: 1200, height: 800 },
    ],
  },
  {
    id: "orientation-2024",
    title: "Freshers Orientation 2024",
    event: "Social",
    coverImage: "/images/gallery/orientation-cover.jpg",
    images: [
      { id: "or1", src: "/images/gallery/orientation-1.jpg", alt: "New members at induction ceremony", width: 1200, height: 800 },
      { id: "or2", src: "/images/gallery/orientation-2.jpg", alt: "Group photo at orientation", width: 1200, height: 800 },
      { id: "or3", src: "/images/gallery/orientation-3.jpg", alt: "Welcome address by Branch Councillor", width: 800, height: 1000 },
    ],
  },
  {
    id: "code-relay-2024",
    title: "Code Relay 2024",
    event: "Competition",
    coverImage: "/images/gallery/coderelay-cover.jpg",
    images: [
      { id: "cr1", src: "/images/gallery/coderelay-1.jpg", alt: "Participants at Code Relay 2024", width: 1200, height: 800 },
      { id: "cr2", src: "/images/gallery/coderelay-2.jpg", alt: "Winners of Code Relay 2024", width: 1200, height: 800 },
    ],
  },
];

/** Return all albums */
export function getAllAlbums(): GalleryAlbum[] {
  return galleryAlbums;
}

/** Return distinct event-category labels for filter UI */
export function getAlbumCategories(): string[] {
  const seen = new Set<string>();
  return galleryAlbums
    .map((a) => a.event)
    .filter((e) => (seen.has(e) ? false : seen.add(e)));
}
