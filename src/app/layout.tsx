/**
 * Root Layout — wraps every page with the Navbar and Footer.
 * Metadata here acts as the site-wide fallback; each page can override it.
 *
 * Font: Inter from next/font/google (variable font, subset latin)
 * Tailwind v4: body keeps min-h-screen, flex, flex-col so footer sticks bottom.
 */
import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable} h-full scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-white text-[--color-charcoal] font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
