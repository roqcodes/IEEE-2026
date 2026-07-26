/**
 * Event Detail Page — /events/[slug]
 * Dynamic route: slug is derived from the event data in /data/events.ts.
 *
 * In Next.js 16, params is a Promise — must be awaited.
 * generateStaticParams pre-renders all known slugs at build time.
 * generateMetadata provides per-event SEO tags.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getEventBySlug, events } from "@/data/events";

/** Pre-render all slugs at build time */
export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

/** Per-event metadata — params is a Promise in Next.js 16 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: event.title,
    description: event.description,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  /* params must be awaited in Next.js 16 */
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) notFound();

  return (
    <>
      {/* ── Header band ── */}
      <section
        className="py-16 sm:py-24"
        style={{ background: "linear-gradient(135deg, var(--color-navy-light) 0%, #4B2E83 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-white/80 text-sm font-bold tracking-widest uppercase mb-8 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Events
          </Link>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-4 py-1 border-2 border-[--color-gold] text-[--color-gold] text-xs font-bold uppercase tracking-widest">
              {event.category}
            </span>
            <span className="px-4 py-1 border-2 border-white/40 text-white text-xs font-bold uppercase tracking-widest">
              {event.status === "upcoming" ? "Upcoming" : "Past Event"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white leading-tight">
            {event.title}
          </h1>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* ─ Main content ─ */}
            <article className="md:col-span-2 space-y-8">
              <p className="text-lg text-[--color-charcoal] leading-relaxed">
                {event.body ?? event.description}
              </p>

              {event.status === "upcoming" && event.registrationLink && (
                <div className="pt-6">
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-[--color-navy] border-2 border-[--color-navy] text-white font-bold text-xs tracking-widest uppercase hover:bg-[--color-gold] hover:border-[--color-gold] transition-colors"
                  >
                    REGISTER NOW
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </article>

            {/* ─ Info sidebar ─ */}
            <aside>
              <div className="border border-[--color-border] bg-white p-8 space-y-6 sticky top-32 shadow-sm">
                <h2 className="font-bold font-serif text-[--color-navy] text-2xl">
                  Event Details
                </h2>
                <div className="tick-mark"></div>
                <dl className="space-y-6 text-sm">
                  <div>
                    <dt className="text-[--color-muted] font-bold text-xs tracking-widest uppercase mb-1">Date</dt>
                    <dd className="text-[--color-charcoal] text-base">
                      {formatDate(event.date)}
                      {event.endDate && event.endDate !== event.date && (
                        <> &ndash; {formatDate(event.endDate)}</>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[--color-muted] font-bold text-xs tracking-widest uppercase mb-1">Location</dt>
                    <dd className="text-[--color-charcoal] text-base">{event.location}</dd>
                  </div>
                  <div>
                    <dt className="text-[--color-muted] font-bold text-xs tracking-widest uppercase mb-1">Category</dt>
                    <dd className="uppercase text-[--color-charcoal] text-base">
                      {event.category}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[--color-muted] font-bold text-xs tracking-widest uppercase mb-1">Status</dt>
                    <dd className="uppercase text-[--color-charcoal] text-base">
                      {event.status}
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
