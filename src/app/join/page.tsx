import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PageSection from "@/components/home/PageSection";
import SectionHeader from "@/components/home/SectionHeader";
import PremiumCard from "@/components/home/PremiumCard";
import PageCta from "@/components/home/PageCta";

export const metadata: Metadata = {
  title: "Join Now",
  description: "Join the IEEE CUSAT Student Branch and become part of a global network of professionals.",
};

const benefits = [
  "Access to IEEE Xplore Digital Library",
  "Networking with industry professionals and peers",
  "Opportunities to attend IEEE conferences and events",
  "Exclusive scholarships, grants, and fellowships",
  "Professional development and career resources",
];

export default function JoinPage() {
  return (
    <div className="site-page">
      <PageHeader
        breadcrumb="Membership"
        title="Join IEEE CUSAT Student Branch"
        subtitle="Become a part of the world's largest technical professional organization for the advancement of technology."
      />

      <PageSection aria-label="Membership registration" sideGlow="right">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <SectionHeader
              eyebrow="Membership"
              title="Why Join IEEE?"
              subtitle="IEEE membership offers access to technical innovation, cutting-edge information, networking opportunities, and exclusive member benefits."
            />
            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex gap-3 text-body">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ieee-blue" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <PremiumCard className="p-8 lg:p-10">
            <h2 className="text-card-title mb-6">Membership Registration</h2>
            <form className="space-y-5">
              <div>
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input type="text" id="name" className="form-input" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input type="email" id="email" className="form-input" placeholder="john@example.com" />
              </div>
              <div>
                <label htmlFor="student-id" className="form-label">
                  Student ID
                </label>
                <input type="text" id="student-id" className="form-input" placeholder="12345678" />
              </div>
              <button type="button" className="btn-primary w-full">
                Submit Application
              </button>
              <p className="text-[11px] text-stone text-center">
                By submitting this form, you will be redirected to the official IEEE portal to complete your payment.
              </p>
            </form>
          </PremiumCard>
        </div>
      </PageSection>

      <PageCta
        eyebrow="Questions"
        title="Need Help With Membership?"
        description="Our team can guide you through IEEE registration, student branch benefits, and chapter involvement."
        primaryHref="/contact"
        primaryLabel="Contact Us"
        secondaryHref="/about"
        secondaryLabel="Learn About Us"
      />
    </div>
  );
}
