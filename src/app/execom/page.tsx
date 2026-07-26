import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { execomMembers } from "@/data/execom";

export const metadata: Metadata = {
  title: "Executive Committee",
  description:
    "Meet the executive committee of the IEEE CUSAT Student Branch — the team driving our activities and growth.",
};

export default function ExecomPage() {
  /* Split leadership (top 2) from rest */
  const leadership = execomMembers.slice(0, 2);
  const team = execomMembers.slice(2);

  return (
    <>
      <PageHeader
        breadcrumb="Our Team"
        title="Executive Committee"
        subtitle="Meet the dedicated team leading IEEE CUSAT Student Branch this year."
      />

      {/* ── Leadership ── */}
      <section className="py-24 bg-white" aria-labelledby="leadership-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2
              id="leadership-heading"
              className="text-4xl font-bold font-serif text-[--color-navy] mb-6"
            >
              Branch Leadership
            </h2>
            <div className="tick-mark-diagonal"></div>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {leadership.map((m) => (
              <MemberCard key={m.id} member={m} large />
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Team ── */}
      <section
        className="py-24 bg-[#FAFAFA]"
        aria-labelledby="team-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2
              id="team-heading"
              className="text-4xl font-bold font-serif text-[--color-navy] mb-6"
            >
              Core Team
            </h2>
            <div className="tick-mark-diagonal"></div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {team.map((m) => (
              <MemberCard key={m.id} member={m} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Sub-component: MemberCard ── */
import type { ExecomMember } from "@/data/execom";

function MemberCard({
  member,
  large = false,
}: {
  member: ExecomMember;
  large?: boolean;
}) {
  const avatarSize = large ? "w-32 h-32 text-4xl" : "w-24 h-24 text-2xl";
  const nameSize   = large ? "text-2xl" : "text-lg";

  return (
    <article
      className={[
        "bg-white border border-[--color-border] p-8 text-center",
        "shadow-sm hover:shadow-xl transition-shadow flex flex-col items-center gap-5",
        large ? "md:min-w-[320px]" : "",
      ].join(" ")}
    >
      {/* Avatar placeholder - square instead of circular */}
      <div
        className={`${avatarSize} flex items-center justify-center text-white font-bold font-serif flex-shrink-0`}
        style={{
          background: "linear-gradient(135deg, var(--color-navy-light), #4B2E83)",
        }}
        aria-hidden="true"
      >
        {member.name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")}
      </div>

      <div className="w-full">
        <h3 className={`${nameSize} font-bold font-serif text-[--color-navy]`}>
          {member.name}
        </h3>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[--color-gold] mt-2 mb-3">
          {member.role}
        </p>
        <p className="text-xs text-[--color-muted] mt-1">{member.branch}</p>
        <p className="text-xs text-[--color-muted]">{member.year}</p>
      </div>

      {/* LinkedIn link */}
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="text-[--color-muted] hover:text-[--color-navy] transition-colors mt-auto"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      )}
    </article>
  );
}
