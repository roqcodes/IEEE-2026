/**
 * /data/societies.ts
 * IEEE Technical Societies / Chapters under CUSAT Student Branch.
 */

export interface Society {
  id: string;
  name: string;
  fullName: string;
  logo: string;           // path relative to /public
  color: string;          // accent color (Tailwind inline or hex) for card styling
  description: string;
  link?: string;          // external IEEE page or internal page
  tags: string[];
}

export const societies: Society[] = [
  {
    id: "cs",
    name: "CS Chapter",
    fullName: "IEEE Computer Society",
    logo: "/images/societies/cs.svg",
    color: "#0062b1",
    description:
      "Fostering computer science innovation through talks, hackathons, and project mentorship. One of the largest IEEE societies globally.",
    link: "https://www.computer.org",
    tags: ["Computing", "Software", "AI/ML"],
  },
  {
    id: "ras",
    name: "RAS Chapter",
    fullName: "IEEE Robotics & Automation Society",
    logo: "/images/societies/ras.svg",
    color: "#e63946",
    description:
      "Advancing robotics and intelligent systems — from wheeled robots to autonomous drones and beyond.",
    link: "https://www.ieee-ras.org",
    tags: ["Robotics", "Automation", "Drones"],
  },
  {
    id: "wie",
    name: "WIE Affinity Group",
    fullName: "IEEE Women in Engineering",
    logo: "/images/societies/wie.svg",
    color: "#8338ec",
    description:
      "Promoting gender diversity in engineering through mentorship programs, workshops, and networking events.",
    link: "https://wie.ieee.org",
    tags: ["Diversity", "Mentorship", "Leadership"],
  },
  {
    id: "pes",
    name: "PES Chapter",
    fullName: "IEEE Power & Energy Society",
    logo: "/images/societies/pes.svg",
    color: "#f4a261",
    description:
      "Exploring power systems, renewable energy, and smart grid technologies through seminars and project competitions.",
    link: "https://ieee-pes.org",
    tags: ["Power Systems", "Renewables", "Smart Grid"],
  },
  {
    id: "comm",
    name: "ComSoc Chapter",
    fullName: "IEEE Communications Society",
    logo: "/images/societies/comsoc.svg",
    color: "#2a9d8f",
    description:
      "Covering advances in telecommunications, 5G, networking, and signal processing.",
    link: "https://www.comsoc.org",
    tags: ["Telecom", "5G", "Networking"],
  },
  {
    id: "sight",
    name: "SIGHT Group",
    fullName: "Special Interest Group on Humanitarian Technology",
    logo: "/images/societies/sight.svg",
    color: "#e9c46a",
    description:
      "Applying engineering skills to solve real-world humanitarian and community challenges.",
    link: "https://sight.ieee.org",
    tags: ["Social Impact", "Community", "Humanitarian"],
  },
];
