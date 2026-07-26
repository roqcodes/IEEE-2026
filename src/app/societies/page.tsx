/**
 * Societies Page — /societies
 * Grid of IEEE chapters and affinity groups at CUSAT SB.
 */

import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { societies } from "@/data/societies";

export const metadata: Metadata = {
  title: "Societies & Chapters",
  description:
    "Explore the IEEE technical societies and chapters under the IEEE CUSAT Student Branch.",
};

export default function SocietiesPage() {
  return (
    <>
      <PageHeader
        breadcrumb="Our Chapters"
        title="Societies & Chapters"
        subtitle="Six active IEEE technical chapters and affinity groups driving innovation across engineering disciplines."
      />

      <section className="py-16 bg-white" aria-label="Societies grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {societies.map((s) => (
              <article
                key={s.id}
                className="bg-white rounded-2xl border border-[--color-border] overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200"
              >
                {/* Color header bar */}
                <div
                  className="h-2"
                  style={{ background: s.color }}
                  aria-hidden="true"
                />

                <div className="p-8 space-y-4">
                  {/* Logo placeholder circle */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ background: s.color }}
                    aria-label={`${s.name} icon`}
                  >
                    {s.name.slice(0, 2).toUpperCase()}
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-[--color-navy]">
                      {s.name}
                    </h2>
                    <p className="text-sm text-[--color-muted] mt-0.5">
                      {s.fullName}
                    </p>
                  </div>

                  <p className="text-[--color-slate] text-sm leading-relaxed">
                    {s.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                        style={{
                          background: `${s.color}18`,
                          color: s.color,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {s.link && (
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold mt-2 transition-colors"
                      style={{ color: s.color }}
                      aria-label={`Learn more about ${s.fullName} (opens in new tab)`}
                    >
                      Learn More
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join CTA ── */}
      <section
        className="py-16 bg-[--color-surface] border-t border-[--color-border]"
        aria-label="Join a chapter"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[--color-navy] mb-4">
            Interested in Joining a Chapter?
          </h2>
          <p className="text-[--color-slate] mb-8">
            Reach out to us or attend any of our upcoming events to connect
            with chapter leads and fellow members.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-white font-bold text-sm"
            style={{ background: "var(--color-ieee-blue)" }}
          >
            Get in Touch
          </a>
        </div>
      </section>
    </>
  );
}
