import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PageSection from "@/components/home/PageSection";
import SectionHeader from "@/components/home/SectionHeader";
import PremiumCard from "@/components/home/PremiumCard";
import PremiumButton from "@/components/home/PremiumButton";
import { Stagger, StaggerItem } from "@/components/home/motion";

export const metadata: Metadata = {
  title: "About",
  description:
    "About IEEE CUSAT Student Branch, including its recent awards and chapter recognitions.",
};

const values = [
  {
    label: "Mission",
    text: "To foster technical innovation and professional excellence among engineering students at CUSAT by connecting them to the global IEEE community.",
  },
  {
    label: "Vision",
    text: "To be a premier student branch that produces globally competent engineers who lead with integrity and drive impactful change through technology.",
  },
  {
    label: "Values",
    text: "Collaboration, inclusivity, continuous learning, and the relentless pursuit of excellence in engineering and technology.",
  },
];

const timeline = [
  {
    year: "2025",
    event:
      "IEEE CUSAT Student Branch was recognized as an IEEE Region 10 Exemplary Student Branch for outstanding student branch operations and achievements.",
  },
  {
    year: "MTT-S",
    event: "IEEE MTT-S CUSAT SB received the Large Chapter Award from the IEEE MTT-S Kerala Chapter.",
  },
  {
    year: "MTT-S",
    event: "IEEE MTT-S CUSAT SB received the Outstanding Chapter Award from the IEEE MTT-S Kerala Chapter.",
  },
  {
    year: "CASS",
    event:
      "IEEE CASS CUSAT SB was recognized as the Best Student Branch Chapter by the IEEE CASS Kerala Chapter.",
  },
];

const facts = [
  { value: "2025", label: "Region 10 Exemplary SB" },
  { value: "2", label: "MTT-S Chapter Awards" },
  { value: "1", label: "CASS Best Chapter" },
  { value: "4", label: "Recent Recognitions" },
];

const structure = [
  "IEEE Kerala Section",
  "IEEE CUSAT Student Branch",
  "Executive Committee",
  "Technical Chapters",
  "Affinity Groups",
  "Student Members",
];

export default function AboutPage() {
  return (
    <div className="site-page">
      <PageHeader
        breadcrumb="About Us"
        title="About IEEE CUSAT SB"
        subtitle="Learn about IEEE CUSAT Student Branch, its student-led community, technical chapters, activities, and journey of achievement at CUSAT."
      />

      <PageSection aria-labelledby="ieee-heading" sideGlow="right">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeader
              eyebrow="IEEE CUSAT"
              title="About IEEE CUSAT Student Branch"
              titleId="ieee-heading"
              subtitle="IEEE CUSAT Student Branch is a student-focused IEEE community at Cochin University of Science and Technology, working to create opportunities for technical learning, professional development, collaboration, and meaningful student participation in IEEE."
            />
            <p className="text-body mt-6">
              Our recent recognitions reflect the quality of this work. The branch was recognized as an
              IEEE Region 10 Exemplary Student Branch in 2025, while IEEE MTT-S CUSAT SB received Large
              Chapter and Outstanding Chapter Awards, and IEEE CASS CUSAT SB was recognized as the Best
              Student Branch Chapter by the IEEE CASS Kerala Chapter.
            </p>
            <a
              href="https://www.ieee.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="section-link mt-8"
            >
              More about IEEE
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <Stagger className="grid grid-cols-2 gap-4" stagger={0.08}>
            {facts.map((fact) => (
              <StaggerItem key={fact.label}>
                <PremiumCard className="text-center p-8">
                  <p className="font-serif text-3xl font-semibold text-ieee-navy tabular-nums">{fact.value}</p>
                  <p className="text-caption text-stone normal-case tracking-[0.08em] mt-2">{fact.label}</p>
                </PremiumCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </PageSection>

      <PageSection variant="accent" aria-labelledby="mvv-heading" sideGlow="left">
        <div className="mb-14 lg:mb-16">
          <SectionHeader
            eyebrow="Purpose"
            title="Our Mission & Vision"
            titleId="mvv-heading"
            subtitle="The principles that guide IEEE CUSAT Student Branch and shape how we serve engineering students at CUSAT."
            align="center"
          />
        </div>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.08}>
          {values.map((item, idx) => (
            <StaggerItem key={item.label}>
              <PremiumCard className="p-8 h-full">
                <span className="text-caption mb-4 block">0{idx + 1} · {item.label}</span>
                <p className="text-body">{item.text}</p>
              </PremiumCard>
            </StaggerItem>
          ))}
        </Stagger>
      </PageSection>

      <PageSection aria-labelledby="history-heading">
        <div className="max-w-3xl mx-auto">
          <div className="mb-14">
            <SectionHeader
              eyebrow="Our Journey"
              title="A Legacy of Excellence"
              titleId="history-heading"
              subtitle="Recent milestones and recognitions earned by IEEE CUSAT Student Branch and its technical chapters."
              align="center"
            />
          </div>
          <ol className="relative border-l border-ieee-blue/30 ml-3 space-y-10" aria-label="Branch history timeline">
            {timeline.map((item, index) => (
              <li key={`${item.year}-${index}`} className="ml-8">
                <span
                  className="absolute -left-[5px] flex h-2.5 w-2.5 rounded-full bg-ieee-blue ring-4 ring-ieee-sky-muted"
                  aria-hidden="true"
                />
                <time dateTime={item.year} className="text-caption mb-2 block">
                  {item.year}
                </time>
                <p className="text-body">{item.event}</p>
              </li>
            ))}
          </ol>
        </div>
      </PageSection>

      <PageSection variant="accent" aria-labelledby="structure-heading" sideGlow="right">
        <div className="mb-14">
          <SectionHeader
            eyebrow="Organization"
            title="Branch Structure"
            titleId="structure-heading"
            subtitle="We operate under the IEEE Kerala Section and are organized into an executive committee and multiple technical chapters."
            align="center"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {structure.map((node) => (
            <span
              key={node}
              className="px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] border border-ieee-border bg-white text-ieee-navy hover:border-ieee-blue/40 hover:bg-ieee-sky-muted transition-colors duration-200 ease-linear delay-0"
            >
              {node}
            </span>
          ))}
        </div>
        <div className="text-center">
          <PremiumButton href="/execom">Meet the Executive Committee</PremiumButton>
        </div>
      </PageSection>
    </div>
  );
}
