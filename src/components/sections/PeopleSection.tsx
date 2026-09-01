import Image from "next/image";
import Link from "next/link";
import { execomMembers } from "@/data/execom";

export default function PeopleSection() {
  const featured = execomMembers.filter((m) => m.quote).slice(0, 3);

  return (
    <section className="py-20 lg:py-32 bg-paper" aria-labelledby="people-heading">
      <div className="container-editorial">
        <div className="grid-12 mb-16">
          <div className="col-span-4 md:col-span-6">
            <p className="eyebrow mb-4">People</p>
            <h2 id="people-heading" className="display-lg">
              The People
              <br />
              Behind IEEE CUSAT
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {featured.map((member) => (
            <article key={member.id} className="group">
              <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-line">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-lg font-bold text-ink">{member.name}</h3>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone mt-1 mb-4">
                {member.role}
              </p>
              {member.quote && (
                <blockquote className="text-sm text-graphite leading-relaxed border-l border-line pl-4">
                  &ldquo;{member.quote}&rdquo;
                </blockquote>
              )}
            </article>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-line">
          <Link href="/execom" className="link-arrow">
            Meet the executive committee →
          </Link>
        </div>
      </div>
    </section>
  );
}
