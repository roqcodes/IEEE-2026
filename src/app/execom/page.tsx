import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PageSection from "@/components/home/PageSection";
import SectionHeader from "@/components/home/SectionHeader";
import PremiumCard from "@/components/home/PremiumCard";
import { Stagger, StaggerItem } from "@/components/home/motion";
import { execomMembers } from "@/data/execom";
import type { ExecomMember } from "@/data/execom";

export const metadata: Metadata = {
  title: "Executive Committee",
  description:
    "Meet the executive committee of the IEEE CUSAT Student Branch — the team driving our activities and growth.",
};

export default function ExecomPage() {
  const leadership = execomMembers.slice(0, 2);
  const team = execomMembers.slice(2);

  return (
    <div className="site-page">
      <PageHeader
        breadcrumb="Our Team"
        title="Executive Committee"
        subtitle="Meet the dedicated team leading IEEE CUSAT Student Branch this year."
      />

      <PageSection aria-labelledby="leadership-heading" sideGlow="right">
        <div className="mb-14">
          <SectionHeader
            eyebrow="Leadership"
            title="Branch Leadership"
            titleId="leadership-heading"
            align="center"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-5">
          {leadership.map((member) => (
            <MemberCard key={member.id} member={member} large />
          ))}
        </div>
      </PageSection>

      <PageSection variant="accent" aria-labelledby="team-heading" sideGlow="left">
        <div className="mb-14">
          <SectionHeader
            eyebrow="Core Team"
            title="Executive Members"
            titleId="team-heading"
            align="center"
          />
        </div>
        <Stagger className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" stagger={0.06}>
          {team.map((member) => (
            <StaggerItem key={member.id}>
              <MemberCard member={member} />
            </StaggerItem>
          ))}
        </Stagger>
      </PageSection>
    </div>
  );
}

function MemberCard({ member, large = false }: { member: ExecomMember; large?: boolean }) {
  const avatarSize = large ? "w-28 h-28 text-3xl" : "w-20 h-20 text-xl";
  const nameSize = large ? "text-xl" : "text-lg";

  return (
    <PremiumCard className={`text-center p-8 ${large ? "md:min-w-[300px]" : ""}`}>
      <div
        className={`${avatarSize} mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-ieee-blue to-ieee-navy text-white font-serif font-semibold`}
        aria-hidden="true"
      >
        {member.name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")}
      </div>
      <h3 className={`${nameSize} font-semibold text-ieee-navy mt-5`}>{member.name}</h3>
      <p className="text-caption text-ieee-blue mt-2 mb-3">{member.role}</p>
      <p className="text-[11px] text-stone">{member.branch}</p>
      <p className="text-[11px] text-stone">{member.year}</p>
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="inline-flex mt-5 text-stone hover:text-ieee-blue transition-colors duration-200 ease-linear delay-0"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      )}
    </PremiumCard>
  );
}
