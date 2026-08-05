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
  award:       { label: "Award",       color: "#F2A900", icon: "🏆" },
  recognition: { label: "Recognition", color: "#2a9d8f", icon: "🎖️" },
  milestone:   { label: "Milestone",   color: "#0F3D68", icon: "🎯" },
  ranking:     { label: "Ranking",     color: "#4B2E83", icon: "📊" },
};

const boxColors = ['bg-red-50', 'bg-blue-50', 'bg-green-50', 'bg-yellow-50', 'bg-purple-50', 'bg-pink-50', 'bg-orange-50', 'bg-teal-50'];
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
        accentColor="#F2A900"
      />

      {/* ── Timeline ── */}
      <section className="relative border-t border-gray-200 py-24" aria-label="Achievements timeline">
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedYears.map((year) => (
            <div key={year} className="mb-20">
              {/* Year heading */}
              <div className="flex items-center gap-6 mb-10">
                <span
                  className="text-2xl font-bold px-6 py-2 bg-[--color-navy] text-white border-2 border-[--color-navy]"
                >
                  {year}
                </span>
                <div className="flex-1 h-px bg-[--color-border]" aria-hidden="true" />
              </div>

              {/* Achievements for this year */}
              <div className="space-y-6">
                {byYear[year].map((a, idx) => {
                  const cfg = categoryConfig[a.category];
                  return (
                    <article
                      key={a.id}
                      className="flex flex-col sm:flex-row gap-6 border border-[--color-border] bg-white p-8 hover:shadow-xl transition-shadow"
                    >
                      {/* Icon */}
                      <div
                        className="flex-shrink-0 w-16 h-16 flex items-center justify-center text-2xl border"
                        style={{ background: `${cfg.color}10`, borderColor: cfg.color }}
                        aria-hidden="true"
                      >
                        {cfg.icon}
                      </div>
                      <div className="flex-1">
                        {/* Category badge */}
                        <span
                          className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 mb-3 border"
                          style={{
                            background: `${cfg.color}10`,
                            borderColor: cfg.color,
                            color: cfg.color,
                          }}
                        >
                          {cfg.label}
                        </span>
                        <h3 className="font-bold font-serif text-[--color-navy] text-2xl leading-snug mb-2">
                          {a.title}
                        </h3>
                        {a.issuedBy && (
                          <p className="text-xs font-bold uppercase tracking-widest text-[--color-muted] mb-4">
                            ISSUED BY: {a.issuedBy}
                          </p>
                        )}
                        <p className="text-[--color-charcoal] text-base leading-relaxed">
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
