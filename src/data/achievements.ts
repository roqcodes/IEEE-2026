/**
 * /data/achievements.ts
 * Awards, recognitions, and milestones of IEEE CUSAT Student Branch.
 */

export interface Achievement {
  id: string;
  year: number;
  title: string;
  description: string;
  category: "award" | "recognition" | "milestone" | "ranking";
  issuedBy?: string;
}

export const achievements: Achievement[] = [
  {
    id: "best-sb-2024",
    year: 2024,
    title: "Best Student Branch Award",
    description:
      "Recognized as the Best IEEE Student Branch in Kerala Section for outstanding activities, membership growth, and student engagement in 2024.",
    category: "award",
    issuedBy: "IEEE Kerala Section",
  },
  {
    id: "mhv-2024",
    year: 2024,
    title: "Most Volunteer Hours — Kerala Section",
    description:
      "Logged the highest cumulative volunteer hours among all student branches in the Kerala Section for 2024.",
    category: "recognition",
    issuedBy: "IEEE Kerala Section",
  },
  {
    id: "techsprint-national-2023",
    year: 2023,
    title: "TechSprint — National Level Competition",
    description:
      "First IEEE student branch in Kerala to host a national-level hackathon attracting 500+ participants from 80+ colleges across India.",
    category: "milestone",
  },
  {
    id: "top10-india-2023",
    year: 2023,
    title: "Top 10 Student Branches in India",
    description:
      "Ranked in the Top 10 IEEE Student Branches in India by the IEEE India Council based on activities, publications, and membership.",
    category: "ranking",
    issuedBy: "IEEE India Council",
  },
  {
    id: "energize-2022",
    year: 2022,
    title: "Energize Award",
    description:
      "Received the Energize Award from IEEE Region 10 for exceptional performance in member engagement and technical activities.",
    category: "award",
    issuedBy: "IEEE Region 10 (Asia-Pacific)",
  },
  {
    id: "membership-500-2022",
    year: 2022,
    title: "500+ IEEE Members Milestone",
    description:
      "Became the first CUSAT branch to cross 500 active IEEE members, making it one of the largest student branches in Kerala.",
    category: "milestone",
  },
  {
    id: "best-sb-2021",
    year: 2021,
    title: "Best Student Branch Award",
    description:
      "Second consecutive year as the Best IEEE Student Branch in Kerala Section despite challenges posed by the COVID-19 pandemic through virtual events.",
    category: "award",
    issuedBy: "IEEE Kerala Section",
  },
  {
    id: "founded-2008",
    year: 2008,
    title: "Student Branch Founded",
    description:
      "IEEE CUSAT Student Branch was officially chartered, beginning a journey of technical excellence and student development at CUSAT.",
    category: "milestone",
  },
];
