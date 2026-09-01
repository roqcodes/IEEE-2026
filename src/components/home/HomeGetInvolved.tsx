import Link from "next/link";
import SectionHeader from "@/components/home/SectionHeader";
import SectionBackdrop from "@/components/home/SectionBackdrop";
import { SectionAccent, SectionSideGlow } from "@/components/home/SectionAccent";
import { CARD_HOVER_CLASS, CARD_HOVER_LIFT_CLASS } from "@/components/home/cardMotion";
import { Stagger, StaggerItem } from "@/components/home/motion";

const paths = [
  {
    title: "Join IEEE",
    description: "Become a member and access global resources, networking, and student branch benefits.",
    href: "/join",
    label: "Join now",
  },
  {
    title: "Attend Events",
    description: "Participate in workshops, hackathons, and seminars organised throughout the academic year.",
    href: "/events",
    label: "Browse events",
  },
  {
    title: "Explore Chapters",
    description: "Find your technical interest — from CS and RAS to WIE, PES, ComSoc, and SIGHT.",
    href: "/societies",
    label: "View chapters",
  },
  {
    title: "Meet the Team",
    description: "Get to know the executive committee leading IEEE CUSAT Student Branch.",
    href: "/execom",
    label: "View execom",
  },
];

export default function HomeGetInvolved() {
  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden border-t border-ieee-border"
      aria-labelledby="involved-heading"
    >
      <SectionBackdrop variant="sky" />
      <SectionAccent />
      <SectionSideGlow side="left" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 lg:mb-16">
          <SectionHeader
            eyebrow="Get Involved"
            titleId="involved-heading"
            title="Find Your Path at IEEE CUSAT"
            subtitle="Whether you are a new student or an active volunteer, there is a place for you in our community."
            align="center"
          />
        </div>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.08}>
          {paths.map((path, idx) => (
            <StaggerItem key={path.href}>
              <Link
                href={path.href}
                className={`group relative flex flex-col h-full p-7 bg-gradient-to-br from-white to-ieee-sky-muted border border-ieee-border hover:border-ieee-blue/40 hover:shadow-[0_20px_48px_rgba(0,98,155,0.1)] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ieee-blue ${CARD_HOVER_LIFT_CLASS} ${CARD_HOVER_CLASS}`}
              >
                <div
                  className="absolute inset-0 opacity-[0.06] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                  aria-hidden="true"
                />
                <span className="relative font-serif text-3xl text-ieee-border group-hover:text-ieee-blue/25 transition-colors duration-200 ease-linear delay-0 mb-4 tabular-nums">
                  0{idx + 1}
                </span>
                <h3 className="relative font-semibold text-ieee-navy text-lg mb-2 group-hover:text-ieee-blue transition-colors duration-200 ease-linear delay-0">
                  {path.title}
                </h3>
                <p className="relative text-body flex-1 mb-6">{path.description}</p>
                <span className="relative text-caption inline-flex items-center gap-1.5">
                  {path.label}
                  <svg className="w-3.5 h-3.5 transition-transform duration-200 ease-linear delay-0 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
