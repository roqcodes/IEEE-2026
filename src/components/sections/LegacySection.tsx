"use client";

import { branchTimeline } from "@/data/timeline";
import { branchMeta, getBranchAge } from "@/data/branch";

export default function LegacySection() {
  const age = getBranchAge();

  return (
    <section className="py-20 lg:py-32 bg-paper overflow-hidden" aria-labelledby="legacy-heading">
      <div className="container-editorial mb-16">
        <div className="grid-12 items-end">
          <div className="col-span-4 md:col-span-6">
            <p className="eyebrow mb-4">Legacy</p>
            <h2 id="legacy-heading" className="display-lg">
              {age} Years
              <br />
              of Building
            </h2>
          </div>
          <div className="col-span-4 md:col-span-5 md:col-start-8">
            <p className="text-graphite leading-relaxed">
              Since {branchMeta.foundingYear}, IEEE CUSAT Student Branch has grown
              from a campus chapter into a nationally recognised engineering
              community under {branchMeta.section}.
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex gap-0 min-w-max px-4 sm:px-6 lg:px-12">
          {branchTimeline.map((milestone, i) => (
            <div
              key={`${milestone.year}-${milestone.label}`}
              className="relative flex flex-col w-[280px] sm:w-[320px] shrink-0 border-t border-line pt-8 pr-12"
            >
              <span className="text-[clamp(3rem,6vw,5rem)] font-black tabular-nums text-ink/10 leading-none mb-4">
                {milestone.year}
              </span>
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-ink mb-3">
                {milestone.label}
              </h3>
              <p className="text-sm text-graphite leading-relaxed">
                {milestone.description}
              </p>
              {i < branchTimeline.length - 1 && (
                <span className="absolute top-8 right-6 text-stone hidden sm:block" aria-hidden="true">
                  ↓
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
