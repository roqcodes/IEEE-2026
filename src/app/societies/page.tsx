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
      <style>{`
        @keyframes slideDownBar {
          from { transform: scaleY(0); transform-origin: top; opacity: 0; }
          to { transform: scaleY(1); transform-origin: top; opacity: 1; }
        }
        @keyframes slideRightLine {
          from { transform: scaleX(0); transform-origin: left; opacity: 0; }
          to { transform: scaleX(1); transform-origin: left; opacity: 1; }
        }
        .animate-bar-down { animation: slideDownBar 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .animate-line-right { animation: slideRightLine 3.5s cubic-bezier(0.22, 1, 0.36, 1) 0.6s forwards; opacity: 0; }
      `}</style>
      <div className="relative">
        <div 
          className="absolute top-20 left-0 bottom-0 w-3 md:w-8 lg:w-12 bg-[#E23D28] z-40 shadow-[4px_0_15px_rgba(0,0,0,0.1)] animate-bar-down"
          style={{ borderBottomRightRadius: '16px' }}
          aria-hidden="true"
        />
        <div 
          className="absolute top-20 left-0 w-full h-[6px] bg-[#E23D28] z-40 animate-line-right"
          aria-hidden="true"
        />
        <PageHeader
          breadcrumb="Our Chapters"
          title="Societies & Chapters"
          subtitle="Six active IEEE technical chapters and affinity groups driving innovation across engineering disciplines."
        />
      </div>

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
