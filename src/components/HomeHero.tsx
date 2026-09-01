"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import PremiumButton from "@/components/home/PremiumButton";
import CursorGrid from "@/components/home/CursorGrid";
import HeroNetworkMap from "@/components/home/HeroNetworkMap";
import { FadeIn } from "@/components/home/motion";

const slides = [
  {
    title: "Engineering Excellence at CUSAT",
    subtitle:
      "The IEEE CUSAT Student Branch connects students to technical learning, professional growth, and a global community of engineers.",
    cta: { label: "Join the Branch", href: "/join" },
  },
  {
    title: "Learn. Build. Lead.",
    subtitle:
      "From hackathons and workshops to technical chapters — discover events and opportunities designed for CUSAT students.",
    cta: { label: "Explore Events", href: "/events" },
  },
  {
    title: "Six Chapters. One Community.",
    subtitle:
      "Explore IEEE technical societies active under our student branch — from CS and RAS to WIE, PES, ComSoc, and SIGHT.",
    cta: { label: "View Chapters", href: "/societies" },
  },
];

export default function HomeHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const nextSlide = useCallback(
    () => setActiveSlide((prev) => (prev + 1) % slides.length),
    []
  );

  useEffect(() => {
    if (paused || reduce) return;
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [paused, nextSlide, reduce]);

  const current = slides[activeSlide];

  return (
    <section
      className="relative overflow-hidden bg-ieee-sky-muted h-svh min-h-svh max-h-svh flex flex-col"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Welcome"
    >
      <div className="absolute inset-0 pointer-events-none" data-decorative aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-ieee-sky/50 via-ieee-sky-muted to-white" />
        <div className="absolute top-0 right-0 w-[min(52vw,520px)] h-[min(52vw,520px)] rounded-full bg-ieee-blue/[0.06] blur-2xl translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[min(40vw,380px)] h-[min(40vw,380px)] rounded-full bg-ieee-blue-light/[0.05] blur-2xl -translate-x-1/4 translate-y-1/4" />
        <p className="absolute top-1/2 left-[18%] -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(8rem,22vw,18rem)] font-semibold text-ieee-blue/[0.04] select-none whitespace-nowrap leading-none hidden lg:block">
          IEEE
        </p>
        <CursorGrid
          cellSize={64}
          baseOpacity={12}
          highlightOpacity={28}
          spotlightRadius={170}
          className="opacity-[0.35]"
          fadeMask="linear-gradient(to bottom, black 40%, transparent 100%)"
        />
      </div>

      <div className="absolute inset-y-0 right-0 hidden lg:block w-[58vw] max-w-[860px] z-[1] pointer-events-none">
        <HeroNetworkMap className="h-full" />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center min-h-0 w-full overflow-y-auto">
        <div className="container-editorial w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center w-full">
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col max-lg:gap-0">
              <FadeIn className="max-lg:order-1">
                <div className="flex items-center gap-3 mb-5 sm:mb-6 max-lg:pt-2 sm:max-lg:pt-4">
                <span className="h-px w-8 bg-ieee-blue" aria-hidden="true" />
                <p className="section-eyebrow mb-0">IEEE CUSAT Student Branch</p>
              </div>
            </FadeIn>

            <div className="min-h-[160px] sm:min-h-[180px] max-lg:order-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h1 className="font-serif text-[2.35rem] sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-semibold text-ieee-navy leading-[1.06] tracking-[-0.03em] max-w-2xl">
                    {current.title}
                  </h1>
                  <p className="text-lead mt-6 max-w-xl">{current.subtitle}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="max-lg:order-3 lg:hidden -mx-4 sm:-mx-6 mt-4 mb-2">
              <HeroNetworkMap variant="mobile" />
            </div>

            <FadeIn delay={0.12} className="max-lg:order-4">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 lg:mt-9">
                <PremiumButton href={current.cta.href} variant="primary">
                  {current.cta.label}
                </PremiumButton>
                <div className="hidden sm:block">
                  <PremiumButton href="/about" variant="secondary">
                    About Us
                  </PremiumButton>
                </div>
              </div>
            </FadeIn>

            <div className="flex items-center gap-5 mt-10 lg:mt-12 pt-8 border-t border-ieee-border/80 max-lg:order-5">
              <div className="flex gap-2" role="tablist" aria-label="Hero slides">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={idx === activeSlide}
                    aria-label={`Slide ${idx + 1}`}
                    onClick={() => setActiveSlide(idx)}
                    className="relative h-1 w-10 bg-ieee-border overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ieee-blue"
                  >
                    <motion.span
                      className="absolute inset-y-0 left-0 bg-ieee-blue"
                      initial={false}
                      animate={{ width: idx === activeSlide ? "100%" : "0%" }}
                      transition={{
                        duration: idx === activeSlide && !paused && !reduce ? 8 : 0.25,
                        ease: "linear",
                      }}
                    />
                  </button>
                ))}
              </div>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
                  }
                  className="w-9 h-9 flex items-center justify-center border border-ieee-border bg-white/90 text-ieee-blue hover:border-ieee-blue transition-colors duration-200 ease-linear delay-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ieee-blue"
                  aria-label="Previous slide"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="w-9 h-9 flex items-center justify-center border border-ieee-border bg-white/90 text-ieee-blue hover:border-ieee-blue transition-colors duration-200 ease-linear delay-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ieee-blue"
                  aria-label="Next slide"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}
