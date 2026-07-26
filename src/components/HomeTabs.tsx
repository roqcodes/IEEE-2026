"use client";

import { useState } from "react";

const tabs = [
  {
    label: "Industry Professionals",
    text: "Access the latest technical information and research, global networking opportunities, and career development resources to stay ahead in your field.",
    linkText: "> Explore industry connections"
  },
  {
    label: "Authors & Researchers",
    text: "Publish with the world's most trusted technology organization. Reach a global audience of millions and advance the state of the art in your discipline.",
    linkText: "> View publishing options"
  },
  {
    label: "Students & Young Professionals",
    text: "Jumpstart your career with scholarships, competitions, mentorship programs, and local student branch activities tailored for your growth.",
    linkText: "> Discover student benefits"
  },
  {
    label: "Volunteers",
    text: "Shape the future of technology by leading initiatives, organizing conferences, and driving global standards development.",
    linkText: "> Get involved"
  },
  {
    label: "New Members",
    text: "Welcome to the community! Discover how to maximize your membership value, join local chapters, and access your exclusive benefits.",
    linkText: "> Member quick start"
  },
  {
    label: "Retirees",
    text: "Stay connected with your professional network, mentor the next generation, and continue contributing your lifelong expertise.",
    linkText: "> Learn more"
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
          
          <div className="flex flex-col gap-4">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`text-left text-[18px] transition-colors py-2 ${
                  activeIndex === idx 
                    ? "font-bold text-[--color-navy]" 
                    : "font-normal text-[--color-muted] hover:text-[--color-navy]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Panel */}
        <div className="w-full lg:w-2/3">
          <div className="bg-[--color-navy] p-10 md:p-16 text-white min-h-[300px] flex flex-col justify-center shadow-xl transition-all duration-300">
            <p className="text-[18px] md:text-[20px] leading-relaxed mb-8 font-sans">
              {tabs[activeIndex].text}
            </p>
            <a href="#" className="font-bold text-[--color-gold] hover:text-white transition-colors text-lg">
              {tabs[activeIndex].linkText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
