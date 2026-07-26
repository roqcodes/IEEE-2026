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
        className="py-14 sm:py-20"
        style={{
          background:
            "linear-gradient(135deg, var(--color-ieee-blue-dark) 0%, var(--color-ieee-blue) 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-blue-200 text-sm mb-6 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Events
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold capitalize">
              {event.category}
            </span>
            <span
              className="px-3 py-1 rounded-full text-white text-xs font-semibold"
              style={{
                background:
                  event.status === "upcoming"
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.2)",
              }}
            >
              {event.status === "upcoming" ? "Upcoming" : "Past Event"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            {event.title}
          </h1>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10">
            {/* ─ Main content ─ */}
            <article className="md:col-span-2 space-y-6">
              <p className="text-lg text-[--color-slate] leading-relaxed">
                {event.body ?? event.description}
              </p>

              {event.status === "upcoming" && event.registrationLink && (
                <div className="pt-4">
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-white font-bold text-base transition-colors"
                    style={{ background: "var(--color-ieee-blue)" }}
                  >
                    Register Now
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </article>

            {/* ─ Info sidebar ─ */}
            <aside>
              <div className="rounded-xl border border-[--color-border] bg-[--color-surface] p-6 space-y-5 sticky top-20">
                <h2 className="font-bold text-[--color-navy] text-lg">
                  Event Details
                </h2>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-[--color-muted] font-medium mb-0.5">Date</dt>
                    <dd className="text-[--color-charcoal] font-semibold">
                      {formatDate(event.date)}
                      {event.endDate && event.endDate !== event.date && (
                        <> &ndash; {formatDate(event.endDate)}</>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[--color-muted] font-medium mb-0.5">Location</dt>
                    <dd className="text-[--color-charcoal] font-semibold">{event.location}</dd>
                  </div>
                  <div>
                    <dt className="text-[--color-muted] font-medium mb-0.5">Category</dt>
                    <dd className="capitalize text-[--color-charcoal] font-semibold">
                      {event.category}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[--color-muted] font-medium mb-0.5">Status</dt>
                    <dd className="capitalize text-[--color-charcoal] font-semibold">
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
