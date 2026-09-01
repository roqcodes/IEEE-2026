/**
 * Awards and recognitions documented for IEEE CUSAT Student Branch and its chapters.
 */

export interface Achievement {
  id: string;
  year?: number;
  title: string;
  description: string;
  category: "award" | "recognition";
  issuedBy?: string;
  image?: string;
}

export const achievements: Achievement[] = [
  {
    id: "region-10-exemplary-2025",
    year: 2025,
    title: "IEEE Region 10 Exemplary Student Branch",
    description:
      "IEEE CUSAT Student Branch was recognized as an IEEE Region 10 Exemplary Student Branch in recognition of its outstanding student branch operations and achievements.",
    category: "award",
    issuedBy: "IEEE Student Activities Committee",
    image: "/achievements/ieee-region-10-exemplary-2025.png",
  },
  {
    id: "mtts-large-chapter",
    title: "Large Chapter Award",
    description:
      "IEEE MTT-S CUSAT Student Branch received the Large Chapter Award from the IEEE MTT-S Kerala Chapter.",
    category: "award",
    issuedBy: "IEEE MTT-S Kerala Chapter",
  },
  {
    id: "mtts-outstanding-chapter",
    title: "Outstanding Chapter Award",
    description:
      "IEEE MTT-S CUSAT Student Branch received the Outstanding Chapter Award from the IEEE MTT-S Kerala Chapter.",
    category: "award",
    issuedBy: "IEEE MTT-S Kerala Chapter",
  },
  {
    id: "cass-best-student-branch-chapter",
    title: "Best Student Branch Chapter",
    description:
      "IEEE CASS CUSAT Student Branch was recognized as the Best Student Branch Chapter by the IEEE CASS Kerala Chapter.",
    category: "recognition",
    issuedBy: "IEEE CASS Kerala Chapter",
  },
];
