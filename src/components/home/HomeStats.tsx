import SectionBackdrop from "@/components/home/SectionBackdrop";
import { SectionAccent, SectionSideGlow } from "@/components/home/SectionAccent";
import { CARD_HOVER_LIFT_CLASS } from "@/components/home/cardMotion";
import { Stagger, StaggerItem } from "@/components/home/motion";

const stats = [
  { value: "2025", label: "Region 10 Exemplary SB" },
  { value: "6+", label: "Technical Chapters" },
  { value: "4", label: "Recent Awards" },
  { value: "Kerala", label: "IEEE Kerala Section" },
];

export default function HomeStats() {
  return (
    <section
      className="relative overflow-hidden border-y border-ieee-border"
      aria-label="Branch highlights"
    >
      <SectionBackdrop variant="accent" />
      <SectionAccent />
      <SectionSideGlow side="left" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Stagger className="grid grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {stats.map((stat, idx) => (
            <StaggerItem
              key={stat.label}
              className={`py-10 lg:py-12 px-6 lg:px-10 ${
                idx < stats.length - 1 ? "lg:border-r border-ieee-border/80" : ""
              } ${idx % 2 === 0 ? "border-r border-ieee-border/80 lg:border-r" : ""} ${
                idx < 2 ? "border-b lg:border-b-0 border-ieee-border/80" : ""
              }`}
            >
              <div className={`group ${CARD_HOVER_LIFT_CLASS}`}>
                <p className="font-serif text-3xl sm:text-4xl font-semibold text-ieee-navy tabular-nums tracking-tight group-hover:text-ieee-blue transition-colors duration-200 ease-linear delay-0">
                  {stat.value}
                </p>
                <p className="mt-2 text-caption text-stone normal-case tracking-[0.08em]">
                  {stat.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
