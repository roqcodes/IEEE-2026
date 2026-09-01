"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import PremiumButton from "@/components/home/PremiumButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/societies", label: "Chapters" },
  { href: "/achievements", label: "Awards" },
  { href: "/gallery", label: "Gallery" },
  { href: "/execom", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/";
  const merged = isHome && !scrolled;

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={cn(
          "transition-[box-shadow,border-color,background-color,backdrop-filter] duration-300",
          merged
            ? "bg-transparent border-b border-transparent text-ink"
            : "bg-white/92 backdrop-blur-md border-b border-ieee-border text-ink shadow-[0_1px_12px_rgba(0,98,155,0.06)]"
        )}
      >
        <div className="container-editorial flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2.5 group min-w-0">
            <Image
              src="/ieee.webp"
              alt="IEEE"
              width={1024}
              height={340}
              priority
              className="h-8 lg:h-10 w-auto group-hover:opacity-80 transition-opacity"
              style={{ width: "auto" }}
            />
            <span className="text-sm font-bold uppercase tracking-[0.08em] group-hover:opacity-70 transition-opacity">
              CUSAT SB
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-60",
                  pathname === link.href && "opacity-100 underline underline-offset-8 decoration-1",
                  pathname !== link.href && "opacity-80"
                )}
              >
                {link.label}
              </Link>
            ))}
            <PremiumButton href="/join" size="sm">
              Join
            </PremiumButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-1.5 w-5">
              <span className={cn("h-px bg-current transition-transform", open && "translate-y-[7px] rotate-45")} />
              <span className={cn("h-px bg-current transition-opacity", open && "opacity-0")} />
              <span className={cn("h-px bg-current transition-transform", open && "-translate-y-[7px] -rotate-45")} />
            </div>
          </button>
        </div>
      </nav>

      {open && (
        <div
          className={cn(
            "lg:hidden border-b border-ieee-border",
            merged ? "bg-ieee-sky-muted/95 backdrop-blur-md" : "bg-white/92 backdrop-blur-md"
          )}
        >
          <ul className="container-editorial py-4 flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-semibold uppercase tracking-[0.12em] text-ink border-b border-line last:border-0"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <PremiumButton
                href="/join"
                size="sm"
                fullWidth
                onClick={() => setOpen(false)}
              >
                Join IEEE CUSAT
              </PremiumButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
