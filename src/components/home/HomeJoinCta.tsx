import PremiumButton from "@/components/home/PremiumButton";
import { Reveal } from "@/components/home/motion";
import { SectionAccent } from "@/components/home/SectionAccent";

export default function HomeJoinCta() {
  return (
    <section
      className="relative py-24 lg:py-28 overflow-hidden"
      aria-labelledby="join-cta-heading"
    >
      {/* IEEE blue gradient panel */}
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

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <p className="text-caption text-white/55 mb-4">Membership</p>
          <h2
            id="join-cta-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-white leading-[1.1] tracking-[-0.02em] mb-5"
          >
            Ready to Join IEEE CUSAT?
          </h2>
          <p className="text-lg text-white/75 leading-relaxed mb-10 max-w-xl mx-auto">
            Connect with fellow engineers, build technical skills, and be part of a
            globally recognized student branch at CUSAT.
          </p>
          <div className="mx-auto flex w-full max-w-sm flex-col items-stretch gap-4 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
            <PremiumButton
              href="/join"
              variant="secondary"
              fullWidth="mobile"
              className="!bg-white !text-ieee-blue !border-white hover:!bg-ieee-sky"
            >
              Join the Branch
            </PremiumButton>
            <PremiumButton
              href="/contact"
              variant="ghost"
              fullWidth="mobile"
              className="!text-white !border-white/30 hover:!bg-white/10 hover:!border-white/50"
            >
              Contact Us
            </PremiumButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
