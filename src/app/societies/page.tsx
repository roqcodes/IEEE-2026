import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { societies } from "@/data/societies";
import Link from "next/link";

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

      <section className="py-24 bg-[#FAFAFA]" aria-label="Societies grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {societies.map((s) => (
              <article
                key={s.id}
                className="bg-[--color-surface-cream] border border-[--color-border] flex flex-col shadow-sm hover:shadow-xl transition-shadow"
              >
                {/* Color header bar */}
                <div
                  className="h-2 w-full"
                  style={{ background: s.color }}
                  aria-hidden="true"
                />

                <div className="p-8 flex flex-col flex-1">
                  {/* Logo placeholder square */}
                  <div
                    className="w-16 h-16 flex items-center justify-center text-white font-bold text-xl mb-6 shadow-md"
                    style={{ background: s.color }}
                    aria-label={`${s.name} icon`}
                  >
                    {s.name.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="mb-4">
                    <h2 className="text-2xl font-bold font-serif text-[--color-navy] mb-1">
                      {s.name}
                    </h2>
                    <p className="text-xs font-bold uppercase tracking-widest text-[--color-muted]">
                      {s.fullName}
                    </p>
                  </div>

                  <p className="text-[--color-charcoal] text-sm leading-relaxed mb-6 flex-1">
                    {s.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-3 py-1 font-bold uppercase tracking-widest border"
                        style={{
                          borderColor: s.color,
                          color: s.color,
                          backgroundColor: `${s.color}10`,
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
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-colors mt-auto self-start hover:opacity-80"
                      style={{ color: s.color }}
                      aria-label={`Learn more about ${s.fullName} (opens in new tab)`}
                    >
                      LEARN MORE
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
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
      <section className="py-24 bg-white border-t border-[--color-border]" aria-label="Join a chapter">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <p className="text-sm font-bold uppercase tracking-widest mb-4 text-[--color-gold]">
            Get Involved
          </p>
          <div className="tick-mark mb-6"></div>
          <h2 className="text-4xl sm:text-5xl font-bold font-serif text-[--color-navy] mb-6 leading-tight">
            Interested in Joining a Chapter?
          </h2>
          <p className="text-[--color-muted] text-lg mb-10 max-w-2xl leading-relaxed">
            Reach out to us or attend any of our upcoming events to connect
            with chapter leads and fellow members.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-[--color-navy] border-2 border-[--color-navy] text-white font-bold text-xs tracking-widest uppercase hover:bg-[--color-gold] hover:border-[--color-gold] transition-colors shadow-sm"
          >
            GET IN TOUCH
          </Link>
        </div>
      </section>
    </>
  );
}
