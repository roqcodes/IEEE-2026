import Link from "next/link";
import Image from "next/image";
import { achievements } from "@/data/achievements";

export default function RecognitionSection() {
  const featured = achievements[0];
  const others = achievements.slice(1);

  return (
    <section className="py-20 lg:py-32 border-b border-line" aria-labelledby="recognition-heading">
      <div className="container-editorial">
        <p className="eyebrow mb-16">Recognition</p>

        <div className="grid-12 gap-y-12 lg:gap-y-0">
          <div className="col-span-4 md:col-span-5 lg:col-span-4">
            {featured.image && (
              <div className="relative aspect-[3/4] bg-paper border border-line">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 768px) 100vw, 35vw"
                />
              </div>
            )}
          </div>

          <div className="col-span-4 md:col-span-7 lg:col-span-8 lg:pl-16 flex flex-col justify-center">
            <h2 id="recognition-heading" className="display-lg mb-6">
              IEEE Region 10
              <br />
              Exemplary
              <br />
              Student Branch
            </h2>
            {featured.year && (
              <p className="text-6xl sm:text-8xl font-black tabular-nums text-ink/10 leading-none mb-8">
                {featured.year}
              </p>
            )}
            <p className="text-lg text-graphite leading-relaxed max-w-xl mb-4">
              {featured.description}
            </p>
            {featured.issuedBy && (
              <p className="text-sm text-stone">
                Issued by {featured.issuedBy}
              </p>
            )}
          </div>
        </div>

        <div className="mt-20 lg:mt-28">
          <div className="rule-h mb-8" />
          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-line">
            {others.map((award) => (
              <article key={award.id} className="py-8 md:px-8 first:md:pl-0 last:md:pr-0">
                <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-ink mb-3">
                  {award.title}
                </h3>
                <p className="text-sm text-graphite leading-relaxed mb-3">
                  {award.description}
                </p>
                {award.issuedBy && (
                  <p className="text-[10px] uppercase tracking-[0.12em] text-stone">
                    {award.issuedBy}
                  </p>
                )}
              </article>
            ))}
          </div>
          <div className="mt-12">
            <Link href="/achievements" className="link-arrow">
              Full awards archive →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
