import Link from "next/link";
import type { Society } from "@/data/societies";
import PremiumCard from "@/components/home/PremiumCard";

interface SocietyCardProps {
  society: Society;
}

export default function SocietyCard({ society }: SocietyCardProps) {
  return (
    <PremiumCard as="article">
      <div className="p-6 lg:p-7 flex flex-col h-full min-h-[280px]">
        <div className="flex items-center justify-between gap-3 mb-5">
          <span className="text-caption normal-case text-stone tracking-[0.1em]">{society.name}</span>
          <span
            className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 border"
            style={{
              borderColor: `${society.color}40`,
              color: society.color,
              backgroundColor: `${society.color}10`,
            }}
          >
            {society.id.toUpperCase()}
          </span>
        </div>

        <div
          className="w-8 h-0.5 mb-4 transition-all duration-200 ease-linear delay-0 group-hover:w-full"
          style={{ backgroundColor: society.color }}
          aria-hidden="true"
        />

        <h3 className="font-semibold text-ieee-navy text-xl leading-snug mb-3 flex-1 group-hover:text-ieee-blue transition-colors duration-200 ease-linear delay-0">
          {society.fullName}
        </h3>

        <p className="text-body line-clamp-3 mb-5">{society.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {society.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-ieee-sky-muted text-ieee-navy border border-ieee-border group-hover:border-ieee-blue/20 transition-colors duration-200 ease-linear delay-0"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5 border-t border-ieee-border/80 flex items-center justify-between">
          <span className="text-[11px] text-stone uppercase tracking-wide">Official Chapter</span>
          {society.link ? (
            <a
              href={society.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-caption inline-flex items-center gap-1 hover:text-ieee-blue-dark transition-colors duration-200 ease-linear delay-0"
            >
              Explore
              <svg className="w-3 h-3 transition-transform duration-200 ease-linear delay-0 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          ) : (
            <Link
              href="/contact"
              className="text-caption inline-flex items-center gap-1 hover:text-ieee-blue-dark transition-colors duration-200 ease-linear delay-0"
            >
              Join
              <svg className="w-3 h-3 transition-transform duration-200 ease-linear delay-0 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </PremiumCard>
  );
}
