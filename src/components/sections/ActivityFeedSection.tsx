"use client";

import Link from "next/link";
import { getActivityFeed, type ActivityItem } from "@/data/activity";
import { formatDate, relativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";

const typeLabels: Record<ActivityItem["type"], string> = {
  event: "Event",
  registration: "Registration",
  workshop: "Workshop",
  chapter: "Chapter",
  achievement: "Award",
  project: "Project",
};

export default function ActivityFeedSection() {
  const items = getActivityFeed(7);

  return (
    <section className="py-20 lg:py-28 border-b border-line" aria-labelledby="pulse-heading">
      <div className="container-editorial">
        <div className="grid-12 mb-12">
          <div className="col-span-4 md:col-span-5">
            <p className="eyebrow mb-4">Branch Pulse</p>
            <h2 id="pulse-heading" className="display-lg">
              What&apos;s Happening at IEEE CUSAT
            </h2>
          </div>
          <div className="col-span-4 md:col-span-7 md:col-start-6 flex items-end">
            <p className="text-graphite leading-relaxed max-w-md">
              Live stream of events, registrations, chapter activity, awards, and
              student projects across the branch.
            </p>
          </div>
        </div>

        <div className="border-t border-line">
          {items.map((item) => (
            <ActivityRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ActivityRow({ item }: { item: ActivityItem }) {
  const inner = (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-6 border-b border-line group transition-colors",
        item.href && "hover:bg-paper"
      )}
    >
      <div className="md:col-span-2 flex md:flex-col gap-2 md:gap-1">
        <time className="text-xs font-medium tabular-nums text-graphite" dateTime={item.date}>
          {relativeTime(item.date)}
        </time>
        <span className="text-[10px] uppercase tracking-[0.15em] text-stone">
          {formatDate(item.date)}
        </span>
      </div>

      <div className="md:col-span-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ieee">
          {typeLabels[item.type]}
        </span>
        {item.chapter && (
          <p className="text-[10px] uppercase tracking-[0.12em] text-stone mt-1">
            {item.chapter}
          </p>
        )}
      </div>

      <div className="md:col-span-7">
        <p className="text-base sm:text-lg font-medium text-ink group-hover:text-ieee transition-colors">
          {item.title}
        </p>
      </div>

      <div className="md:col-span-1 flex items-center justify-end">
        {item.href && (
          <span className="text-stone group-hover:text-ink transition-colors" aria-hidden="true">
            →
          </span>
        )}
      </div>
    </div>
  );

  if (item.href) {
    const isExternal = item.href.startsWith("http");
    if (isExternal) {
      return (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
          {inner}
        </a>
      );
    }
    return (
      <Link href={item.href} className="block">
        {inner}
      </Link>
    );
  }

  return <div>{inner}</div>;
}
