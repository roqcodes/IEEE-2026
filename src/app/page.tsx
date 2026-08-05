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
      <section className="py-24 bg-[#FAFAFA] relative border-t border-gray-200">
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16 relative">
            
            
            <h2 className="text-[36px] md:text-[42px] font-light font-sans text-black mb-6">
              Happening Now
            </h2>
            <p className="text-[#333333] max-w-4xl text-[16px] md:text-[18px] leading-relaxed font-sans">
              From the latest conferences and community events to the courses and opportunities that can help you grow in your career, here's what's new at IEEE.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Left Tall Card */}
            <Link href="#" className="group flex flex-col md:col-span-1 md:row-span-2 bg-[#00629B] shadow-sm hover:shadow-xl transition-shadow">
              <div className="w-full h-64 md:h-auto md:flex-1 bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="Membership" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-start">
                <p className="text-[--color-gold] font-bold text-[11px] uppercase tracking-widest mb-3">LIVE EVENT</p>
                <h3 className="text-white text-[24px] md:text-[28px] leading-[1.2] font-sans">Global Summit on Artificial Intelligence 2026</h3>
              </div>
            </Link>

            {/* Top Middle Card */}
            <Link href="#" className="group flex flex-col bg-[#00629B] shadow-sm hover:shadow-xl transition-shadow">
              <div className="w-full aspect-[16/9] bg-[#005086] flex flex-row items-center justify-center gap-6 p-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#003B66]/80 to-transparent"></div>
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:scale-105 transition-transform duration-500 relative z-10">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" alt="Candidate 1" className="w-full h-full object-cover" />
                </div>
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:scale-105 transition-transform duration-500 relative z-10">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" alt="Candidate 2" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-start">
                <p className="text-[--color-gold] font-bold text-[11px] uppercase tracking-widest mb-3">FUTURE EVENT</p>
                <h3 className="text-white text-[20px] leading-snug font-sans">2027 IEEE President-Elect Candidates Forum</h3>
              </div>
            </Link>

            {/* Top Right Card */}
            <Link href="#" className="group flex flex-col bg-[#00629B] shadow-sm hover:shadow-xl transition-shadow">
              <div className="w-full aspect-[16/9] bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop" alt="Career" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-start">
                <p className="text-[--color-gold] font-bold text-[11px] uppercase tracking-widest mb-3">LIVE EVENT</p>
                <h3 className="text-white text-[20px] leading-snug font-sans">BiG Thinkers 2026: Where Tech Meets Creativity</h3>
              </div>
            </Link>

            {/* Bottom Middle Card */}
            <Link href="#" className="group flex flex-col bg-[#00629B] shadow-sm hover:shadow-xl transition-shadow">
              <div className="w-full aspect-[16/9] bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" alt="Conferences" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-start">
                <p className="text-[--color-gold] font-bold text-[11px] uppercase tracking-widest mb-3">FUTURE EVENT</p>
                <h3 className="text-white text-[20px] leading-snug font-sans">IEEE International Conference on Intelligent Transportation Systems</h3>
              </div>
            </Link>

            {/* Bottom Right Card */}
            <Link href="#" className="group flex flex-col bg-[#00629B] shadow-sm hover:shadow-xl transition-shadow">
              <div className="w-full aspect-[16/9] bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=2070&auto=format&fit=crop" alt="Computer Society" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-start">
                <p className="text-[--color-gold] font-bold text-[11px] uppercase tracking-widest mb-3">FUTURE EVENT</p>
                <h3 className="text-white text-[20px] leading-snug font-sans">Level Up as a Software Professional Workshop</h3>
              </div>
            </Link>
          </div>
          
          
        </div>
      </section>

            {/* DIVIDER BEFORE HOME TABS */}
      <div className="w-full relative h-0 border-t border-gray-200">
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
      </div>
      
      {/* 5. "FIND YOUR PATH" — TABBED AUDIENCE SELECTOR */}
      <HomeTabs />

      {/* 6. "LATEST INNOVATIONS" — NEWS CARD ROW */}
      <section className="py-24 bg-white relative border-t border-gray-200">
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16 relative">
            
            
            <h2 className="text-[36px] md:text-[42px] font-light font-sans text-black mb-6">
              Latest Innovations
            </h2>
            <Link href="#" className="inline-flex items-center gap-2 px-6 py-2 border border-black/20 text-black font-bold text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors">
              EXPLORE MORE
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <Link href="#" className="group flex flex-col h-full shadow-sm hover:shadow-xl transition-shadow bg-[#FDF1D8]">
              <div className="w-full aspect-[16/10] bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" alt="Semiconductors" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-[#FDF1D8]">
                <div>
                  <p className="text-black font-bold text-[11px] uppercase tracking-[0.15em] mb-4">SEMICONDUCTORS</p>
                  <h3 className="text-[#222222] text-[20px] md:text-[22px] font-normal leading-[1.3] font-sans mb-8">Optical Tech Would Update a Robot's AI on the Fly</h3>
                </div>
                <p className="text-[#555555] text-[12px] font-sans mt-auto">26 Jul 2026</p>
              </div>
            </Link>

            <Link href="#" className="group flex flex-col h-full shadow-sm hover:shadow-xl transition-shadow bg-[#FDF1D8]">
              <div className="w-full aspect-[16/10] bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1974&auto=format&fit=crop" alt="Aerospace" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-[#FDF1D8]">
                <div>
                  <p className="text-black font-bold text-[11px] uppercase tracking-[0.15em] mb-4">AEROSPACE</p>
                  <h3 className="text-[#222222] text-[20px] md:text-[22px] font-normal leading-[1.3] font-sans mb-8">Poetry for Engineers: A Martian Rover Sends a Postcard Home</h3>
                </div>
                <p className="text-[#555555] text-[12px] font-sans mt-auto">25 Jul 2026</p>
              </div>
            </Link>

            <Link href="#" className="group flex flex-col h-full shadow-sm hover:shadow-xl transition-shadow bg-[#FDF1D8]">
              <div className="w-full aspect-[16/10] bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop" alt="Robotics" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-[#FDF1D8]">
                <div>
                  <p className="text-black font-bold text-[11px] uppercase tracking-[0.15em] mb-4">ROBOTICS</p>
                  <h3 className="text-[#222222] text-[20px] md:text-[22px] font-normal leading-[1.3] font-sans mb-8">Video Friday: An Italian Humanoid Comes to Life</h3>
                </div>
                <p className="text-[#555555] text-[12px] font-sans mt-auto">24 Jul 2026</p>
              </div>
            </Link>
          </div>
          
          
        </div>
      </section>

      {/* 7. REPORT / PUBLICATION PROMO */}
      <section className="py-24 bg-red-50 relative border-t border-gray-200">
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
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
              <Link href="#" className="inline-flex items-center justify-center px-8 py-4 border-2 border-[--color-navy] text-[--color-navy] font-bold text-sm tracking-widest uppercase hover:bg-[--color-gold] hover:border-[--color-gold] hover:text-[--color-navy] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 self-start">
                READ THE REPORT
              </Link>
            </div>
            
            {/* Right Gradient Panel */}
            <div 
              className="w-full lg:w-3/5 min-h-[400px] flex items-center justify-center p-12 overflow-hidden relative bg-gradient-to-br from-red-400 to-rose-300"
            >
              {/* Tilted Tablet Mockup Placeholder */}
              <div className="w-64 h-96 bg-white shadow-2xl transform rotate-12 flex flex-col overflow-hidden">
                <div className="h-12 bg-gray-100 border-b flex items-center px-4">
                  <div className="w-16 h-2 bg-gray-300"></div>
                </div>
                <div className="flex-1 bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center p-6 text-center">
                  <h3 className="text-white font-serif font-bold text-2xl">2026<br/>Tech Outlook</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. "VOICES" / TESTIMONIAL SPOTLIGHT */}
      <section className="py-24 bg-[--color-surface-blue] relative border-t border-gray-200">
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[--color-navy] font-bold text-sm tracking-widest mb-4">VOICES</p>
            <h2 className="text-4xl lg:text-5xl font-bold font-serif text-[--color-navy]">
              How Members Get Involved
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-0 shadow-xl bg-green-50">
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
              
              <Link href="#" className="inline-flex items-center justify-center px-8 py-4 border-2 border-[--color-navy] text-[--color-navy] font-bold text-sm tracking-widest uppercase hover:bg-[--color-gold] hover:border-[--color-gold] hover:text-[--color-navy] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 self-start">
                READ THE FULL PROFILE
              </Link>
            </div>
            
            {/* Right Photo */}
            <div className="w-full lg:w-1/2 h-[500px] lg:h-auto relative">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" alt="Member profile" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-green-100/95 backdrop-blur-sm p-6 border-t border-green-200">
                <p className="text-[--color-navy] font-bold text-lg">Dr. Sarah Jenkins</p>
                <p className="text-[--color-navy]/70 text-sm">Lead Researcher, Renewable Systems</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SECONDARY PUBLICATION CTA */}
      <section className="py-24 bg-white relative border-t border-gray-200">
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <p className="text-[--color-muted] text-xl mb-10 max-w-2xl leading-relaxed">
            Ready to share your research with a global audience? Explore our journals, magazines, and conference proceedings to find the right home for your work.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="#" className="inline-flex items-center justify-center px-8 py-4 border-2 border-[--color-navy] text-[--color-navy] font-bold text-sm tracking-widest uppercase hover:bg-[--color-gold] hover:border-[--color-gold] hover:text-[--color-navy] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              LEARN MORE AND SUBSCRIBE
            </Link>
            <Link href="#" className="inline-flex items-center justify-center px-8 py-4 bg-[--color-navy] border-2 border-[--color-navy] text-white font-bold text-sm tracking-widest uppercase hover:bg-[--color-gold] hover:border-[--color-gold] transition-colors">
              GET PUBLISHED
            </Link>
          </div>
        </div>
      </section>

      {/* 10. FINAL MEMBERSHIP CTA */}
      <section className="pt-12 pb-32 bg-white relative border-t border-gray-200">
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
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
      <section className="bg-white py-24 relative border-t border-gray-200">
        {/* Standard section divider crosshair */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="w-full bg-[#003B66] relative overflow-hidden flex flex-col md:flex-row py-24 md:py-32 shadow-xl">
            {/* Background image for the blue box */}
            <div className="absolute inset-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544396821-4dd40b938ad3?q=80&w=2073&auto=format&fit=crop')" }}></div>
            
            <div className="w-full md:w-1/2 flex items-center justify-center relative z-10 mb-12 md:mb-0">
              <h2 className="text-[36px] md:text-[42px] font-light font-sans text-white text-center tracking-wide">
                Keep Exploring
              </h2>
            </div>
            
            <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start relative z-10 md:pl-16 lg:pl-24">
              <ul className="flex flex-col gap-6">
                <li>
                  <Link href="/about" className="flex items-center gap-3 text-white hover:text-[--color-gold] transition-colors text-[16px] font-bold font-sans">
                    <span className="text-white text-xl font-light">&gt;</span> Membership Benefits
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="flex items-center gap-3 text-white hover:text-[--color-gold] transition-colors text-[16px] font-bold font-sans">
                    <span className="text-white text-xl font-light">&gt;</span> Upcoming Conferences
                  </Link>
                </li>
                <li>
                  <Link href="/achievements" className="flex items-center gap-3 text-white hover:text-[--color-gold] transition-colors text-[16px] font-bold font-sans">
                    <span className="text-white text-xl font-light">&gt;</span> Advance Your Career
                  </Link>
                </li>
                <li>
                  <Link href="/societies" className="flex items-center gap-3 text-white hover:text-[--color-gold] transition-colors text-[16px] font-bold font-sans">
                    <span className="text-white text-xl font-light">&gt;</span> Communities & Connection
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
