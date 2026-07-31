"use client";

import { useState, useCallback } from "react";
import PageHeader from "@/components/PageHeader";
import { getAllAlbums, getAlbumCategories, type GalleryImage } from "@/data/gallery";

const boxColors = ['bg-red-50', 'bg-blue-50', 'bg-green-50', 'bg-yellow-50', 'bg-purple-50', 'bg-pink-50', 'bg-orange-50', 'bg-teal-50'];
export default function GalleryPage() {
  const albums = getAllAlbums();
  const categories = ["All", ...getAlbumCategories()];

  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const filtered =
    activeCategory === "All"
      ? albums
      : albums.filter((a) => a.event === activeCategory);

  /* Close lightbox on Escape */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    },
    []
  );

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
        {/* Decorative Left Bar */}
        <div 
          className="absolute top-20 left-0 bottom-0 w-3 md:w-8 lg:w-12 bg-[#F2A900] z-40 shadow-[4px_0_15px_rgba(0,0,0,0.1)] animate-bar-down"
          style={{ borderBottomRightRadius: '16px' }}
          aria-hidden="true"
        />
        {/* Decorative Top Line below navbar */}
        <div 
          className="absolute top-20 left-0 w-full h-[6px] bg-[#F2A900] z-40 animate-line-right"
          aria-hidden="true"
        />
        <PageHeader
          breadcrumb="Media"
          title="Gallery"
          subtitle="Moments from our events, workshops, and celebrations — captured in pixels."
        />
      </div>

      <section className="relative border-t border-gray-200 py-24" aria-label="Photo gallery">
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Category filters ── */}
          <div
            className="flex flex-wrap gap-2 mb-16"
            role="group"
            aria-label="Filter albums by category"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`px-8 py-3 border-2 border-[--color-navy] text-xs font-bold uppercase tracking-widest transition-colors ${activeCategory === cat
                    ? "bg-[#0A2540] text-white"
                    : "bg-white text-[--color-navy] hover:bg-[#0A2540] hover:text-white"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Albums ── */}
          {filtered.map((album, idx) => (
            <div key={album.id} className="mb-20">
              <div className="flex flex-col mb-10">
                <h2 className="text-3xl font-bold font-serif text-[--color-navy] mb-2">
                  {album.title}
                </h2>

                <span className="text-sm font-bold uppercase tracking-widest text-[--color-muted] mt-4">
                  {album.images.length} PHOTO{album.images.length !== 1 ? "S" : ""}
                </span>
              </div>

              {/* Masonry-ish grid using CSS columns */}
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
                {album.images.map((img) => (
                  <button
                    key={img.id}
                    className="relative group w-full break-inside-avoid border border-[--color-border] bg-white p-1 hover:shadow-xl transition-shadow focus:outline-none focus-visible:ring-4 focus-visible:ring-[--color-navy] focus-visible:ring-offset-2 overflow-hidden"
                    onClick={() => setLightbox(img)}
                    aria-label={`View: ${img.alt}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${img.id}/${img.width > 800 ? 800 : img.width}/${img.height > 800 ? 800 : img.height}`}
                      alt={img.alt}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 font-bold tracking-widest uppercase transition-opacity">View</span>
                    </div>
                  </button>
                ))}

                {/* View More Box */}
                <button
                  className="group relative w-full break-inside-avoid border-4 border-black flex flex-col items-center justify-center p-8 hover:opacity-90 transition-opacity text-black aspect-[3/2] focus:outline-none focus-visible:ring-4 focus-visible:ring-[--color-navy] focus-visible:ring-offset-2 overflow-hidden"
                  aria-label={`View more photos from ${album.title}`}
                  style={{
                    backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.9) 100%), conic-gradient(#e5e7eb 90deg, #f9fafb 90deg 180deg, #e5e7eb 180deg 270deg, #f9fafb 270deg)",
                    backgroundSize: "100% 100%, 32px 32px",
                  }}
                >
                  <div className="relative z-10 flex items-center gap-2 font-serif text-xl font-bold transition-transform group-hover:scale-105 bg-white/70 px-4 py-2 rounded-full backdrop-blur-sm border border-white">
                    <span>More</span>
                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-32 bg-white border border-[--color-border] text-[--color-muted] shadow-sm">
              <p className="text-4xl mb-6">📷</p>
              <p className="text-xl font-bold font-serif text-[--color-navy]">No albums in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Lightbox modal ── */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(10, 37, 64, 0.95)" }}
          onClick={() => setLightbox(null)}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          {/* Modal content — stop propagation so clicking inside doesn't close */}
          <div
            className="relative max-w-5xl w-full bg-white p-2 border-4 border-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Placeholder for lightbox image */}
            <div
              className="w-full flex items-center justify-center text-white min-h-[300px]"
              style={{
                height: "min(80vh, 700px)",
                background: "linear-gradient(135deg, var(--color-navy-light) 0%, #4B2E83 100%)",
              }}
              aria-hidden="true"
            >
              <svg className="w-24 h-24 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="p-6 bg-white">
              <p className="text-[--color-charcoal] text-lg font-serif italic text-center">{lightbox.alt}</p>
            </div>
            {/* Close button */}
            <button
              className="absolute -top-12 right-0 w-10 h-10 border-2 border-white bg-transparent flex items-center justify-center text-white hover:bg-white hover:text-[--color-navy] transition-colors"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
