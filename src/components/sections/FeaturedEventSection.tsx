import Link from "next/link";
import Image from "next/image";
import { getUpcomingEvents } from "@/data/events";
import { formatDate, formatMonthDay } from "@/lib/format";

export default function FeaturedEventSection() {
  const upcoming = getUpcomingEvents();
  const featured = upcoming[0];
  const rest = upcoming.slice(1, 4);

  if (!featured) return null;

  const { month, day } = formatMonthDay(featured.date);

  return (
    <section className="border-b border-line" aria-labelledby="featured-event-heading">
      {/* Featured */}
      <div className="relative min-h-[70vh] lg:min-h-[80vh]">
        <Image
          src={featured.image}
          alt={featured.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

        <div className="absolute inset-0 container-editorial flex flex-col justify-end pb-12 lg:pb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-6 mb-6">
              <div className="text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{month}</p>
                <p className="text-5xl font-black tabular-nums leading-none">{day}</p>
              </div>
              <div className="h-12 w-px bg-white/30" />
              <div>
                <p className="eyebrow text-white/50">{featured.category}</p>
                {featured.chapter && (
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 mt-1">
                    {featured.chapter}
                  </p>
                )}
              </div>
            </div>

            <h2 id="featured-event-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              {featured.title}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-2xl">
              {featured.description}
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              {featured.registrationLink ? (
                <a
                  href={featured.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary bg-white text-ink hover:bg-white/90"
                >
                  Register →
                </a>
              ) : (
                <Link href={`/events/${featured.slug}`} className="btn-primary bg-white text-ink hover:bg-white/90">
                  Register →
                </Link>
              )}
              <span className="text-sm text-white/50">{featured.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming list */}
      {rest.length > 0 && (
        <div className="container-editorial py-12 lg:py-16">
          <div className="flex items-baseline justify-between mb-8">
            <p className="eyebrow">Also Upcoming</p>
            <Link href="/events" className="link-arrow">
              All events →
            </Link>
          </div>
          <div className="divide-y divide-line">
            {rest.map((event) => (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 group hover:bg-paper -mx-4 px-4 transition-colors"
              >
                <div className="md:col-span-2 text-xs font-medium tabular-nums text-graphite uppercase tracking-wider">
                  {formatDate(event.date)}
                </div>
                <div className="md:col-span-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-stone">
                  {event.category}
                </div>
                <div className="md:col-span-7">
                  <h3 className="text-lg font-semibold text-ink group-hover:text-ieee transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-graphite mt-1">{event.location}</p>
                </div>
                <div className="md:col-span-1 flex items-center justify-end text-stone group-hover:text-ink">
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
