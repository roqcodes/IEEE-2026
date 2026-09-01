import { branchMeta } from "@/data/branch";

export interface ArchiveCategory {
  id: string;
  label: string;
  href: string;
  count?: number;
}

export const archiveCategories: ArchiveCategory[] = [
  { id: "events", label: "Events", href: "/events" },
  { id: "photos", label: "Photos", href: "/gallery" },
  { id: "team", label: "Teams", href: "/execom" },
  { id: "achievements", label: "Achievements", href: "/achievements" },
  { id: "projects", label: "Projects", href: "/#projects" },
];

export function getArchiveYears(endYear = new Date().getFullYear()) {
  const years: number[] = [];
  for (let y = endYear; y >= branchMeta.foundingYear; y--) {
    years.push(y);
  }
  return years;
}
