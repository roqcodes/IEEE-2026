"use client";

import { useState, useCallback, FormEvent } from "react";
import PageHeader from "@/components/PageHeader";
import PageSection from "@/components/home/PageSection";
import SectionHeader from "@/components/home/SectionHeader";
import PremiumCard from "@/components/home/PremiumCard";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Twitter/X", href: "https://x.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 800));
    console.log("Contact form submission:", form);
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <div className="site-page">
      <PageHeader
        breadcrumb="Reach Out"
        title="Contact Us"
        subtitle="Connect with IEEE CUSAT Student Branch for membership, events, chapters, collaborations, or any questions about getting involved."
      />

      <PageSection aria-label="Contact section" sideGlow="left">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-3">
            <SectionHeader
              eyebrow="Message"
              title="Send Us a Message"
              subtitle="We'll get back to you as soon as possible."
            />

            {status === "success" ? (
              <div role="alert" className="mt-8">
                <PremiumCard className="p-8">
                <h3 className="text-card-title mb-2">Message Sent</h3>
                <p className="text-body mb-6">We&apos;ll get back to you within 24 hours.</p>
                <button
                  type="button"
                  className="section-link"
                  onClick={() => setStatus("idle")}
                >
                  Send another message
                </button>
                </PremiumCard>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="form-label">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="form-label">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="form-label">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select a subject…</option>
                    <option value="membership">IEEE Membership</option>
                    <option value="events">Events & Workshops</option>
                    <option value="sponsorship">Sponsorship & Collaboration</option>
                    <option value="societies">Chapters & Societies</option>
                    <option value="media">Media / Press</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="form-label">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help…"
                    className="form-input resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary disabled:opacity-70"
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>

          <aside className="lg:col-span-2 space-y-5">
            <SectionHeader eyebrow="Contact" title="Get in Touch" />

            <PremiumCard className="p-6">
              <ContactItem
                label="Email"
                value="ieee@cusat.ac.in"
                href="mailto:ieee@cusat.ac.in"
              />
              <ContactItem
                label="Address"
                value="School of Engineering, CUSAT, Kochi — 682 022, Kerala, India"
                className="mt-6"
              />
            </PremiumCard>

            <PremiumCard className="p-6">
              <h3 className="text-card-title text-lg mb-5">Office Hours</h3>
              <dl className="space-y-3 text-sm">
                {[
                  { day: "Monday – Friday", time: "10:00 AM – 5:00 PM" },
                  { day: "Saturday", time: "10:00 AM – 1:00 PM" },
                  { day: "Sunday", time: "Closed" },
                ].map((h) => (
                  <div key={h.day} className="flex justify-between gap-4">
                    <dt className="text-body">{h.day}</dt>
                    <dd className="font-semibold text-ieee-navy">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </PremiumCard>

            <PremiumCard className="p-6">
              <h3 className="text-card-title text-lg mb-5">Follow Us</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`IEEE CUSAT on ${s.label}`}
                    title={s.label}
                    className="w-11 h-11 flex items-center justify-center border border-ieee-border bg-white text-ieee-navy hover:border-ieee-blue hover:bg-ieee-sky-muted transition-colors duration-200 ease-linear delay-0"
                  >
                    <SocialIcon label={s.label} />
                  </a>
                ))}
              </div>
            </PremiumCard>
          </aside>
        </div>
      </PageSection>
    </div>
  );
}

function ContactItem({
  label,
  value,
  href,
  className = "",
}: {
  label: string;
  value: string;
  href?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-caption mb-1">{label}</p>
      {href ? (
        <a href={href} className="text-body font-medium text-ieee-navy hover:text-ieee-blue transition-colors">
          {value}
        </a>
      ) : (
        <p className="text-body">{value}</p>
      )}
    </div>
  );
}

function SocialIcon({ label }: { label: string }) {
  if (label === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true" fill="currentColor">
        <path d="M5.2 3.5A2.2 2.2 0 1 1 5.2 7.9a2.2 2.2 0 0 1 0-4.4ZM3.4 9.4h3.6V20H3.4V9.4Zm5.7 0h3.4v1.45h.05c.47-.89 1.62-1.83 3.35-1.83 3.58 0 4.24 2.36 4.24 5.44V20h-3.55v-4.9c0-1.17-.02-2.67-1.63-2.67-1.64 0-1.89 1.28-1.89 2.59V20H9.1V9.4Z" />
      </svg>
    );
  }

  if (label === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.7" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (label === "Twitter/X") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true" fill="currentColor">
        <path d="M18.9 3H22l-6.77 7.74L23.2 21h-6.24l-4.89-6.39L6.48 21H3.36l7.24-8.27L3 3h6.4l4.42 5.82L18.9 3Zm-1.1 15.97h1.73L8.55 4.93H6.7L17.8 18.97Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true" fill="currentColor">
      <path d="M21.6 7.1a2.9 2.9 0 0 0-2.04-2.05C17.76 4.55 12 4.55 12 4.55s-5.76 0-7.56.5A2.9 2.9 0 0 0 2.4 7.1C1.9 8.9 1.9 12 1.9 12s0 3.1.5 4.9a2.9 2.9 0 0 0 2.04 2.05c1.8.5 7.56.5 7.56.5s5.76 0 7.56-.5a2.9 2.9 0 0 0 2.04-2.05c.5-1.8.5-4.9.5-4.9s0-3.1-.5-4.9Z" />
      <path d="m10.1 15.35 5.05-3.35L10.1 8.65v6.7Z" fill="white" />
    </svg>
  );
}
