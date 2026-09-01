import { societies } from "@/data/societies";
import SectionHeader from "@/components/home/SectionHeader";
import SectionBackdrop from "@/components/home/SectionBackdrop";
import { SectionAccent, SectionSideGlow } from "@/components/home/SectionAccent";
import PremiumCard from "@/components/home/PremiumCard";
import { Stagger, StaggerItem } from "@/components/home/motion";

export default function HomeSocieties() {
  const preview = societies.slice(0, 4);

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden border-t border-ieee-border"
      aria-labelledby="societies-heading"
    >
      <SectionBackdrop variant="accent" />
      <SectionAccent />
      <SectionSideGlow side="right" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 lg:mb-16">
          <SectionHeader
            eyebrow="Chapters"
            titleId="societies-heading"
            title="Technical Societies & Chapters"
            subtitle="Explore the IEEE technical chapters active under IEEE CUSAT Student Branch."
            href="/societies"
            linkLabel="View all chapters"
          />
        </div>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.08}>
          {preview.map((society, idx) => (
            <StaggerItem key={society.id}>
              <PremiumCard as="article">
                <div className="p-6 flex flex-col h-full min-h-[220px]">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-caption normal-case text-stone tracking-[0.1em]">
                      {society.name}
                    </span>
                    <span className="font-serif text-lg text-ieee-border group-hover:text-ieee-blue/30 group-hover:scale-105 transition-all duration-200 ease-linear delay-0 tabular-nums inline-block origin-right">
                      0{idx + 1}
                    </span>
                  </div>
                  <div
                    className="w-8 h-0.5 mb-4 transition-all duration-200 ease-linear delay-0 group-hover:w-full"
                    style={{ backgroundColor: society.color }}
                    aria-hidden="true"
                  />
                  <h3 className="font-semibold text-ieee-navy leading-snug mb-3 flex-1 group-hover:text-ieee-blue transition-colors duration-200 ease-linear delay-0">
                    {society.fullName}
                  </h3>
                  <p className="text-body line-clamp-2 mb-5">{society.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {society.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-ieee-sky-muted text-ieee-navy border border-ieee-border group-hover:border-ieee-blue/20 transition-colors duration-200 ease-linear delay-0"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </PremiumCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
