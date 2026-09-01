/**
 * Root Layout — wraps every page with the Navbar and Footer.
 * Fonts: Cormorant Garamond (display) + DM Sans (body) via next/font/google
 */
import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IEEE CUSAT Student Branch",
    template: "%s | IEEE CUSAT SB",
  },
  description:
    "Official website of the IEEE CUSAT Student Branch — connecting engineers, fostering innovation, and advancing technology at Cochin University of Science and Technology.",
  keywords: ["IEEE", "CUSAT", "Student Branch", "IEEE CUSAT", "Engineering"],
  authors: [{ name: "IEEE CUSAT Student Branch" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "IEEE CUSAT Student Branch",
  },
};

export const viewport = {
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`h-full ${cormorant.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-white text-charcoal font-sans">
        <SmoothScroll />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
