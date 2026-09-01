import Link from "next/link";
import { Reveal } from "@/components/home/motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  align?: "left" | "center";
  titleId?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  href,
  linkLabel,
  align = "left",
  titleId,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <Reveal>
      <div className={cn(isCenter && "max-w-2xl mx-auto")}>
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-ieee-blue" aria-hidden="true" />
          <p className="section-eyebrow mb-0">{eyebrow}</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <h2 id={titleId} className={cn("section-title", !isCenter && "max-w-2xl")}>
            {title}
            <span
              className="block mt-5 h-px max-w-[4.5rem] bg-gradient-to-r from-ieee-blue/50 to-transparent"
              aria-hidden="true"
            />
          </h2>

          {href && linkLabel && (
            <Link
              href={href}
              className="section-header-link shrink-0 self-start sm:mb-1.5 sm:mr-4 lg:mr-8"
            >
              <span className="section-header-link-label">{linkLabel}</span>
              <svg className="section-header-link-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>

        {subtitle && (
          <p className={cn("text-lead mt-4", !isCenter && "max-w-2xl")}>
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  );
}
