"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomeHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const slides = [
    {
      title: "Be a Part of Something Bigger.",
      subtitle: "Join the world's largest technical professional organization.",
      linkText: "> Join Now",
      href: "/join"
    },
    {
      title: "Innovate with Us.",
      subtitle: "Discover the latest in engineering and technology.",
      linkText: "> Explore",
      href: "/about"
    },
    {
      title: "Advance Your Career.",
      subtitle: "Unlock exclusive resources and networking opportunities.",
      linkText: "> Learn More",
      href: "/events"
    },
    {
      title: "Lead the Future.",
      subtitle: "Volunteer and shape the next generation of standards.",
      linkText: "> Volunteer",
      href: "/societies"
    },
    {
      title: "Connect Globally.",
      subtitle: "Engage with professionals across 160 countries.",
      linkText: "> Connect",
      href: "/contact"
    }
  ];

  const currentSlide = slides[activeSlide];

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-[--color-navy]">
      {/* Background Image / Video Placeholder */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')" }}
      ></div>
      <div className="absolute inset-0 bg-black/30"></div> {/* Dark overlay */}

      {/* Main Container */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Promo Card Bottom-Left */}
        <div className="absolute bottom-16 left-4 sm:left-6 lg:left-8 w-full max-w-md shadow-2xl">
          {/* Top Block */}
          <div className="bg-[--color-navy] p-8 md:p-10">
            <h1 className="text-white text-3xl md:text-[32px] font-bold font-serif leading-tight">
              {currentSlide.title}
            </h1>
          </div>
          {/* Bottom Block */}
          <div className="bg-white p-8 md:p-10 flex flex-col gap-6">
            <p className="text-[--color-muted] text-[16px] leading-relaxed">
              {currentSlide.subtitle}
            </p>
            <div className="flex items-center justify-between">
              <Link href={currentSlide.href} className="font-bold text-[--color-navy] hover:text-[--color-gold] transition-colors">
                {currentSlide.linkText}
              </Link>
              
              {/* Controls */}
              <div className="flex items-center gap-4">
                <button onClick={prevSlide} className="text-[--color-navy] hover:text-[--color-gold] transition-colors" aria-label="Previous">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="flex gap-1.5">
                  {slides.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-1.5 transition-all ${idx === activeSlide ? 'w-6 bg-[--color-navy]' : 'w-1.5 bg-[--color-border] hover:bg-[--color-muted]'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    ></button>
                  ))}
                </div>
                <button onClick={nextSlide} className="text-[--color-navy] hover:text-[--color-gold] transition-colors" aria-label="Next">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Play/Pause Button Bottom-Right */}
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className="absolute bottom-16 right-4 sm:right-6 lg:right-8 w-12 h-12 bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm border border-white/20"
          aria-label={isPaused ? "Play video" : "Pause video"}
        >
          {isPaused ? (
            <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          )}
        </button>
      </div>

      {/* Cookie Consent (Persistent across sections conceptually, placed here for hero demo) */}
      <div className="fixed bottom-4 left-4 z-50 w-10 h-10 bg-[--color-navy] text-white flex items-center justify-center shadow-lg cursor-pointer hover:bg-[--color-navy-light] transition-colors" title="Cookie Settings">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 22a10 10 0 100-20 10 10 0 000 20z" /><circle cx="9" cy="10" r="1" fill="currentColor" /><circle cx="15" cy="11" r="1" fill="currentColor" /><circle cx="11" cy="16" r="1.5" fill="currentColor" /></svg>
      </div>
    </section>
  );
}
