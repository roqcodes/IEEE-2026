import type { Metadata } from "next";
import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import HomeTabs from "@/components/HomeTabs";

export const metadata: Metadata = {
  title: "IEEE CUSAT Student Branch",
  description: "Advancing Technology for Humanity at CUSAT.",
};

export default function HomePage() {
  return (
    <>
      {/* 3. HERO SECTION */}
      <HomeHero />

      {/* 4. "HAPPENING ACROSS [BRAND]" — FEATURED NEWS GRID */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-[--color-navy] mb-6">
              Happening Across IEEE
            </h2>
            <div className="tick-mark-diagonal mb-6"></div>
            <p className="text-[--color-muted] max-w-[700px] text-lg">
              Explore the latest updates, stories, and global initiatives driving our community forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Taller Card */}
            <Link href="#" className="group flex flex-col md:col-span-1 md:row-span-2 shadow-sm hover:shadow-xl transition-shadow bg-[--color-navy]">
              <div className="w-full aspect-[4/3] bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" alt="Conference" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 bg-[--color-navy] flex-1">
                <p className="text-[--color-gold] font-bold text-xs uppercase tracking-widest mb-3">CONFERENCES</p>
                <h3 className="text-white text-2xl font-bold leading-tight line-clamp-2">Global Summit on Artificial Intelligence 2026</h3>
              </div>
            </Link>
            
            {/* Standard Cards */}
            <Link href="#" className="group flex flex-col shadow-sm hover:shadow-xl transition-shadow bg-[--color-navy]">
              <div className="w-full aspect-[16/10] bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="Team" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 bg-[--color-navy] flex-1">
                <p className="text-[--color-gold] font-bold text-xs uppercase tracking-widest mb-3">MEMBERSHIP</p>
                <h3 className="text-white text-[22px] font-bold leading-tight line-clamp-2">New Benefits Introduced for Student Members</h3>
              </div>
            </Link>

            <Link href="#" className="group flex flex-col shadow-sm hover:shadow-xl transition-shadow bg-[--color-navy]">
              <div className="w-full aspect-[16/10] bg-[--color-navy-light] flex items-center justify-center gap-4 p-8 overflow-hidden">
                <div className="w-24 h-24 border-4 border-white overflow-hidden group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" alt="Person 1" className="w-full h-full object-cover" />
                </div>
                <div className="w-24 h-24 border-4 border-white overflow-hidden group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" alt="Person 2" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="p-6 bg-[--color-navy] flex-1">
                <p className="text-[--color-gold] font-bold text-xs uppercase tracking-widest mb-3">AWARDS</p>
                <h3 className="text-white text-[22px] font-bold leading-tight line-clamp-2">Recognizing Excellence in Engineering Leadership</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. "FIND YOUR PATH" — TABBED AUDIENCE SELECTOR */}
      <HomeTabs />

      {/* 6. "LATEST INNOVATIONS" — NEWS CARD ROW */}
      <section className="py-24 bg-white border-t border-[--color-border]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <h2 className="text-4xl font-bold font-serif text-[--color-navy]">
              Latest Innovations
            </h2>
            <Link href="#" className="inline-flex items-center gap-2 px-6 py-2 border-2 border-[--color-navy] text-[--color-navy] font-bold text-sm tracking-widest uppercase hover:bg-[--color-navy] hover:text-white transition-colors">
              EXPLORE MORE
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <Link href="#" className="group flex flex-col shadow-sm hover:shadow-xl transition-shadow bg-[--color-surface-cream]">
              <div className="w-full aspect-[4/3] bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" alt="Semiconductors" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 bg-[--color-surface-cream]">
                <p className="text-black font-bold text-xs uppercase tracking-widest mb-3">SEMICONDUCTORS</p>
                <h3 className="text-black text-2xl font-bold leading-tight line-clamp-2 mb-4">Breakthroughs in Quantum Chip Manufacturing</h3>
                <p className="text-[--color-muted] text-sm">26 Jul 2026</p>
              </div>
            </Link>

            <Link href="#" className="group flex flex-col shadow-sm hover:shadow-xl transition-shadow bg-[--color-surface-cream]">
              <div className="w-full aspect-[16/10] bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=2070&auto=format&fit=crop" alt="Aerospace" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 bg-[--color-surface-cream]">
                <p className="text-black font-bold text-xs uppercase tracking-widest mb-3">AEROSPACE</p>
                <h3 className="text-black text-[22px] font-bold leading-tight line-clamp-2 mb-4">Next-Gen Propulsion Systems Take Flight</h3>
                <p className="text-[--color-muted] text-sm">24 Jul 2026</p>
              </div>
            </Link>

            <Link href="#" className="group flex flex-col shadow-sm hover:shadow-xl transition-shadow bg-[--color-surface-cream]">
              <div className="w-full aspect-[16/10] bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop" alt="Robotics" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 bg-[--color-surface-cream]">
                <p className="text-black font-bold text-xs uppercase tracking-widest mb-3">ROBOTICS</p>
                <h3 className="text-black text-[22px] font-bold leading-tight line-clamp-2 mb-4">Autonomous Systems in Deep Ocean Exploration</h3>
                <p className="text-[--color-muted] text-sm">22 Jul 2026</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. REPORT / PUBLICATION PROMO */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 bg-white shadow-xl">
            {/* Left Content */}
            <div className="w-full lg:w-2/5 p-12 lg:p-20 flex flex-col justify-center">
              <p className="text-[--color-gold] font-bold text-sm tracking-widest mb-4">SHAPING THE FUTURE</p>
              <h2 className="text-4xl font-bold font-serif text-[--color-navy] mb-6 leading-tight">
                2026 Global Technology Outlook
              </h2>
              <p className="text-[--color-muted] text-lg mb-10 leading-relaxed">
                Discover the emerging trends, ethical considerations, and disruptive innovations that will redefine industries over the next decade.
              </p>
              <Link href="#" className="inline-flex items-center justify-center px-8 py-4 border-2 border-[--color-navy] text-[--color-navy] font-bold text-sm tracking-widest uppercase hover:bg-[--color-navy] hover:text-white transition-colors self-start">
                READ THE REPORT
              </Link>
            </div>
            
            {/* Right Gradient Panel */}
            <div 
              className="w-full lg:w-3/5 min-h-[400px] flex items-center justify-center p-12 overflow-hidden relative"
              style={{ backgroundImage: "linear-gradient(135deg, #0F3D68, #4B2E83)" }}
            >
              {/* Tilted Tablet Mockup Placeholder */}
              <div className="w-64 h-96 bg-white shadow-2xl transform rotate-12 flex flex-col overflow-hidden">
                <div className="h-12 bg-gray-100 border-b flex items-center px-4">
                  <div className="w-16 h-2 bg-gray-300"></div>
                </div>
                <div className="flex-1 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-6 text-center">
                  <h3 className="text-white font-serif font-bold text-2xl">2026<br/>Tech Outlook</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. "VOICES" / TESTIMONIAL SPOTLIGHT */}
      <section className="py-24 bg-[--color-surface-blue]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[--color-navy] font-bold text-sm tracking-widest mb-4">VOICES</p>
            <h2 className="text-4xl lg:text-5xl font-bold font-serif text-[--color-navy]">
              How Members Get Involved
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-0 shadow-xl bg-white">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[--color-gold] font-bold text-xs uppercase tracking-widest">POWER SYSTEMS</span>
                <span className="text-gray-300">|</span>
                <span className="text-[--color-gold] font-bold text-xs uppercase tracking-widest">ENERGY</span>
              </div>
              <div className="tick-mark mb-8"></div>
              
              <div className="text-[--color-charcoal] text-[20px] leading-relaxed mb-10 italic font-serif">
                &ldquo;Being part of this community has not only given me access to unparalleled technical resources, but it has provided a global platform to collaborate with the brightest minds in sustainable energy. Together, we are building the infrastructure of tomorrow.&rdquo;
              </div>
              
              <Link href="#" className="inline-flex items-center justify-center px-8 py-4 border-2 border-[--color-navy] text-[--color-navy] font-bold text-sm tracking-widest uppercase hover:bg-[--color-navy] hover:text-white transition-colors self-start">
                READ THE FULL PROFILE
              </Link>
            </div>
            
            {/* Right Photo */}
            <div className="w-full lg:w-1/2 h-[500px] lg:h-auto relative">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" alt="Member profile" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-[--color-surface-blue] p-6">
                <p className="text-[--color-navy] font-bold text-lg">Dr. Sarah Jenkins</p>
                <p className="text-[--color-muted] text-sm">Lead Researcher, Renewable Systems</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SECONDARY PUBLICATION CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <p className="text-[--color-muted] text-xl mb-10 max-w-2xl leading-relaxed">
            Ready to share your research with a global audience? Explore our journals, magazines, and conference proceedings to find the right home for your work.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="#" className="inline-flex items-center justify-center px-8 py-4 border-2 border-[--color-navy] text-[--color-navy] font-bold text-sm tracking-widest uppercase hover:bg-[--color-navy] hover:text-white transition-colors">
              LEARN MORE AND SUBSCRIBE
            </Link>
            <Link href="#" className="inline-flex items-center justify-center px-8 py-4 bg-[--color-navy] border-2 border-[--color-navy] text-white font-bold text-sm tracking-widest uppercase hover:bg-[--color-gold] hover:border-[--color-gold] transition-colors">
              GET PUBLISHED
            </Link>
          </div>
        </div>
      </section>

      {/* 10. FINAL MEMBERSHIP CTA */}
      <section className="pt-12 pb-32 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold font-serif text-[--color-navy] mb-6">
            Engineer the Future. Join Us.
          </h2>
          <p className="text-[--color-muted] text-xl mb-12">
            Unlock your potential, connect with experts, and gain access to essential resources that will accelerate your professional journey.
          </p>
          <Link href="#" className="inline-flex items-center justify-center px-12 py-5 border-2 border-[--color-navy] bg-[--color-navy] text-white font-bold text-lg tracking-widest uppercase hover:bg-[--color-gold] hover:border-[--color-gold] transition-colors shadow-lg">
            JOIN NOW
          </Link>
        </div>
      </section>

      {/* 11. KEEP EXPLORING PANEL */}
      <section className="bg-[--color-navy] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          <div className="w-full lg:w-1/3">
            <h2 className="text-4xl lg:text-[48px] font-bold font-serif text-white leading-tight">
              Keep Exploring
            </h2>
          </div>
          <div className="w-full lg:w-2/3">
            <ul className="flex flex-col gap-6">
              <li>
                <Link href="/about" className="flex items-center gap-4 text-white hover:text-[--color-gold] transition-colors text-2xl font-serif">
                  <span className="text-[--color-gold] font-sans text-3xl font-light">&rsaquo;</span> Membership Benefits
                </Link>
              </li>
              <li>
                <Link href="/events" className="flex items-center gap-4 text-white hover:text-[--color-gold] transition-colors text-2xl font-serif">
                  <span className="text-[--color-gold] font-sans text-3xl font-light">&rsaquo;</span> Upcoming Conferences
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="flex items-center gap-4 text-white hover:text-[--color-gold] transition-colors text-2xl font-serif">
                  <span className="text-[--color-gold] font-sans text-3xl font-light">&rsaquo;</span> Advance Your Career
                </Link>
              </li>
              <li>
                <Link href="/societies" className="flex items-center gap-4 text-white hover:text-[--color-gold] transition-colors text-2xl font-serif">
                  <span className="text-[--color-gold] font-sans text-3xl font-light">&rsaquo;</span> Communities & Connection
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
