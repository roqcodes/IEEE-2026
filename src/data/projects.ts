export interface Project {
  id: string;
  title: string;
  students: string[];
  chapter: string;
  technology: string[];
  achievement?: string;
  image: string;
  github?: string;
  demo?: string;
  featured?: boolean;
  completedDate?: string;
}

export const projects: Project[] = [
  {
    id: "smart-grid-monitor",
    title: "Smart Grid Load Monitor",
    students: ["Aditya Kumar", "Priya Nair"],
    chapter: "IEEE PES",
    technology: ["ESP32", "MQTT", "React"],
    achievement: "Presented at IEEE Kerala Section Congress 2024",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2400&auto=format&fit=crop",
    github: "https://github.com",
    featured: true,
    completedDate: "2024-11-15",
  },
  {
    id: "autonomous-rover",
    title: "Autonomous Campus Rover",
    students: ["Rohan Das", "Kiran Raj"],
    chapter: "IEEE RAS",
    technology: ["ROS2", "Computer Vision", "LiDAR"],
    achievement: "2nd place — IEEE RAS Kerala Hackathon",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2400&auto=format&fit=crop",
    github: "https://github.com",
    featured: true,
    completedDate: "2025-02-20",
  },
  {
    id: "sight-water-quality",
    title: "Community Water Quality Sensor",
    students: ["Divya Pillai", "Vishnu Varma"],
    chapter: "IEEE SIGHT",
    technology: ["Arduino", "IoT", "Data Logging"],
    achievement: "Deployed at two Kochi community centres",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2400&auto=format&fit=crop",
    featured: true,
    completedDate: "2024-09-10",
  },
];

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}
