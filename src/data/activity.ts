import { achievements } from "@/data/achievements";
import { events } from "@/data/events";
import { projects } from "@/data/projects";

export type ActivityType =
  | "event"
  | "registration"
  | "workshop"
  | "chapter"
  | "achievement"
  | "project";

export interface ActivityItem {
  id: string;
  date: string;
  type: ActivityType;
  chapter?: string;
  title: string;
  href?: string;
}

/** Auto-built activity stream from branch data. Add manual items to `manualActivity`. */
const manualActivity: ActivityItem[] = [
  {
    id: "wie-mentorship-2025",
    date: "2025-08-01",
    type: "chapter",
    chapter: "WIE",
    title: "Women in Engineering mentorship cohort opens for 2025–26",
    href: "/societies",
  },
];

export function getActivityFeed(limit = 8): ActivityItem[] {
  const fromEvents: ActivityItem[] = events.map((e) => ({
    id: `event-${e.slug}`,
    date: e.date,
    type: e.status === "upcoming" ? ("registration" as const) : ("event" as const),
    chapter: e.chapter,
    title:
      e.status === "upcoming"
        ? `Registration open — ${e.title}`
        : e.title,
    href: `/events/${e.slug}`,
  }));

  const fromAchievements: ActivityItem[] = achievements
    .filter((a) => a.year)
    .map((a) => ({
      id: `achievement-${a.id}`,
      date: `${a.year}-06-01`,
      type: "achievement" as const,
      title: a.title,
      href: "/achievements",
    }));

  const fromProjects: ActivityItem[] = projects
    .filter((p) => p.featured)
    .map((p) => ({
      id: `project-${p.id}`,
      date: p.completedDate ?? "2025-01-01",
      type: "project" as const,
      chapter: p.chapter,
      title: `New project — ${p.title}`,
      href: p.demo ?? p.github,
    }));

  return [...manualActivity, ...fromEvents, ...fromAchievements, ...fromProjects]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
