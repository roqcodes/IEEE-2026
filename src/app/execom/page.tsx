/**
 * Execom Page — /execom
 * Grid of current Executive Committee members.
 * Server Component — data from /data/execom.ts.
 */

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
      <section className="py-16 bg-white" aria-labelledby="leadership-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="leadership-heading"
            className="text-2xl font-bold text-[--color-navy] mb-10 text-center"
          >
            Branch Leadership
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            {leadership.map((m) => (
              <MemberCard key={m.id} member={m} large />
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Team ── */}
      <section
        className="py-16 bg-[--color-surface]"
        aria-labelledby="team-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="team-heading"
            className="text-2xl font-bold text-[--color-navy] mb-10 text-center"
          >
            Core Team
          </h2>
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
  const avatarSize = large ? "w-28 h-28 text-3xl" : "w-20 h-20 text-xl";
  const nameSize   = large ? "text-xl" : "text-base";

  return (
    <article
      className={[
        "bg-white rounded-2xl border border-[--color-border] p-6 text-center",
        "shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-4",
        large ? "sm:min-w-64" : "",
      ].join(" ")}
    >
      {/* Avatar placeholder */}
      <div
        className={`${avatarSize} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}
        style={{
          background:
            "linear-gradient(135deg, var(--color-ieee-blue-dark), var(--color-ieee-blue))",
        }}
        aria-hidden="true"
      >
        {member.name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")}
      </div>

      <div>
        <h3 className={`${nameSize} font-bold text-[--color-navy]`}>
          {member.name}
        </h3>
        <p
          className="text-sm font-semibold mt-0.5"
          style={{ color: "var(--color-ieee-blue)" }}
        >
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
          className="text-[--color-muted] hover:text-[--color-ieee-blue] transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      )}
    </article>
  );
}
