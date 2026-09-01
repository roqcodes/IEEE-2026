import Link from "next/link";
import SectionBackdrop from "@/components/home/SectionBackdrop";
import { SectionAccent, SectionSideGlow } from "@/components/home/SectionAccent";
import PremiumCard from "@/components/home/PremiumCard";
import { Reveal, Stagger, StaggerItem } from "@/components/home/motion";

const pillars = [
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
  {
    label: "Structure",
    text: "We operate under the IEEE Kerala Section through an executive committee and multiple technical chapters.",
  },
];

export default function HomeAbout() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" aria-labelledby="about-heading">
      <SectionBackdrop variant="sky" />
      <SectionAccent />
      <SectionSideGlow side="right" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 lg:items-stretch">
          <Reveal direction="left" className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-ieee-blue" aria-hidden="true" />
              <p className="section-eyebrow mb-0">Who We Are</p>
            </div>

            <h2 id="about-heading" className="section-title text-[2rem] sm:text-4xl lg:text-[2.5rem]">
              IEEE CUSAT Student Branch
              <span className="block mt-5 h-px max-w-[4.5rem] bg-gradient-to-r from-ieee-blue/50 to-transparent" aria-hidden="true" />
            </h2>

            <p className="text-lead mt-5">
              A student-focused IEEE community at Cochin University of Science and
              Technology, working to create opportunities for technical learning,
              professional development, collaboration, and meaningful student
              participation in IEEE.
            </p>

            <p className="text-body mt-6">
              Our recent recognitions reflect the quality of this work. The branch
              was recognized as an IEEE Region 10 Exemplary Student Branch in 2025,
              while IEEE MTT-S CUSAT SB received Large Chapter and Outstanding
              Chapter Awards, and IEEE CASS CUSAT SB was recognized as the Best
              Student Branch Chapter by the IEEE CASS Kerala Chapter.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link href="/about" className="section-link">
                Learn more
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="https://www.ieee.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="section-link"
              >
                More about IEEE
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          </Reveal>

          <Stagger
            className="lg:col-span-7 grid sm:grid-cols-2 sm:grid-rows-2 gap-4 lg:h-full lg:min-h-0"
            stagger={0.1}
          >
            {pillars.map((item, idx) => (
              <StaggerItem key={item.label} className="h-full min-h-[180px] sm:min-h-0">
                <PremiumCard as="article" className="h-full">
                  <div className="p-6 sm:p-7 flex flex-col h-full">
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <h3 className="font-semibold text-ieee-navy leading-snug group-hover:text-ieee-blue transition-colors duration-200 ease-linear delay-0">
                        {item.label}
                      </h3>
                      <span className="font-serif text-lg text-ieee-border group-hover:text-ieee-blue/30 group-hover:scale-105 transition-all duration-200 ease-linear delay-0 tabular-nums inline-block origin-right shrink-0">
                        0{idx + 1}
                      </span>
                    </div>

                    <div
                      className="w-8 h-0.5 mb-4 bg-ieee-blue transition-all duration-200 ease-linear delay-0 group-hover:w-full"
                      aria-hidden="true"
                    />

                    <p className="text-body flex-1">{item.text}</p>
                  </div>
                </PremiumCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
