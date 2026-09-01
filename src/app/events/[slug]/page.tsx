import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getEventBySlug, events } from "@/data/events";
import PageSection from "@/components/home/PageSection";
import PremiumCard from "@/components/home/PremiumCard";
import PremiumButton from "@/components/home/PremiumButton";
import { SectionAccent } from "@/components/home/SectionAccent";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

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

const categoryLabels: Record<string, string> = {
  workshop: "Workshop",
  seminar: "Seminar",
  competition: "Competition",
  social: "Social",
  other: "Event",
};

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) notFound();

  return (
    <div className="site-page">
      <section className="relative overflow-hidden pt-28 lg:pt-32 pb-16 lg:pb-20 border-b border-ieee-border">
        <div
          className="absolute inset-0 bg-gradient-to-br from-ieee-blue via-[#005580] to-ieee-navy"
          aria-hidden="true"
        />
        <SectionAccent position="top" />
        <SectionAccent position="bottom" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />

        <div className="relative container-editorial max-w-4xl">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-white/75 text-caption normal-case tracking-[0.1em] mb-8 hover:text-white transition-colors duration-200 ease-linear delay-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Events
          </Link>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-caption px-3 py-1 bg-white/10 border border-white/20 text-white/90">
              {categoryLabels[event.category] ?? event.category}
            </span>
            <span className="text-caption px-3 py-1 bg-white/10 border border-white/20 text-white/90">
              {event.status === "upcoming" ? "Upcoming" : "Past Event"}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-[1.12] tracking-[-0.02em]">
            {event.title}
          </h1>
        </div>
      </section>

      <PageSection aria-label="Event details" borderTop={false}>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-10">
          <article className="md:col-span-2 space-y-8">
            <p className="text-lead">{event.body ?? event.description}</p>

            {event.status === "upcoming" && event.registrationLink && (
              <PremiumButton href={event.registrationLink} external>
                Register Now
              </PremiumButton>
            )}
          </article>

          <aside>
            <PremiumCard className="p-8 sticky top-32">
              <h2 className="text-card-title mb-6">Event Details</h2>
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="text-caption mb-1">Date</dt>
                  <dd className="text-body">
                    {formatDate(event.date)}
                    {event.endDate && event.endDate !== event.date && (
                      <> &ndash; {formatDate(event.endDate)}</>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-caption mb-1">Location</dt>
                  <dd className="text-body">{event.location}</dd>
                </div>
                <div>
                  <dt className="text-caption mb-1">Category</dt>
                  <dd className="text-body capitalize">{event.category}</dd>
                </div>
                <div>
                  <dt className="text-caption mb-1">Status</dt>
                  <dd className="text-body capitalize">{event.status}</dd>
                </div>
              </dl>
            </PremiumCard>
          </aside>
        </div>
      </PageSection>
    </div>
  );
}
