import Link from "next/link";
import Image from "next/image";
import { branchMeta } from "@/data/branch";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] bg-ink text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={branchMeta.heroImage}
          alt="IEEE CUSAT Student Branch community at an event"
          fill
          priority
          className="object-cover object-center opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
      </div>

      <div className="relative z-10 container-editorial min-h-[100svh] grid grid-cols-1 lg:grid-cols-12 gap-8 pt-28 pb-16 lg:pb-20">
        <div className="lg:col-span-7 flex flex-col justify-end">
          <p className="eyebrow text-white/50 mb-6">
            {branchMeta.shortName} · {branchMeta.university}
          </p>

          <h1 className="display-xl text-white mb-8">
            Engineering
            <br />
            Ideas Into
            <br />
            <span className="text-white/40">Impact.</span>
          </h1>

          <p className="max-w-lg text-base sm:text-lg text-white/70 leading-relaxed mb-10">
            IEEE CUSAT Student Branch brings together students, engineers, and
            innovators through technology, leadership, research, and community at
            CUSAT, Kochi.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/events" className="btn-primary bg-white text-ink hover:bg-white/90">
              Explore Events
            </Link>
            <Link href="/about" className="btn-outline border-white/40 text-white hover:bg-white hover:text-ink">
              About IEEE CUSAT
            </Link>
          </div>

          <div className="pt-8 border-t border-white/15 max-w-md">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
              Current Distinction
            </p>
            <p className="text-sm font-medium text-white/90">
              {branchMeta.distinction.label} · {branchMeta.distinction.year}
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 hidden lg:flex flex-col justify-end items-end">
          <div className="relative w-full max-w-sm aspect-[3/4] border border-white/20">
            <Image
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop"
              alt="Students collaborating at an IEEE CUSAT workshop"
              fill
              className="object-cover"
              sizes="400px"
            />
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-white/40 text-right">
            Kochi · Kerala · India
          </p>
        </div>
      </div>
    </section>
  );
}
