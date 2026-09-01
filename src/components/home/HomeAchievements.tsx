import Image from "next/image";
import { achievements } from "@/data/achievements";
import SectionHeader from "@/components/home/SectionHeader";
import SectionBackdrop from "@/components/home/SectionBackdrop";
import { SectionAccent, SectionSideGlow } from "@/components/home/SectionAccent";
import PremiumCard from "@/components/home/PremiumCard";
import { Reveal, Stagger, StaggerItem } from "@/components/home/motion";

export default function HomeAchievements() {
  const featured = achievements[0];
  const others = achievements.slice(1);

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden border-t border-ieee-border"
      aria-labelledby="achievements-heading"
    >
      <SectionBackdrop variant="accent" />
      <SectionAccent />
      <SectionSideGlow side="left" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 lg:mb-16">
          <SectionHeader
            eyebrow="Recognition"
            title="Awards & Achievements"
            titleId="achievements-heading"
            subtitle="Recent honours earned by IEEE CUSAT Student Branch and its technical chapters."
            href="/achievements"
            linkLabel="View all achievements"
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-5">
          <Reveal className="lg:col-span-7">
            <PremiumCard as="article">
              <div className="grid md:grid-cols-2 h-full">
                {featured.image && (
                  <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[300px] bg-gradient-to-br from-ieee-sky to-ieee-sky-muted">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-contain p-8 transition-transform duration-200 ease-linear delay-0 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 35vw"
                    />
                  </div>
                )}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  {featured.year && (
                    <span className="text-caption mb-4">{featured.year}</span>
                  )}
                  <h3 className="text-card-title mb-4">{featured.title}</h3>
                  <p className="text-body">{featured.description}</p>
                  {featured.issuedBy && (
                    <p className="text-[11px] text-stone mt-6 pt-6 border-t border-ieee-border">
                      Issued by {featured.issuedBy}
                    </p>
                  )}
                </div>
              </div>
            </PremiumCard>
          </Reveal>

          <Stagger className="lg:col-span-5 flex flex-col gap-4" stagger={0.1}>
            {others.map((item) => (
              <StaggerItem key={item.id} className="flex-1">
                <PremiumCard as="article" className="h-full">
                  <div className="flex gap-4 p-6">
                    <span
                      className="w-0.5 shrink-0 bg-gradient-to-b from-ieee-blue to-ieee-blue-light/40 self-stretch min-h-[3rem]"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-semibold text-ieee-navy leading-snug mb-2 group-hover:text-ieee-blue transition-colors duration-200 ease-linear delay-0">
                        {item.title}
                      </h3>
                      <p className="text-body line-clamp-2">{item.description}</p>
                      {item.issuedBy && (
                        <p className="text-[11px] text-stone mt-3">{item.issuedBy}</p>
                      )}
                    </div>
                  </div>
                </PremiumCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
