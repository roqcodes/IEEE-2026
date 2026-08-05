import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { societies } from "@/data/societies";
import Link from "next/link";
import SocietyCard from "@/components/SocietyCard";

export const metadata: Metadata = {
  title: "Societies & Chapters",
  description:
    "Explore the IEEE technical societies and chapters under the IEEE CUSAT Student Branch.",
};

const boxColors = ['bg-red-50', 'bg-blue-50', 'bg-green-50', 'bg-yellow-50', 'bg-purple-50', 'bg-pink-50', 'bg-orange-50', 'bg-teal-50'];
export default function SocietiesPage() {
  return (
    <>
      <PageHeader
        breadcrumb="Our Chapters"
        title="Societies & Chapters"
        subtitle="Six active IEEE technical chapters and affinity groups driving innovation across engineering disciplines."
        accentColor="#E23D28"
      />

      <section className="relative border-t border-gray-200 py-24" aria-label="Societies grid">
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {societies.map((s) => (
              <SocietyCard key={s.id} society={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Join CTA ── */}
      <section className="relative py-24 border-t border-[--color-border] bg-[#FCFBF4]" aria-label="Join a chapter">
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <p className="text-sm font-bold uppercase tracking-widest mb-4 text-[--color-gold]">
            Get Involved
          </p>

          <h2 className="text-[36px] md:text-[42px] font-light font-sans text-black mb-6 text-center">
            Interested in Joining a Chapter?
          </h2>
          <p className="text-gray-800 text-lg mb-10 max-w-2xl leading-relaxed font-medium">
            Reach out to us or attend any of our upcoming events to connect
            with chapter leads and fellow members.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-transparent border-2 border-black text-black font-bold text-xs tracking-widest uppercase hover:-translate-y-1 hover:shadow-xl transition-all"
          >
            GET IN TOUCH
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
