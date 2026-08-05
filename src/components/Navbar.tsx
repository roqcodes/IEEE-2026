"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const isHome = pathname === "/";
  // On home, it's transparent (unless scrolled). On other pages, always solid white.
  const isSolid = !isHome || scrolled;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col transition-colors duration-300">
      {/* ── 2. Main Header ── */}
      <nav
        className={`w-full transition-colors duration-300 ${
          isSolid ? "bg-white border-b border-[--color-border] shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          {/* Logo Lockup */}
          <Link href="/" className="flex items-center gap-4 group">
            {/* Geometric diamond logo */}
            <div className="w-10 h-10 bg-[--color-navy-light] flex items-center justify-center transform rotate-45 group-hover:scale-105 transition-transform">
              <span className="text-white text-xs font-bold transform -rotate-45 block leading-none">IEEE</span>
            </div>
            <div className={`flex flex-col ${isSolid ? "text-[--color-navy]" : "text-white"}`}>
              <span className="font-bold text-xl tracking-tight leading-none mb-1">
                IEEE CUSAT
              </span>
              <span className="italic text-xs opacity-90 leading-none font-serif">
                Advancing Technology for Humanity
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className={`font-bold text-sm tracking-widest uppercase hover:text-[--color-gold] transition-colors ${isSolid ? "text-[--color-navy]" : "text-white"}`}>Home</Link>
            <Link href="/about" className={`font-bold text-sm tracking-widest uppercase hover:text-[--color-gold] transition-colors ${isSolid ? "text-[--color-navy]" : "text-white"}`}>About</Link>
            <Link href="/events" className={`font-bold text-sm tracking-widest uppercase hover:text-[--color-gold] transition-colors ${isSolid ? "text-[--color-navy]" : "text-white"}`}>Events</Link>
            <Link href="/societies" className={`font-bold text-sm tracking-widest uppercase hover:text-[--color-gold] transition-colors ${isSolid ? "text-[--color-navy]" : "text-white"}`}>Societies</Link>
            <Link href="/gallery" className={`font-bold text-sm tracking-widest uppercase hover:text-[--color-gold] transition-colors ${isSolid ? "text-[--color-navy]" : "text-white"}`}>Gallery</Link>
            <Link href="/contact" className={`font-bold text-sm tracking-widest uppercase hover:text-[--color-gold] transition-colors ${isSolid ? "text-[--color-navy]" : "text-white"}`}>Contact</Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Icon */}
            <button
              className={`w-10 h-10 border flex items-center justify-center transition-colors ${
                isSolid
                  ? "border-[--color-border] text-[--color-navy] hover:bg-gray-50"
                  : "border-white/30 text-white hover:bg-white/10"
              }`}
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            {/* Hamburger Icon */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`w-10 h-10 border flex items-center justify-center transition-colors lg:hidden ${
                isSolid
                  ? "border-[--color-border] text-[--color-navy] hover:bg-gray-50"
                  : "border-white/30 text-white hover:bg-white/10"
              }`}
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown (Basic placeholder) */}
      {menuOpen && (
        <div className="bg-white border-b border-[--color-border] absolute top-full left-0 w-full shadow-lg lg:hidden">
          <ul className="flex flex-col p-4">
            <li><Link href="/" onClick={() => setMenuOpen(false)} className="block py-3 text-[--color-navy] font-semibold border-b">Home</Link></li>
            <li><Link href="/about" onClick={() => setMenuOpen(false)} className="block py-3 text-[--color-navy] font-semibold border-b">About</Link></li>
            <li><Link href="/events" onClick={() => setMenuOpen(false)} className="block py-3 text-[--color-navy] font-semibold border-b">Events</Link></li>
            <li><Link href="/societies" onClick={() => setMenuOpen(false)} className="block py-3 text-[--color-navy] font-semibold border-b">Societies</Link></li>
            <li><Link href="/gallery" onClick={() => setMenuOpen(false)} className="block py-3 text-[--color-navy] font-semibold border-b">Gallery</Link></li>
            <li><Link href="/contact" onClick={() => setMenuOpen(false)} className="block py-3 text-[--color-navy] font-semibold">Contact</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}
