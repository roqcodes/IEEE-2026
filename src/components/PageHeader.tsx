import SectionBackdrop from "@/components/home/SectionBackdrop";
import { SectionAccent } from "@/components/home/SectionAccent";
import { FadeIn } from "@/components/home/motion";

interface PageHeaderProps {
  breadcrumb?: string;
  title: string;
  subtitle?: string;
  /** @deprecated Accent color is no longer used — kept for API compatibility */
  accentColor?: string;
}

export default function PageHeader({ breadcrumb, title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden pt-28 lg:pt-32 pb-16 lg:pb-20 border-b border-ieee-border">
      <SectionBackdrop variant="sky" interactiveGrid={false} />
      <SectionAccent />
      <div className="relative container-editorial">
        <FadeIn>
          {breadcrumb && (
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-ieee-blue" aria-hidden="true" />
              <p className="section-eyebrow mb-0">{breadcrumb}</p>
            </div>
          )}
          <h1 className="section-title max-w-3xl">{title}</h1>
          {subtitle && <p className="text-lead mt-5 max-w-2xl">{subtitle}</p>}
        </FadeIn>
      </div>
    </section>
  );
}
