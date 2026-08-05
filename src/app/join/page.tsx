import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Join Now",
  description: "Join the IEEE CUSAT Student Branch and become part of a global network of professionals.",
};

export default function JoinPage() {
  return (
    <div className="bg-white">
      <PageHeader
        breadcrumb="Membership"
        title="Join IEEE CUSAT Student Branch"
        subtitle="Become a part of the world's largest technical professional organization for the advancement of technology."
        accentColor="#00629B"
      />

      {/* Main Content */}
      <section className="relative border-t border-gray-200 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[1px] h-24 bg-[#00629B]/40 hidden md:block z-10"></div>
        {/* Why Join */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-[--color-navy] mb-6">
            Why Join IEEE?
          </h2>
          <div className="space-y-6 text-[--color-charcoal]">
            <p>
              IEEE membership offers access to technical innovation, cutting-edge information, networking opportunities, and exclusive member benefits.
            </p>
            <ul className="list-disc pl-5 space-y-3">
              <li>Access to IEEE Xplore Digital Library</li>
              <li>Networking with industry professionals and peers</li>
              <li>Opportunities to attend IEEE conferences and events</li>
              <li>Exclusive scholarships, grants, and fellowships</li>
              <li>Professional development and career resources</li>
            </ul>
          </div>
        </div>

        {/* Form Placeholder */}
        <div className="bg-[#FAFAFA] border border-[--color-border] p-8 shadow-md">
          <h2 className="text-2xl font-serif font-bold text-[--color-navy] mb-6">
            Membership Registration
          </h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-[--color-charcoal] mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-[--color-border] bg-white px-4 py-3 text-[--color-charcoal] focus:outline-none focus:border-[--color-navy] transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-[--color-charcoal] mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-[--color-border] bg-white px-4 py-3 text-[--color-charcoal] focus:outline-none focus:border-[--color-navy] transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="student-id" className="block text-sm font-bold text-[--color-charcoal] mb-2">
                Student ID
              </label>
              <input
                type="text"
                id="student-id"
                className="w-full border border-[--color-border] bg-white px-4 py-3 text-[--color-charcoal] focus:outline-none focus:border-[--color-navy] transition-colors"
                placeholder="12345678"
              />
            </div>
            <button
              type="button"
              className="w-full bg-[--color-navy] hover:bg-[--color-gold] text-white hover:text-[--color-navy] font-bold py-4 px-6 transition-colors"
            >
              Submit Application
            </button>
            <p className="text-xs text-[--color-muted] mt-4 text-center">
              By submitting this form, you will be redirected to the official IEEE portal to complete your payment.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
