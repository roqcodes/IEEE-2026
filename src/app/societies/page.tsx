import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PageSection from "@/components/home/PageSection";
import PageCta from "@/components/home/PageCta";
import SocietyCard from "@/components/SocietyCard";
import { Stagger, StaggerItem } from "@/components/home/motion";
import { societies } from "@/data/societies";

export const metadata: Metadata = {
  title: "Societies & Chapters",
  description:
    "Explore the IEEE technical societies and chapters under the IEEE CUSAT Student Branch.",
};

export default function SocietiesPage() {
  return (
    <div className="site-page">
      <PageHeader
        breadcrumb="Our Chapters"
        title="Societies & Chapters"
        subtitle="Discover the technical chapters and affinity groups of IEEE CUSAT Student Branch, where students explore their interests, build skills, and connect with like-minded peers."
      />

      <PageSection aria-label="Societies grid" sideGlow="left">
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
          {societies.map((society) => (
            <StaggerItem key={society.id}>
              <SocietyCard society={society} />
            </StaggerItem>
          ))}
        </Stagger>
      </PageSection>

      <PageCta
        eyebrow="Get Involved"
        title="Interested in Joining a Chapter?"
        description="Reach out to us or attend any of our upcoming events to connect with chapter leads and fellow members."
        primaryHref="/contact"
        primaryLabel="Get in Touch"
        secondaryHref="/events"
        secondaryLabel="Browse Events"
      />
    </div>
  );
}
