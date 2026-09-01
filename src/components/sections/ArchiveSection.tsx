"use client";

import Link from "next/link";
import { archiveCategories, getArchiveYears } from "@/data/archive";
import { getBranchAge } from "@/data/branch";

export default function ArchiveSection() {
  const years = getArchiveYears();
  const age = getBranchAge();

  return (
    <section className="py-20 lg:py-32 border-b border-line" aria-labelledby="archive-heading">
      <div className="container-editorial">
        <div className="grid-12 mb-12">
          <div className="col-span-4 md:col-span-5">
            <p className="eyebrow mb-4">Archive</p>
            <h2 id="archive-heading" className="display-lg">
              {age} Years.
              <br />
              Hundreds of
              <br />
              Stories.
            </h2>
          </div>
          <div className="col-span-4 md:col-span-6 md:col-start-7 flex flex-col justify-end">
            <p className="text-graphite leading-relaxed mb-8">
              Explore events, photos, teams, achievements, and projects across
              the branch&apos;s history.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {archiveCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className="text-sm font-semibold uppercase tracking-[0.12em] text-ink hover:text-ieee transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="rule-h mb-6" />

        <div className="overflow-x-auto hide-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-12 lg:px-12">
          <div className="flex gap-0 min-w-max">
            {years.map((year) => (
              <Link
                key={year}
                href={`/events?year=${year}`}
                className="group flex flex-col items-center justify-center w-20 sm:w-24 h-24 sm:h-28 border-r border-line hover:bg-paper transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ink"
              >
                <span className="text-lg sm:text-xl font-bold tabular-nums text-ink group-hover:text-ieee transition-colors">
                  {year}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
