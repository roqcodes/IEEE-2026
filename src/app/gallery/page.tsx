"use client";
/**
 * Gallery Page — /gallery
 * Client Component for album filter + lightbox interaction.
 *
 * Features:
 *   - Category filter chips at the top
 *   - Masonry-style image grid per album
 *   - Lightbox modal on image click (keyboard accessible)
 *
 * Data sourced from /data/gallery.ts — add new albums there.
 */

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

      <section className="py-16 bg-white" aria-label="Photo gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Category filters ── */}
          <div
            className="flex flex-wrap gap-2 mb-12"
            role="group"
            aria-label="Filter albums by category"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={[
                  "px-4 py-1.5 rounded-full text-sm font-semibold border transition-all",
                  activeCategory === cat
                    ? "text-white border-transparent"
                    : "text-[--color-slate] border-[--color-border] hover:border-[--color-ieee-blue] hover:text-[--color-ieee-blue]",
                ].join(" ")}
                style={
                  activeCategory === cat
                    ? { background: "var(--color-ieee-blue)" }
                    : {}
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Albums ── */}
          {filtered.map((album) => (
            <div key={album.id} className="mb-16">
              <h2 className="text-xl font-bold text-[--color-navy] mb-6 flex items-center gap-3">
                <span
                  className="inline-block w-8 h-1.5 rounded-full"
                  style={{ background: "var(--color-ieee-blue)" }}
                  aria-hidden="true"
                />
                {album.title}
                <span className="text-sm font-normal text-[--color-muted]">
                  ({album.images.length} photo{album.images.length !== 1 ? "s" : ""})
                </span>
              </h2>

              {/* Masonry-ish grid using CSS columns */}
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
                {album.images.map((img) => (
                  <button
                    key={img.id}
                    className="w-full break-inside-avoid rounded-xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ieee-blue] focus-visible:ring-offset-2"
                    onClick={() => setLightbox(img)}
                    aria-label={`View: ${img.alt}`}
                  >
                    {/* Placeholder coloured block (replaces real image until assets are added) */}
                    <div
                      className="w-full flex items-center justify-center text-white/40"
                      style={{
                        height: img.height > img.width ? "280px" : "200px",
                        background:
                          "linear-gradient(135deg, var(--color-ieee-blue-dark)33, var(--color-ieee-blue)66)",
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
            <p className="text-center text-[--color-muted] py-20 text-lg">
              No albums in this category yet.
            </p>
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
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setLightbox(null)}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          {/* Modal content — stop propagation so clicking inside doesn't close */}
          <div
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-[--color-navy]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Placeholder for lightbox image */}
            <div
              className="w-full flex items-center justify-center text-white/20 min-h-64"
              style={{
                height: "min(70vh, 600px)",
                background:
                  "linear-gradient(135deg, var(--color-navy) 0%, var(--color-ieee-blue-dark) 100%)",
              }}
              aria-hidden="true"
            >
              <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="p-4 bg-[--color-navy-800]">
              <p className="text-sm text-gray-300">{lightbox.alt}</p>
            </div>
            {/* Close button */}
            <button
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
