/**
 * About Page — /about
 * Sections:
 *   - Page header
 *   - What is IEEE?
 *   - About IEEE CUSAT SB (mission, vision, history)
 *   - Branch structure overview
 */

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

export default function AboutPage() {
  return (
    <>
      <PageHeader
        breadcrumb="About Us"
        title="About IEEE CUSAT SB"
        subtitle="Our story, mission, and the people who make it happen."
      />

      {/* ── What is IEEE? ── */}
      <section className="py-20 bg-white" aria-labelledby="ieee-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-ieee-blue)" }}>
              The Global Organization
            </p>
            <h2 id="ieee-heading" className="text-3xl sm:text-4xl font-bold text-[--color-navy]">
              What is IEEE?
            </h2>
            <p className="mt-5 text-[--color-slate] leading-relaxed text-lg">
              IEEE — the Institute of Electrical and Electronics Engineers — is
              the world&apos;s largest technical professional organization, with
              over <strong>400,000 members</strong> in more than 160 countries.
            </p>
            <p className="mt-4 text-[--color-slate] leading-relaxed">
              It advances technology for the benefit of humanity through
              publishing, conferences, standards development, and educational
              programs. IEEE&apos;s technical interests span computing, electronics,
              biomedical engineering, transportation, and more.
            </p>
            <a
              href="https://www.ieee.org/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm font-semibold"
              style={{ color: "var(--color-ieee-blue)" }}
            >
              Learn more at ieee.org
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Quick facts */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "400K+", label: "Global Members" },
              { value: "160+", label: "Countries" },
              { value: "39", label: "Technical Societies" },
              { value: "1884", label: "Founded" },
            ].map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border border-[--color-border] bg-[--color-surface] p-6 text-center"
              >
                <p className="text-3xl font-bold" style={{ color: "var(--color-ieee-blue)" }}>
                  {fact.value}
                </p>
                <p className="text-sm text-[--color-muted] mt-1">{fact.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission / Vision / Values ── */}
      <section
        className="py-20 bg-[--color-surface]"
        aria-labelledby="mvv-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="mvv-heading" className="text-3xl sm:text-4xl font-bold text-[--color-navy]">
              Our Mission & Vision
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-xl border border-[--color-border] p-8 shadow-sm"
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-xl font-bold text-[--color-navy] mb-3">
                  {v.title}
                </h3>
                <p className="text-[--color-slate] leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── History Timeline ── */}
      <section className="py-20 bg-white" aria-labelledby="history-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-ieee-blue)" }}>
              Our Journey
            </p>
            <h2 id="history-heading" className="text-3xl sm:text-4xl font-bold text-[--color-navy]">
              A Legacy of Excellence
            </h2>
          </div>

          <ol className="relative border-l-2 border-[--color-border] ml-4 space-y-8" aria-label="Branch history timeline">
            {timeline.map((item) => (
              <li key={item.year} className="ml-8">
                {/* Dot */}
                <span
                  className="absolute -left-[11px] flex items-center justify-center w-5 h-5 rounded-full ring-4 ring-white"
                  style={{ background: "var(--color-ieee-blue)" }}
                  aria-hidden="true"
                />
                <time
                  dateTime={item.year}
                  className="block text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: "var(--color-ieee-blue)" }}
                >
                  {item.year}
                </time>
                <p className="text-[--color-slate] leading-relaxed">{item.event}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Structure overview ── */}
      <section
        className="py-20 bg-[--color-surface]"
        aria-labelledby="structure-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="structure-heading" className="text-3xl sm:text-4xl font-bold text-[--color-navy]">
              Branch Structure
            </h2>
            <p className="mt-3 text-[--color-muted] max-w-xl mx-auto">
              We operate under the IEEE Kerala Section and are organized into
              an executive committee and multiple technical chapters.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {["IEEE Kerala Section", "IEEE CUSAT Student Branch", "Executive Committee", "Technical Chapters", "Affinity Groups", "Student Members"].map((node) => (
              <span
                key={node}
                className="px-4 py-2 rounded-full border border-[--color-border] bg-white text-sm font-medium text-[--color-navy] shadow-sm"
              >
                {node}
              </span>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/execom" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--color-ieee-blue)" }}>
              Meet the Executive Committee
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
