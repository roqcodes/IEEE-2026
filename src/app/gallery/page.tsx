"use client";

import { useState, useCallback } from "react";
import PageHeader from "@/components/PageHeader";
import PageSection from "@/components/home/PageSection";
import FilterTabs from "@/components/home/FilterTabs";
import PremiumCard from "@/components/home/PremiumCard";
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

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") setLightbox(null);
  }, []);

  const filterTabs = categories.map((cat) => ({ label: cat, value: cat }));

  return (
    <div className="site-page">
      <PageHeader
        breadcrumb="Media"
        title="Gallery"
        subtitle="Take a look at the people, events, workshops, celebrations, and experiences that capture the journey of IEEE CUSAT Student Branch."
      />

      <PageSection aria-label="Photo gallery" sideGlow="right">
        <FilterTabs
          tabs={filterTabs}
          value={activeCategory}
          onChange={setActiveCategory}
          ariaLabel="Filter albums by category"
        />

        {filtered.map((album) => (
          <div key={album.id} className="mb-16 last:mb-0">
            <div className="mb-8">
              <p className="text-caption mb-2">{album.event}</p>
              <h2 className="section-title text-2xl sm:text-3xl">{album.title}</h2>
              <p className="text-body mt-2">
                {album.images.length} photo{album.images.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
              {album.images.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  className="relative group w-full break-inside-avoid border border-ieee-border bg-white p-1 hover:shadow-[0_16px_40px_rgba(0,98,155,0.1)] hover:border-ieee-blue/35 transition-all duration-200 ease-linear delay-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ieee-blue overflow-hidden"
                  onClick={() => setLightbox(img)}
                  aria-label={`View: ${img.alt}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/${img.id}/${img.width > 800 ? 800 : img.width}/${img.height > 800 ? 800 : img.height}`}
                    alt={img.alt}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-ieee-navy/0 group-hover:bg-ieee-navy/20 transition-colors duration-200 ease-linear delay-0 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 text-caption transition-opacity duration-200 ease-linear delay-0">
                      View
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <PremiumCard className="text-center py-20 px-8">
            <p className="text-card-title mb-2">No albums in this category yet</p>
            <p className="text-body">Check back after our next event.</p>
          </PremiumCard>
        )}
      </PageSection>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ieee-navy/95"
          onClick={() => setLightbox(null)}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div
            className="relative max-w-5xl w-full bg-white border border-ieee-border shadow-[0_24px_64px_rgba(0,59,102,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-full flex items-center justify-center min-h-[300px] bg-gradient-to-br from-ieee-sky to-ieee-sky-muted"
              style={{ height: "min(80vh, 700px)" }}
              aria-hidden="true"
            >
              <svg className="w-24 h-24 text-ieee-blue/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="p-6 border-t border-ieee-border">
              <p className="text-body text-center">{lightbox.alt}</p>
            </div>
            <button
              type="button"
              className="absolute -top-12 right-0 w-10 h-10 border border-white/40 text-white hover:bg-white hover:text-ieee-navy transition-colors duration-200 ease-linear delay-0 flex items-center justify-center"
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
    </div>
  );
}
