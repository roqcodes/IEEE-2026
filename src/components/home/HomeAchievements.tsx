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
          <Reveal className="lg:col-span-7 lg:self-start">
            <PremiumCard as="article" className="!h-auto">
              <div className="flex flex-col">
                {featured.image && (
                  <div className="bg-gradient-to-br from-ieee-sky to-ieee-sky-muted border-b border-ieee-border/60 p-5 sm:p-6 lg:p-8">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      width={1980}
                      height={1530}
                      className="mx-auto block h-auto w-full max-w-md drop-shadow-[0_10px_28px_rgba(0,59,102,0.14)] transition-transform duration-200 ease-linear delay-0 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 90vw, 28rem"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-center p-8 lg:p-10 min-w-0">
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
