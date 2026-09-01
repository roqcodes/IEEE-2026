"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { branchMeta } from "@/data/branch";

const nav = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Chapters", href: "/societies" },
  { label: "Awards", href: "/achievements" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team", href: "/execom" },
  { label: "Contact", href: "/contact" },
  { label: "Join", href: "/join" },
];

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-line bg-white">
      <div className="container-editorial py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone mb-2">
              IEEE
            </p>
            <p className="text-lg font-bold uppercase tracking-[0.06em] text-ink mb-4">
              CUSAT Student Branch
            </p>
            <p className="text-sm text-graphite leading-relaxed max-w-xs">
              {branchMeta.university}
              <br />
              {branchMeta.location}
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow mb-6">Navigation</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-graphite hover:text-ink transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-6">Connect</p>
            <div className="flex flex-col gap-3 text-sm text-graphite">
              <a href="https://ieee.org" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
                ieee.org
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
                LinkedIn
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="rule-h my-10" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[10px] uppercase tracking-[0.15em] text-stone">
          <p>© {year} {branchMeta.shortName}</p>
          <p>{branchMeta.section}</p>
        </div>
      </div>
    </footer>
  );
}
