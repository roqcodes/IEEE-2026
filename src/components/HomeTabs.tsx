"use client";

import { useState } from "react";

const tabs = [
  {
    label: "Industry Professionals",
    text: "Access the latest technical information and research, global networking opportunities, and career development resources to stay ahead in your field.",
    linkText: "> Explore industry connections",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
  },
  {
    label: "Authors & Researchers",
    text: "Publish with the world's most trusted technology organization. Reach a global audience of millions and advance the state of the art in your discipline.",
    linkText: "> View publishing options",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop"
  },
  {
    label: "Students & Young Professionals",
    text: "Jumpstart your career with scholarships, competitions, mentorship programs, and local student branch activities tailored for your growth.",
    linkText: "> Discover student benefits",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
  },
  {
    label: "Volunteers",
    text: "Shape the future of technology by leading initiatives, organizing conferences, and driving global standards development.",
    linkText: "> Get involved",
    image: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=2070&auto=format&fit=crop"
  },
  {
    label: "New Members",
    text: "Welcome to the community! Discover how to maximize your membership value, join local chapters, and access your exclusive benefits.",
    linkText: "> Member quick start",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1949&auto=format&fit=crop"
  },
  {
    label: "Retirees",
    text: "Stay connected with your professional network, mentor the next generation, and continue contributing your lifelong expertise.",
    linkText: "> Learn more",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop"
  }
];

export default function HomeTabs() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      <h2 className="text-[40px] font-bold font-serif text-[--color-navy] text-center mb-16 leading-tight max-w-3xl mx-auto">
        Advance your career, innovate, and connect with the global community.
      </h2>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Left Column: Tabs */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <p className="italic font-serif text-[--color-navy] text-lg mb-4">
            Find your path at IEEE CUSAT
          </p>
          <div className="tick-mark mb-6"></div>
          
          <div className="flex flex-col relative z-0">
            {/* Dynamic Curving Line from Fixed Left Point */}
            <svg 
              className="absolute right-full top-0 w-[100vw] h-full pointer-events-none z-0 opacity-80"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path 
                d={`M 0 50 L 90 50 C 95 50, 95 ${(activeIndex + 0.5) * (100 / tabs.length)}, 100 ${(activeIndex + 0.5) * (100 / tabs.length)}`}
                stroke="#60A5FA" 
                strokeWidth="2.5" 
                fill="none" 
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ transition: 'all 700ms cubic-bezier(0.25, 1, 0.5, 1)' }}
              />
            </svg>

            {/* Liquid Sliding Background */}
            <div 
              className="absolute left-0 top-0 w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-md z-0"
              style={{
                height: `${100 / tabs.length}%`,
                transform: `translateY(${activeIndex * 100}%)`,
                backgroundColor: 'var(--color-navy)'
              }}
            ></div>
            
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                style={{ color: activeIndex === idx ? 'white' : 'var(--color-muted)' }}
                className={`relative z-10 text-left text-[18px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] py-4 px-6 w-full transform-gpu font-semibold ${
                  activeIndex === idx ? "translate-x-4" : "hover:text-[--color-navy] hover:translate-x-2"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Panel */}
        <div className="w-full lg:w-2/3 relative min-h-[350px] lg:min-h-[400px] overflow-hidden shadow-xl bg-[--color-navy]">
          {tabs.map((tab, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                activeIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Fluid Background Image */}
              <div 
                className={`absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  activeIndex === idx ? "scale-100" : "scale-110"
                }`}
                style={{ backgroundImage: `url('${tab.image}')` }}
              ></div>

              {/* Solid Dark Blue Rectangle Over Image */}
              <div className="absolute bottom-0 right-0 w-[90%] md:w-[70%] max-w-lg bg-[--color-navy] p-8 md:p-12 shadow-2xl">
                <div className={`transition-all duration-1000 delay-100 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  activeIndex === idx ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}>
                  <p className="text-white text-[16px] md:text-[18px] leading-relaxed mb-6 font-sans">
                    {tab.text}
                  </p>
                  <a href="#" className="font-bold text-white hover:text-[--color-gold] transition-colors text-lg inline-block w-fit">
                    {tab.linkText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
