import React from "react";
import type { Society } from "@/data/societies";

const sampleImages: Record<string, string> = {
  cs: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  ras: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
  wie: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  pes: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
  comm: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  sight: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80",
};

interface SocietyCardProps {
  society: Society;
}

export default function SocietyCard({ society }: SocietyCardProps) {
  const imageUrl = sampleImages[society.id] || sampleImages.cs;

  return (
    <article className="group flex flex-col bg-white rounded-lg shadow-[0_2px_1px_-1px_rgba(0,0,0,0.1),0_1px_1px_0_rgba(0,0,0,0.06),0_1px_3px_0_rgba(0,0,0,0.04)] overflow-hidden transition-shadow hover:shadow-[0_3px_3px_-2px_rgba(0,0,0,0.1),0_3px_4px_0_rgba(0,0,0,0.06),0_1px_8px_0_rgba(0,0,0,0.04)] border border-gray-200/60">
      {/* 1. Header (Avatar, Title, Subhead) */}
      <div className="flex items-center p-4">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-lg flex-shrink-0"
          style={{ backgroundColor: society.color }}
        >
          {society.name.charAt(0).toUpperCase()}
        </div>
        {/* Titles */}
        <div className="ml-4 flex flex-col">
          <h3 className="text-lg font-medium leading-tight text-gray-900 mb-0.5">
            {society.name}
          </h3>
          <p className="text-sm font-normal text-gray-500">
            {society.fullName}
          </p>
        </div>
      </div>

      {/* 2. Media (Banner Image) */}
      <div className="w-full relative h-[194px] bg-gray-100 flex-shrink-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={`${society.name} banner`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* 3. Supporting text */}
      <div className="p-4 flex-grow">
        <p className="text-sm font-normal leading-relaxed text-gray-600 line-clamp-3">
          {society.description}
        </p>
      </div>

      {/* 4. Actions */}
      <div className="flex items-center justify-between px-2 pb-2 pt-0">
        {/* Left actions */}
        <div className="flex items-center gap-1">
          {society.link ? (
            <a
              href={society.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-[13px] font-bold tracking-wide uppercase transition-colors rounded bg-gray-100 hover:bg-gray-200 border border-transparent hover:border-gray-300"
              style={{ color: society.color }}
            >
              Action 1
            </a>
          ) : (
            <button
              className="px-3 py-2 text-[13px] font-bold tracking-wide uppercase transition-colors rounded bg-gray-100 hover:bg-gray-200 border border-transparent hover:border-gray-300"
              style={{ color: society.color }}
            >
              Action 1
            </button>
          )}
          <button
            className="px-3 py-2 text-[13px] font-bold tracking-wide uppercase transition-colors rounded bg-gray-100 hover:bg-gray-200 border border-transparent hover:border-gray-300"
            style={{ color: society.color }}
          >
            Action 2
          </button>
        </div>
        
        {/* Right icons */}
        <div className="flex items-center text-gray-500 gap-1 mr-1">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600" aria-label="Favorite">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600" aria-label="Share">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
