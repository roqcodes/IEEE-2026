import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import PageSection from "@/components/home/PageSection";
import SectionHeader from "@/components/home/SectionHeader";
import PremiumCard from "@/components/home/PremiumCard";
import { Stagger, StaggerItem } from "@/components/home/motion";
import { achievements } from "@/data/achievements";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Awards, recognitions, and milestones achieved by the IEEE CUSAT Student Branch.",
};

const categoryLabels: Record<string, string> = {
  award: "Award",
  recognition: "Recognition",
  milestone: "Milestone",
  ranking: "Ranking",
};

export default function AchievementsPage() {
  const dated = achievements.filter((a) => a.year);
  const undated = achievements.filter((a) => !a.year);
  const byYear = dated.reduce<Record<number, typeof achievements>>((acc, a) => {
    const year = a.year as number;
    acc[year] = acc[year] ?? [];
    acc[year].push(a);
    return acc;
  }, {});
  const sortedYears = Object.keys(byYear).map(Number).sort((a, b) => b - a);

  return (
    <div className="site-page">
      <PageHeader
        breadcrumb="Our Story"
        title="Achievements"
        subtitle="Explore the awards, recognitions, and milestones that reflect the work and achievements of IEEE CUSAT Student Branch and its technical chapters."
      />

      <PageSection aria-label="Achievements timeline" sideGlow="right">
        <div className="max-w-4xl mx-auto space-y-20">
          {sortedYears.map((year) => (
            <div key={year}>
              <div className="flex items-center gap-6 mb-8">
                <span className="text-caption px-4 py-2 bg-ieee-blue text-white">{year}</span>
                <div className="flex-1 h-px bg-ieee-border" aria-hidden="true" />
              </div>

              <Stagger className="space-y-4" stagger={0.08}>
                {byYear[year].map((item) => (
                  <StaggerItem key={item.id}>
                    <PremiumCard as="article">
                      <div className="flex flex-col sm:flex-row gap-6 p-6 lg:p-8">
                        {item.image && (
                          <div className="relative w-full sm:w-48 h-40 sm:h-auto shrink-0 bg-gradient-to-br from-ieee-sky to-ieee-sky-muted">
                            <Image
                              src={item.image}
                              alt={`Certificate for ${item.title}`}
                              fill
                              className="object-contain p-4"
                              sizes="192px"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <span className="text-caption mb-3 block">
                            {categoryLabels[item.category] ?? item.category}
                          </span>
                          <h3 className="text-card-title mb-3">{item.title}</h3>
                          {item.issuedBy && (
                            <p className="text-[11px] text-stone mb-4">Issued by {item.issuedBy}</p>
                          )}
                          <p className="text-body">{item.description}</p>
                        </div>
                      </div>
                    </PremiumCard>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}

          {undated.length > 0 && (
            <div>
              <div className="mb-14">
                <SectionHeader
                  eyebrow="Chapters"
                  title="Chapter Recognitions"
                  subtitle="Honours earned by IEEE CUSAT technical chapters."
                />
              </div>
              <Stagger className="space-y-4" stagger={0.08}>
                {undated.map((item) => (
                  <StaggerItem key={item.id}>
                    <PremiumCard as="article">
                      <div className="flex gap-4 p-6 lg:p-8">
                        <span
                          className="w-0.5 shrink-0 bg-gradient-to-b from-ieee-blue to-ieee-blue-light/40 self-stretch min-h-[3rem]"
                          aria-hidden="true"
                        />
                        <div>
                          <span className="text-caption mb-3 block">
                            {categoryLabels[item.category] ?? item.category}
                          </span>
                          <h3 className="font-semibold text-ieee-navy leading-snug mb-2 group-hover:text-ieee-blue transition-colors duration-200 ease-linear delay-0">
                            {item.title}
                          </h3>
                          {item.issuedBy && (
                            <p className="text-[11px] text-stone mb-3">Issued by {item.issuedBy}</p>
                          )}
                          <p className="text-body">{item.description}</p>
                        </div>
                      </div>
                    </PremiumCard>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          )}
        </div>
      </PageSection>
    </div>
  );
}
