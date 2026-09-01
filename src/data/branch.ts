/**
 * Branch metadata — update foundingYear when verified from records.
 */

export const branchMeta = {
  name: "IEEE CUSAT Student Branch",
  shortName: "IEEE CUSAT SB",
  university: "Cochin University of Science and Technology",
  location: "Kochi, Kerala, India",
  section: "IEEE Kerala Section",
  foundingYear: 2001,
  heroImage:
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2400&auto=format&fit=crop",
  distinction: {
    label: "IEEE Region 10 Exemplary Student Branch",
    year: 2025,
  },
} as const;

export function getBranchAge(referenceYear = new Date().getFullYear()) {
  return referenceYear - branchMeta.foundingYear;
}
