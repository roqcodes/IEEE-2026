"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-white pt-16 pb-8 border-t-[2px] border-[--color-gold] relative z-10 text-[--color-charcoal]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Top Link Columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: ABOUT US (Two sub-columns) */}
          <div className="md:col-span-6 lg:col-span-5">
            <h3 className="text-sm font-bold tracking-wider mb-6 text-[--color-navy]">
              ABOUT US
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-3 text-sm text-[--color-muted]">
                <li><Link href="/about" className="hover:text-[--color-navy] hover:underline transition-colors">Our Mission</Link></li>
                <li><Link href="/about" className="hover:text-[--color-navy] hover:underline transition-colors">History</Link></li>
                <li><Link href="/execom" className="hover:text-[--color-navy] hover:underline transition-colors">Leadership</Link></li>
                <li><Link href="/achievements" className="hover:text-[--color-navy] hover:underline transition-colors">Achievements</Link></li>
                <li><Link href="/contact" className="hover:text-[--color-navy] hover:underline transition-colors">Contact Us</Link></li>
              </ul>
              <ul className="space-y-3 text-sm text-[--color-muted]">
                <li><Link href="#" className="hover:text-[--color-navy] hover:underline transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-[--color-navy] hover:underline transition-colors">Newsroom</Link></li>
                <li><Link href="/gallery" className="hover:text-[--color-navy] hover:underline transition-colors">Media Gallery</Link></li>
                <li><Link href="#" className="hover:text-[--color-navy] hover:underline transition-colors">Brand Guidelines</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 2: QUICK LINKS */}
          <div className="md:col-span-3 lg:col-span-4">
            <h3 className="text-sm font-bold tracking-wider mb-6 text-[--color-navy]">
              QUICK LINKS
            </h3>
              <ul className="space-y-3 text-sm text-[--color-muted]">
                <li><Link href="/join" className="hover:text-[--color-navy] hover:underline transition-colors">Join or Renew</Link></li>
                <li><Link href="/events" className="hover:text-[--color-navy] hover:underline transition-colors">Events & Workshops</Link></li>
                <li><Link href="/societies" className="hover:text-[--color-navy] hover:underline transition-colors">Explore Societies</Link></li>
              </ul>
          </div>

          {/* Column 3: FOLLOW US */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="text-sm font-bold tracking-wider mb-6 text-[--color-navy]">
              FOLLOW US
            </h3>
            <div className="flex flex-wrap gap-3">
              {/* Square social icons */}
              <a href="#" className="w-10 h-10 border border-[--color-border] flex items-center justify-center text-[--color-navy] hover:bg-[--color-surface-blue] hover:border-[--color-navy] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v4h-2zm0 6h2v2h-2z"/></svg> {/* Placeholder icon */}
              </a>
              <a href="#" className="w-10 h-10 border border-[--color-border] flex items-center justify-center text-[--color-navy] hover:bg-[--color-surface-blue] hover:border-[--color-navy] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-1 3h-2v6.93c5.05-.5 9-4.76 9-9.93z"/></svg> {/* Facebook */}
              </a>
              <a href="#" className="w-10 h-10 border border-[--color-border] flex items-center justify-center text-[--color-navy] hover:bg-[--color-surface-blue] hover:border-[--color-navy] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-3.5 13.5v-4.5c0-1.1-.9-2-2-2s-2 .9-2 2v4.5h-3v-9h3v1.2c.7-1 2-1.7 3.5-1.7 2.5 0 4.5 2 4.5 4.5v5h-3zM8 7.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6.5 20h3v-9h-3v9z"/></svg> {/* LinkedIn */}
              </a>
              <a href="#" className="w-10 h-10 border border-[--color-border] flex items-center justify-center text-[--color-navy] hover:bg-[--color-surface-blue] hover:border-[--color-navy] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5C19.42 2 22 4.58 22 7.75v8.5c0 3.17-2.58 5.75-5.75 5.75h-8.5C4.58 22 2 19.42 2 16.25v-8.5C2 4.58 4.58 2 7.75 2zm0 2C5.68 4 4 5.68 4 7.75v8.5C4 18.32 5.68 20 7.75 20h8.5c2.07 0 3.75-1.68 3.75-3.75v-8.5C20 5.68 18.32 4 16.25 4h-8.5zM12 7.5c2.48 0 4.5 2.02 4.5 4.5s-2.02 4.5-4.5 4.5-4.5-2.02-4.5-4.5 2.02-4.5 4.5-4.5zm0 2c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm4.75-3.25a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"/></svg> {/* Instagram */}
              </a>
              <a href="#" className="w-10 h-10 border border-[--color-border] flex items-center justify-center text-[--color-navy] hover:bg-[--color-surface-blue] hover:border-[--color-navy] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24H16.17l-5.21-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z"/></svg> {/* X */}
              </a>
            </div>
          </div>
        </div>

        {/* ── Full-width Divider ── */}
        <div className="w-full h-px bg-[--color-border] mb-8"></div>

        {/* ── Bottom Bar ── */}
        <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-6 h-6 bg-[--color-navy-light] flex items-center justify-center transform rotate-45 group-hover:scale-105 transition-transform">
              <span className="text-white text-[8px] font-bold transform -rotate-45 block leading-none">IEEE</span>
            </div>
            <span className="font-bold text-sm tracking-tight text-[--color-navy]">
              IEEE CUSAT
            </span>
          </Link>

          {/* Legal Links & Copyright */}
          <div className="flex flex-col items-center lg:items-end gap-2">
            <div className="flex flex-wrap justify-center lg:justify-end gap-x-6 gap-y-2 text-[12px] text-[--color-muted]">
              <Link href="#" className="hover:text-[--color-navy] hover:underline transition-colors">Accessibility</Link>
              <Link href="#" className="hover:text-[--color-navy] hover:underline transition-colors">Nondiscrimination Policy</Link>
              <Link href="#" className="hover:text-[--color-navy] hover:underline transition-colors">Ethics Reporting</Link>
              <Link href="#" className="hover:text-[--color-navy] hover:underline transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-[--color-navy] hover:underline transition-colors">Terms & Disclosures</Link>
              <Link href="#" className="hover:text-[--color-navy] hover:underline transition-colors">Feedback</Link>
            </div>
            <p className="text-[12px] text-[--color-muted]">
              © {currentYear} IEEE CUSAT Student Branch. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
