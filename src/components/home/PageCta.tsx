import PremiumButton from "@/components/home/PremiumButton";
import { Reveal } from "@/components/home/motion";
import { SectionAccent } from "@/components/home/SectionAccent";

interface PageCtaProps {
  eyebrow?: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  titleId?: string;
}

export default function PageCta({
  eyebrow = "Get Involved",
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  titleId = "page-cta-heading",
}: PageCtaProps) {
  return (
    <section className="relative py-24 lg:py-28 overflow-hidden" aria-labelledby={titleId}>
      <div
        className="absolute inset-0 bg-gradient-to-br from-ieee-blue via-[#005580] to-ieee-navy"
        aria-hidden="true"
      />
      <SectionAccent position="top" />
      <SectionAccent position="bottom" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="relative container-editorial text-center">
        <Reveal>
          <p className="text-caption text-white/55 mb-4">{eyebrow}</p>
          <h2
            id={titleId}
            className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-white leading-[1.1] tracking-[-0.02em] mb-5"
          >
            {title}
          </h2>
          <p className="text-lg text-white/75 leading-relaxed mb-10 max-w-xl mx-auto">{description}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PremiumButton
              href={primaryHref}
              variant="secondary"
              className="!bg-white !text-ieee-blue !border-white hover:!bg-ieee-sky"
            >
              {primaryLabel}
            </PremiumButton>
            {secondaryHref && secondaryLabel && (
              <PremiumButton
                href={secondaryHref}
                variant="ghost"
                className="!text-white !border-white/30 hover:!bg-white/10 hover:!border-white/50"
              >
                {secondaryLabel}
              </PremiumButton>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
