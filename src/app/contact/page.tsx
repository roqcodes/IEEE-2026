"use client";

import { useState, FormEvent } from "react";
import PageHeader from "@/components/PageHeader";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const socialLinks = [
  { label: "LinkedIn",   href: "https://linkedin.com",  color: "#0a66c2" },
  { label: "Instagram",  href: "https://instagram.com", color: "#e1306c" },
  { label: "Twitter/X",  href: "https://x.com",        color: "#000" },
  { label: "YouTube",    href: "https://youtube.com",   color: "#ff0000" },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "", email: "", subject: "", message: "",
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
    /* TODO: replace with fetch("/api/contact", { method:"POST", body: JSON.stringify(form) }) */
    await new Promise((r) => setTimeout(r, 800)); // simulate network
    console.log("Contact form submission:", form);
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <>
      <PageHeader
        breadcrumb="Reach Out"
        title="Contact Us"
        subtitle="Have a question, suggestion, or want to collaborate? We'd love to hear from you."
      />

      <section className="py-24 bg-[#FAFAFA]" aria-label="Contact section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">

            {/* ── Contact Form (col 3) ── */}
            <div className="lg:col-span-3">
              <h2 className="text-3xl font-bold font-serif text-[--color-navy] mb-8">
                Send Us a Message
              </h2>

              {status === "success" ? (
                <div className="border-l-4 border-[--color-gold] bg-white p-8 shadow-sm" role="alert">
                  <div className="text-4xl mb-4 text-[--color-navy]">✅</div>
                  <h3 className="text-xl font-bold font-serif text-[--color-navy] mb-2">Message Sent!</h3>
                  <p className="text-[--color-charcoal] text-sm mb-6">We&apos;ll get back to you within 24 hours.</p>
                  <button
                    className="text-xs font-bold uppercase tracking-widest text-[--color-navy] hover:text-[--color-gold] transition-colors"
                    onClick={() => setStatus("idle")}
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-[--color-charcoal] mb-2">
                        Full Name <span aria-hidden="true" className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 border border-[--color-border] bg-white text-sm text-[--color-charcoal] placeholder-[--color-muted] focus:outline-none focus:border-[--color-navy] transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-[--color-charcoal] mb-2">
                        Email Address <span aria-hidden="true" className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 border border-[--color-border] bg-white text-sm text-[--color-charcoal] placeholder-[--color-muted] focus:outline-none focus:border-[--color-navy] transition"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-widest text-[--color-charcoal] mb-2">
                      Subject <span aria-hidden="true" className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[--color-border] bg-white text-sm text-[--color-charcoal] focus:outline-none focus:border-[--color-navy] transition appearance-none rounded-none"
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

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-[--color-charcoal] mb-2">
                      Message <span aria-hidden="true" className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help…"
                      className="w-full px-4 py-3 border border-[--color-border] bg-white text-sm text-[--color-charcoal] placeholder-[--color-muted] resize-y focus:outline-none focus:border-[--color-navy] transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full sm:w-auto px-10 py-4 bg-[--color-navy] border-2 border-[--color-navy] text-white font-bold text-xs tracking-widest uppercase transition-colors hover:bg-[--color-gold] hover:border-[--color-gold] disabled:opacity-70 disabled:hover:bg-[--color-navy] disabled:hover:border-[--color-navy]"
                  >
                    {status === "sending" ? "SENDING…" : "SEND MESSAGE"}
                  </button>
                </form>
              )}
            </div>

            {/* ── Contact Info (col 2) ── */}
            <aside className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-3xl font-bold font-serif text-[--color-navy] mb-8">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  <ContactItem
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    }
                    label="Email"
                    value="ieee@cusat.ac.in"
                    href="mailto:ieee@cusat.ac.in"
                  />
                  <ContactItem
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    }
                    label="Address"
                    value="School of Engineering, CUSAT, Kochi — 682 022, Kerala, India"
                  />
                </div>
              </div>

              {/* Office hours */}
              <div className="border border-[--color-border] bg-white p-8 shadow-sm">
                <h3 className="font-bold font-serif text-[--color-navy] text-xl mb-6">Office Hours</h3>
                <dl className="space-y-3 text-sm">
                  {[
                    { day: "Monday – Friday", time: "10:00 AM – 5:00 PM" },
                    { day: "Saturday",        time: "10:00 AM – 1:00 PM" },
                    { day: "Sunday",          time: "Closed" },
                  ].map((h) => (
                    <div key={h.day} className="flex justify-between gap-4">
                      <dt className="text-[--color-charcoal]">{h.day}</dt>
                      <dd className="font-bold text-[--color-navy]">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Social links */}
              <div>
                <h3 className="font-bold font-serif text-[--color-navy] text-xl mb-6">Follow Us</h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`IEEE CUSAT on ${s.label}`}
                      className="px-5 py-2 border border-[--color-border] bg-white text-xs font-bold tracking-widest uppercase text-[--color-navy] hover:border-[--color-navy] hover:bg-[--color-navy] hover:text-white transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Sub-component: ContactItem ── */
function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex gap-5 items-start">
      <div
        className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-white bg-[--color-navy]"
        aria-hidden="true"
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[--color-muted] mb-1">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="text-base font-bold text-[--color-charcoal] hover:text-[--color-navy] transition-colors block"
          >
            {value}
          </a>
        ) : (
          <p className="text-base text-[--color-charcoal]">{value}</p>
        )}
      </div>
    </div>
  );
}
