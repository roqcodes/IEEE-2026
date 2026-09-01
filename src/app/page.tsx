import type { Metadata } from "next";
import HomeHero from "@/components/HomeHero";
import HomeStats from "@/components/home/HomeStats";
import HomeAbout from "@/components/home/HomeAbout";
import HomeAchievements from "@/components/home/HomeAchievements";
import HomeEvents from "@/components/home/HomeEvents";
import HomeSocieties from "@/components/home/HomeSocieties";
import HomeGetInvolved from "@/components/home/HomeGetInvolved";
import HomeJoinCta from "@/components/home/HomeJoinCta";

export const metadata: Metadata = {
  title: "IEEE CUSAT Student Branch",
  description:
    "Official home of IEEE CUSAT Student Branch — technical chapters, events, achievements, and opportunities for engineering students at Cochin University of Science and Technology.",
};

export default function HomePage() {
  return (
    <div className="home-page bg-ieee-sky-muted">
      <HomeHero />
      <HomeStats />
      <HomeAbout />
      <HomeAchievements />
      <HomeEvents />
      <HomeSocieties />
      <HomeGetInvolved />
      <HomeJoinCta />
    </div>
  );
}
