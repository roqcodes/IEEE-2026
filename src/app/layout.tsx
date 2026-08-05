/**
 * Root Layout — wraps every page with the Navbar and Footer.
 * Metadata here acts as the site-wide fallback; each page can override it.
 *
 * Font: Inter from next/font/google (variable font, subset latin)
 * Tailwind v4: body keeps min-h-screen, flex, flex-col so footer sticks bottom.
 */
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    <html
      lang="en"
      className="h-full scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[--color-charcoal] font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
