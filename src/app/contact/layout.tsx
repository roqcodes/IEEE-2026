/**
 * Contact section layout — provides metadata for the /contact route.
 * The page is a Client Component, so metadata lives here.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the IEEE CUSAT Student Branch — contact form, office hours, and social links.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
