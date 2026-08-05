/**
 * /data/execom.ts
 * Executive Committee members for the current year.
 * Add/update members here to reflect real team without code changes.
 */

export interface ExecomMember {
  id: string;
  name: string;
  role: string;
  photo: string;   // path relative to /public
  linkedin?: string;
  email?: string;
  branch: string;  // Department / Academic branch
  year: string;    // e.g. "3rd Year B.Tech"
}

export const execomMembers: ExecomMember[] = [
  {
    id: "chairperson",
    name: "Arjun Menon",
    role: "Chairperson",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    linkedin: "https://linkedin.com",
    branch: "Electronics & Communication Engineering",
    year: "4th Year B.Tech",
  },
  {
    id: "vice-chair",
    name: "Sneha Krishnan",
    role: "Vice Chairperson",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    linkedin: "https://linkedin.com",
    branch: "Computer Science Engineering",
    year: "4th Year B.Tech",
  },
  {
    id: "secretary",
    name: "Rohan Das",
    role: "Secretary",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    linkedin: "https://linkedin.com",
    branch: "Electrical Engineering",
    year: "3rd Year B.Tech",
  },
  {
    id: "treasurer",
    name: "Priya Nair",
    role: "Treasurer",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    linkedin: "https://linkedin.com",
    branch: "Electronics & Communication Engineering",
    year: "3rd Year B.Tech",
  },
  {
    id: "technical-head",
    name: "Aditya Kumar",
    role: "Technical Head",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    linkedin: "https://linkedin.com",
    branch: "Computer Science Engineering",
    year: "3rd Year B.Tech",
  },
  {
    id: "events-head",
    name: "Divya Pillai",
    role: "Events Head",
    photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=1974&auto=format&fit=crop",
    linkedin: "https://linkedin.com",
    branch: "Information Technology",
    year: "3rd Year B.Tech",
  },
  {
    id: "media-head",
    name: "Kiran Raj",
    role: "Media & Publications Head",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
    linkedin: "https://linkedin.com",
    branch: "Electronics & Communication Engineering",
    year: "2nd Year B.Tech",
  },
  {
    id: "web-head",
    name: "Ananya Singh",
    role: "Web & Design Head",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
    linkedin: "https://linkedin.com",
    branch: "Computer Science Engineering",
    year: "2nd Year B.Tech",
  },
  {
    id: "pr-head",
    name: "Vishnu Varma",
    role: "Public Relations Head",
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop",
    linkedin: "https://linkedin.com",
    branch: "Mechanical Engineering",
    year: "3rd Year B.Tech",
  },
];
