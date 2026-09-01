"use client";

import { useState } from "react";
import Link from "next/link";
import { societies } from "@/data/societies";
import { cn } from "@/lib/utils";

export default function EcosystemSection() {
  const [active, setActive] = useState(societies[0].id);
  const current = societies.find((s) => s.id === active) ?? societies[0];

  return (
    <section className="py-20 lg:py-32 bg-ink text-white" aria-labelledby="ecosystem-heading">
      <div className="container-editorial">
        <div className="grid-12 mb-16">
          <div className="col-span-4 md:col-span-6">
            <p className="eyebrow text-white/40 mb-4">Ecosystem</p>
            <h2 id="ecosystem-heading" className="display-lg text-white">
              The IEEE CUSAT
              <br />
              Ecosystem
            </h2>
          </div>
          <div className="col-span-4 md:col-span-5 md:col-start-8 flex items-end">
            <p className="text-white/50 leading-relaxed">
              Six technical chapters and affinity groups — one interconnected
              engineering community at CUSAT.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-0 border border-white/10">
          {/* Chapter index */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10">
            {societies.map((society) => (
              <button
                key={society.id}
                type="button"
                onMouseEnter={() => setActive(society.id)}
                onFocus={() => setActive(society.id)}
                onClick={() => setActive(society.id)}
                className={cn(
                  "w-full text-left px-6 py-5 border-b border-white/10 last:border-b-0 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white",
                  active === society.id ? "bg-white text-ink" : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] block mb-1 opacity-60">
                  {society.name}
                </span>
                <span className="text-sm font-semibold leading-snug">
                  {society.fullName}
                </span>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-8 p-8 lg:p-12 flex flex-col justify-between min-h-[320px]">
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-[0.12em] px-2 py-1 border border-white/20 text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-lg text-white/80 leading-relaxed max-w-2xl mb-8">
                {current.description}
              </p>
              {current.recentActivity && (
                <p className="text-sm text-white/50 mb-2">
                  <span className="text-white/30 uppercase tracking-[0.12em] text-[10px] mr-3">
                    Recent
                  </span>
                  {current.recentActivity}
                </p>
              )}
              {current.eventCount !== undefined && (
                <p className="text-sm text-white/50">
                  <span className="text-white/30 uppercase tracking-[0.12em] text-[10px] mr-3">
                    Events
                  </span>
                  {current.eventCount} this academic year
                </p>
              )}
            </div>
            <div className="mt-8 flex gap-6">
              {current.link && (
                <a
                  href={current.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow text-white hover:text-white/70"
                >
                  IEEE chapter →
                </a>
              )}
              <Link href="/societies" className="link-arrow text-white hover:text-white/70">
                All chapters →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
