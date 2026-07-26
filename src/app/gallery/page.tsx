"use client";

import { useState, useCallback } from "react";
import PageHeader from "@/components/PageHeader";
import { getAllAlbums, getAlbumCategories, type GalleryImage } from "@/data/gallery";

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
      <PageHeader
        breadcrumb="Media"
        title="Gallery"
        subtitle="Moments from our events, workshops, and celebrations — captured in pixels."
      />

      <section className="py-24 bg-[#FAFAFA]" aria-label="Photo gallery">
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
                className={`px-6 py-2 border-2 border-[--color-navy] text-xs font-bold uppercase tracking-widest transition-colors ${
                  activeCategory === cat
                    ? "bg-[--color-navy] text-white"
                    : "bg-white text-[--color-navy] hover:bg-[--color-navy] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Albums ── */}
          {filtered.map((album) => (
            <div key={album.id} className="mb-20">
              <div className="flex flex-col mb-10">
                <h2 className="text-3xl font-bold font-serif text-[--color-navy] mb-2">
                  {album.title}
                </h2>
                <div className="tick-mark"></div>
                <span className="text-sm font-bold uppercase tracking-widest text-[--color-muted] mt-4">
                  {album.images.length} PHOTO{album.images.length !== 1 ? "S" : ""}
                </span>
              </div>

              {/* Masonry-ish grid using CSS columns */}
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
                {album.images.map((img) => (
                  <button
                    key={img.id}
                    className="w-full break-inside-avoid border border-[--color-border] bg-white p-1 hover:shadow-xl transition-shadow focus:outline-none focus-visible:ring-4 focus-visible:ring-[--color-navy] focus-visible:ring-offset-2"
                    onClick={() => setLightbox(img)}
                    aria-label={`View: ${img.alt}`}
                  >
                    {/* Placeholder coloured block (replaces real image until assets are added) */}
                    <div
                      className="w-full flex items-center justify-center text-white/40"
                      style={{
                        height: img.height > img.width ? "280px" : "200px",
                        background:
                          "linear-gradient(135deg, var(--color-navy-light) 0%, var(--color-navy) 100%)",
                      }}
                      aria-hidden="true"
                    >
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="sr-only">{img.alt}</p>
                  </button>
                ))}
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
