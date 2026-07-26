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
    photo: "/images/execom/arjun.jpg",
    linkedin: "https://linkedin.com",
    branch: "Electronics & Communication Engineering",
    year: "4th Year B.Tech",
  },
  {
    id: "vice-chair",
    name: "Sneha Krishnan",
    role: "Vice Chairperson",
    photo: "/images/execom/sneha.jpg",
    linkedin: "https://linkedin.com",
    branch: "Computer Science Engineering",
    year: "4th Year B.Tech",
  },
  {
    id: "secretary",
    name: "Rohan Das",
    role: "Secretary",
    photo: "/images/execom/rohan.jpg",
    linkedin: "https://linkedin.com",
    branch: "Electrical Engineering",
    year: "3rd Year B.Tech",
  },
  {
    id: "treasurer",
    name: "Priya Nair",
    role: "Treasurer",
    photo: "/images/execom/priya.jpg",
    linkedin: "https://linkedin.com",
    branch: "Electronics & Communication Engineering",
    year: "3rd Year B.Tech",
  },
  {
    id: "technical-head",
    name: "Aditya Kumar",
    role: "Technical Head",
    photo: "/images/execom/aditya.jpg",
    linkedin: "https://linkedin.com",
    branch: "Computer Science Engineering",
    year: "3rd Year B.Tech",
  },
  {
    id: "events-head",
    name: "Divya Pillai",
    role: "Events Head",
    photo: "/images/execom/divya.jpg",
    linkedin: "https://linkedin.com",
    branch: "Information Technology",
    year: "3rd Year B.Tech",
  },
  {
    id: "media-head",
    name: "Kiran Raj",
    role: "Media & Publications Head",
    photo: "/images/execom/kiran.jpg",
    linkedin: "https://linkedin.com",
    branch: "Electronics & Communication Engineering",
    year: "2nd Year B.Tech",
  },
  {
    id: "web-head",
    name: "Ananya Singh",
    role: "Web & Design Head",
    photo: "/images/execom/ananya.jpg",
    linkedin: "https://linkedin.com",
    branch: "Computer Science Engineering",
    year: "2nd Year B.Tech",
  },
  {
    id: "pr-head",
    name: "Vishnu Varma",
    role: "Public Relations Head",
    photo: "/images/execom/vishnu.jpg",
    linkedin: "https://linkedin.com",
    branch: "Mechanical Engineering",
    year: "3rd Year B.Tech",
  },
];
