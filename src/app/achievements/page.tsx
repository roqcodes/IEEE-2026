/**
 * Achievements Page — /achievements
 * Timeline/card hybrid layout showing awards, milestones, and rankings.
 * Server Component — data is static from /data/achievements.ts.
 */

import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { achievements } from "@/data/achievements";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Awards, recognitions, and milestones achieved by the IEEE CUSAT Student Branch.",
};

const categoryConfig: Record<
  string,
  { label: string; color: string; icon: string }
> = {
  award:       { label: "Award",       color: "#f4a261", icon: "🏆" },
  recognition: { label: "Recognition", color: "#2a9d8f", icon: "🎖️" },
  milestone:   { label: "Milestone",   color: "#0062b1", icon: "🎯" },
  ranking:     { label: "Ranking",     color: "#8338ec", icon: "📊" },
};

export default function AchievementsPage() {
  /* Group by year descending */
  const byYear = achievements.reduce<Record<number, typeof achievements>>(
    (acc, a) => {
      acc[a.year] = acc[a.year] ?? [];
      acc[a.year].push(a);
      return acc;
    },
    {}
  );
  const sortedYears = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      <PageHeader
        breadcrumb="Our Story"
        title="Achievements"
        subtitle="A proud record of awards, recognitions, and milestones that define IEEE CUSAT Student Branch."
      />

      {/* ── Timeline ── */}
      <section className="py-16 bg-white" aria-label="Achievements timeline">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedYears.map((year) => (
            <div key={year} className="mb-16">
              {/* Year heading */}
              <div className="flex items-center gap-4 mb-8">
                <span
                  className="text-2xl font-bold px-5 py-2 rounded-xl text-white"
                  style={{ background: "var(--color-ieee-blue)" }}
                >
                  {year}
                </span>
                <div className="flex-1 h-px bg-[--color-border]" aria-hidden="true" />
              </div>

              {/* Achievements for this year */}
              <div className="space-y-5">
                {byYear[year].map((a) => {
                  const cfg = categoryConfig[a.category];
                  return (
                    <article
                      key={a.id}
                      className="flex gap-5 rounded-xl border border-[--color-border] bg-[--color-surface] p-6 hover:shadow-md transition-shadow"
                    >
                      {/* Icon */}
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                        style={{ background: `${cfg.color}20` }}
                        aria-hidden="true"
                      >
                        {cfg.icon}
                      </div>
                      <div>
                        {/* Category badge */}
                        <span
                          className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2"
                          style={{
                            background: `${cfg.color}20`,
                            color: cfg.color,
                          }}
                        >
                          {cfg.label}
                        </span>
                        <h3 className="font-bold text-[--color-navy] text-lg leading-snug">
                          {a.title}
                        </h3>
                        {a.issuedBy && (
                          <p className="text-xs text-[--color-muted] mt-0.5 mb-2">
                            Issued by: {a.issuedBy}
                          </p>
                        )}
                        <p className="text-sm text-[--color-slate] leading-relaxed">
                          {a.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
