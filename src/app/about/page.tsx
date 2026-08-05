import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the IEEE CUSAT Student Branch — our mission, vision, history, and organizational structure.",
};

const values = [
  {
    icon: "🎯",
    title: "Mission",
    text: "To foster technical innovation and professional excellence among engineering students at CUSAT by connecting them to the global IEEE community.",
  },
  {
    icon: "🌟",
    title: "Vision",
    text: "To be a premier student branch that produces globally competent engineers who lead with integrity and drive impactful change through technology.",
  },
  {
    icon: "🤝",
    title: "Values",
    text: "Collaboration, inclusivity, continuous learning, and the relentless pursuit of excellence in engineering and technology.",
  },
];

const timeline = [
  { year: "2008", event: "Branch founded and officially chartered by IEEE." },
  { year: "2012", event: "First national-level technical symposium — TechVista." },
  { year: "2015", event: "Won Best Student Branch Award for the Kerala Section." },
  { year: "2018", event: "Launched RAS and WIE chapters, expanding to 6 societies." },
  { year: "2022", event: "Crossed 500 active members milestone." },
  { year: "2023", event: "Hosted TechSprint — first national-level hackathon from a Kerala SB." },
  { year: "2024", event: "Won Best Student Branch (Kerala Section) for the second time." },
];

const boxColors = ['bg-red-50', 'bg-blue-50', 'bg-green-50', 'bg-yellow-50', 'bg-purple-50', 'bg-pink-50', 'bg-orange-50', 'bg-teal-50'];
const borderColors = ['border-red-200', 'border-blue-200', 'border-green-200', 'border-yellow-200', 'border-purple-200', 'border-pink-200', 'border-orange-200', 'border-teal-200'];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        breadcrumb="About Us"
        title="About IEEE CUSAT SB"
        subtitle="Our story, mission, and the people who make it happen."
        accentColor="#0085CA"
      />

      {/* ── What is IEEE? ── */}
      <section className="relative border-t border-gray-200 py-24" aria-labelledby="ieee-heading">
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest mb-4 text-[--color-gold]">
              The Global Organization
            </p>
            
            <h2 id="ieee-heading" className="text-[36px] md:text-[42px] font-light font-sans text-black mb-6 text-center">
              What is IEEE?
            </h2>
            <p className="mt-6 text-[--color-charcoal] leading-relaxed text-lg">
              IEEE — the Institute of Electrical and Electronics Engineers — is
              the world&apos;s largest technical professional organization, with
              over <strong>400,000 members</strong> in more than 160 countries.
            </p>
            <p className="mt-4 text-[--color-muted] leading-relaxed">
              It advances technology for the benefit of humanity through
              publishing, conferences, standards development, and educational
              programs. IEEE&apos;s technical interests span computing, electronics,
              biomedical engineering, transportation, and more.
            </p>
            <a
              href="https://www.ieee.org/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-2 border-2 border-[--color-navy] text-[--color-navy] font-bold text-xs tracking-widest uppercase hover:bg-[--color-gold] hover:border-[--color-gold] hover:text-[--color-navy] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              LEARN MORE AT IEEE.ORG
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Quick facts */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: "400K+", label: "Global Members" },
              { value: "160+", label: "Countries" },
              { value: "39", label: "Technical Societies" },
              { value: "1884", label: "Founded" },
            ].map((fact, idx) => (
              <div
                key={fact.label}
                className={`bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 text-center border-2 ${borderColors[idx % borderColors.length]}`}
              >
                <p className="text-4xl font-bold text-[--color-navy]">
                  {fact.value}
                </p>
                <p className="text-sm font-bold tracking-widest uppercase text-black mt-2">{fact.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission / Vision / Values ── */}
      <section
        className="relative border-t border-gray-200 py-24 bg-purple-50"
        aria-labelledby="mvv-heading"
      >
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 flex flex-col items-center">
            <h2 id="mvv-heading" className="text-[36px] md:text-[42px] font-light font-sans text-black mb-6 text-center">
              Our Mission & Vision
            </h2>
            
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, idx) => (
              <div
                key={v.title}
                className={`bg-white rounded-lg border-2 ${borderColors[(idx + 4) % borderColors.length]} p-10 shadow-sm hover:shadow-xl transition-shadow duration-300`}
              >
                <div className="text-4xl mb-6">{v.icon}</div>
                <h3 className="text-2xl font-bold font-serif text-[--color-navy] mb-4">
                  {v.title}
                </h3>
                <p className="text-[--color-muted] leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── History Timeline ── */}
      <section className="relative border-t border-gray-200 py-24" aria-labelledby="history-heading">
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-widest mb-4 text-[--color-gold]">
              Our Journey
            </p>
            <h2 id="history-heading" className="text-[36px] md:text-[42px] font-light font-sans text-black mb-6 text-center">
              A Legacy of Excellence
            </h2>
          </div>

          <ol className="relative border-l-[3px] border-yellow-500 ml-4 space-y-10" aria-label="Branch history timeline">
            {timeline.map((item) => (
              <li key={item.year} className="ml-10">
                {/* Square Dot */}
                <span
                  className="absolute -left-[11px] flex items-center justify-center w-5 h-5 bg-[--color-gold] border-4 border-white"
                  aria-hidden="true"
                />
                <time
                  dateTime={item.year}
                  className="block text-sm font-bold uppercase tracking-widest mb-2 text-yellow-600"
                >
                  {item.year}
                </time>
                <p className="text-[--color-muted] text-lg leading-relaxed">{item.event}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Structure overview ── */}
      <section
        className="relative border-t border-gray-200 py-24"
        aria-labelledby="structure-heading"
      >
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 flex flex-col items-center">
            <h2 id="structure-heading" className="text-[36px] md:text-[42px] font-light font-sans text-black mb-6 text-center">
              Branch Structure
            </h2>
            
            <p className="text-[--color-muted] max-w-xl mx-auto text-lg">
              We operate under the IEEE Kerala Section and are organized into
              an executive committee and multiple technical chapters.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {["IEEE Kerala Section", "IEEE CUSAT Student Branch", "Executive Committee", "Technical Chapters", "Affinity Groups", "Student Members"].map((node, idx) => {
              const hoverClasses = [
                "hover:text-red-400 hover:border-red-400",
                "hover:text-blue-400 hover:border-blue-400",
                "hover:text-green-400 hover:border-green-400",
                "hover:text-amber-400 hover:border-amber-400",
                "hover:text-purple-400 hover:border-purple-400",
                "hover:text-pink-400 hover:border-pink-400"
              ];
              return (
                <span
                  key={node}
                  className={`px-6 py-3 border-2 border-[--color-navy] bg-white text-sm font-bold uppercase tracking-widest text-[--color-navy] shadow-md hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300 active:-translate-y-2 active:shadow-xl ${hoverClasses[idx]}`}
                >
                  {node}
                </span>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <Link href="/execom" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black bg-black text-white font-bold text-xs tracking-widest uppercase hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              MEET THE EXECUTIVE COMMITTEE
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
