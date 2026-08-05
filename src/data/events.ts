/**
 * /data/events.ts
 * Centralized events data source.
 * Replace the array below with a Supabase/DB fetch when ready.
 * Each event has a unique `slug` used for /events/[slug] dynamic routes.
 */

export interface Event {
  slug: string;
  title: string;
  date: string;           // ISO 8601 date string e.g. "2025-09-15"
  endDate?: string;
  location: string;
  description: string;   // short (used in cards)
  body?: string;          // full description (used in detail page)
  image: string;          // path relative to /public or absolute URL
  category: "workshop" | "seminar" | "competition" | "social" | "other";
  status: "upcoming" | "past" | "live";
  registrationLink?: string;
}

export const events: Event[] = [
  {
    slug: "techsprint-2025",
    title: "TechSprint 2025 — National Hackathon",
    date: "2025-09-20",
    endDate: "2025-09-22",
    location: "CUSAT Campus, Kochi",
    description:
      "A 48-hour pan-India hackathon challenging students to build solutions in AI, IoT, and sustainability.",
    body: "TechSprint 2025 is the flagship annual hackathon organized by IEEE CUSAT Student Branch. Teams of 2–4 will compete over 48 hours to prototype impactful solutions across three tracks: Artificial Intelligence, Internet of Things, and Sustainability & Green Tech. Prizes worth ₹1,50,000 are up for grabs along with internship opportunities with partner companies.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
    category: "competition",
    status: "upcoming",
    registrationLink: "https://forms.google.com",
  },
  {
    slug: "iot-workshop-2025",
    title: "IoT & Embedded Systems Workshop",
    date: "2025-08-10",
    endDate: "2025-08-11",
    location: "ECE Seminar Hall, CUSAT",
    description:
      "Hands-on two-day workshop covering ESP32, MQTT, and real-world sensor integrations.",
    body: "This intensive two-day workshop walks participants through the full IoT development stack — from hardware (ESP32, sensors, actuators) to cloud (AWS IoT Core, MQTT). All components and kits are provided. Open to all branches; no prior hardware experience required.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    category: "workshop",
    status: "upcoming",
    registrationLink: "https://forms.google.com",
  },
  {
    slug: "ai-seminar-2025",
    title: "Frontiers of AI — Expert Seminar Series",
    date: "2025-07-05",
    location: "Online (Zoom)",
    description:
      "Industry experts from Google DeepMind and OpenAI discuss the current and future landscape of AI.",
    body: "This virtual seminar series brought together leading AI researchers and practitioners. Sessions covered large language models, responsible AI, and career pathways in machine learning. Over 600 students attended across 3 sessions.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
    category: "seminar",
    status: "past",
  },
  {
    slug: "code-relay-2024",
    title: "Code Relay 2024",
    date: "2024-11-18",
    location: "CUSAT Campus",
    description:
      "A team-based competitive programming relay where code is passed between teammates in timed rounds.",
    body: "Code Relay 2024 saw 35 teams battle through 5 programming rounds over 3 hours. Problems ranged from greedy algorithms to dynamic programming. The winning team cracked all 15 problems within the time limit.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    category: "competition",
    status: "past",
  },
  {
    slug: "freshers-orientation-2024",
    title: "Freshers' Orientation & IEEE Induction",
    date: "2024-08-25",
    location: "Main Auditorium, CUSAT",
    description:
      "Welcome ceremony for new students with an introduction to IEEE and the student branch activities.",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
    category: "social",
    status: "past",
  },
  {
    slug: "pcb-design-workshop-2024",
    title: "PCB Design Bootcamp",
    date: "2024-10-05",
    endDate: "2024-10-06",
    location: "Electronics Lab, CUSAT",
    description:
      "Beginner-friendly bootcamp on schematic design and PCB layout using KiCad.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop",
    category: "workshop",
    status: "past",
  },
];

/** Helper: get a single event by slug */
export function getEventBySlug(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug);
}

/** Helper: get all upcoming events sorted by date ascending */
export function getUpcomingEvents(): Event[] {
  return events
    .filter((e) => e.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/** Helper: get all past events sorted by date descending */
export function getPastEvents(): Event[] {
  return events
    .filter((e) => e.status === "past")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
